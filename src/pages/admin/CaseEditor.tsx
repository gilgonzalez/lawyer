import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Save, Calendar, User, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Client {
  id: string;
  name: string;
  email: string;
}

interface CaseFormData {
  title: string;
  case_number: string;
  client_id: string;
  case_type: string;
  status: 'active' | 'pending' | 'closed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date: string;
  end_date?: string;
  next_hearing?: string;
  description: string;
  notes?: string;
}

const CaseEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<CaseFormData>({
    title: '',
    case_number: '',
    client_id: '',
    case_type: 'civil',
    status: 'pending',
    priority: 'medium',
    start_date: new Date().toISOString().split('T')[0],
    description: '',
    notes: ''
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchClients();
    if (isEditing && id) {
      fetchCase(id);
    }
  }, [id, isEditing]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, email')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Error al cargar los clientes');
    }
  };

  const fetchCase = async (caseId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', caseId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title || '',
          case_number: data.case_number || '',
          client_id: data.client_id || '',
          case_type: data.case_type || 'civil',
          status: data.status || 'pending',
          priority: data.priority || 'medium',
          start_date: data.start_date ? data.start_date.split('T')[0] : '',
          end_date: data.end_date ? data.end_date.split('T')[0] : '',
          next_hearing: data.next_hearing ? data.next_hearing.split('T')[0] : '',
          description: data.description || '',
          notes: data.notes || ''
        });
      }
    } catch (error) {
      console.error('Error fetching case:', error);
      toast.error('Error al cargar el caso');
      navigate('/admin/cases');
    } finally {
      setLoading(false);
    }
  };

  const generateCaseNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CASE-${year}-${random}`;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.case_number.trim()) {
      newErrors.case_number = 'El número de caso es requerido';
    }

    if (!formData.client_id) {
      newErrors.client_id = 'Debe seleccionar un cliente';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'La fecha de inicio es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }

    try {
      setSaving(true);

      const caseData = {
        ...formData,
        end_date: formData.end_date || null,
        next_hearing: formData.next_hearing || null,
        notes: formData.notes || null
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from('cases')
          .update(caseData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Caso actualizado exitosamente');
      } else {
        const { error } = await supabase
          .from('cases')
          .insert([caseData]);

        if (error) throw error;
        toast.success('Caso creado exitosamente');
      }

      navigate('/admin/cases');
    } catch (error) {
      console.error('Error saving case:', error);
      toast.error('Error al guardar el caso');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof CaseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-blue-600 shadow-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/cases')}
            className="p-3 hover:bg-slate-100 rounded-xl transition-all duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 group-hover:text-slate-800" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {isEditing ? 'Editar Caso' : 'Nuevo Caso'}
            </h1>
            <p className="text-slate-600 font-medium">
              {isEditing ? 'Modifica la información del caso' : 'Crea un nuevo caso legal'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Título del Caso *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 hover:border-slate-300 transition-all duration-200 ${
                  errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-blue-500'
                }`}
                placeholder="Ej: Demanda por incumplimiento de contrato"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Case Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Número de Caso *
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={formData.case_number}
                  onChange={(e) => handleInputChange('case_number', e.target.value)}
                  className={`flex-1 px-4 py-3 border-2 rounded-l-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 hover:border-slate-300 transition-all duration-200 ${
                    errors.case_number ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-blue-500'
                  }`}
                  placeholder="CASE-2024-0001"
                />
                <button
                  type="button"
                  onClick={() => handleInputChange('case_number', generateCaseNumber())}
                  className="px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 border-2 border-l-0 border-slate-200 rounded-r-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-200 font-medium text-slate-700"
                >
                  Generar
                </button>
              </div>
              {errors.case_number && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.case_number}
                </p>
              )}
            </div>

            {/* Client */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cliente *
              </label>
              <select
                value={formData.client_id}
                onChange={(e) => handleInputChange('client_id', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 hover:border-slate-300 transition-all duration-200 ${
                  errors.client_id ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-blue-500'
                }`}
              >
                <option value="">Seleccionar cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.email}
                  </option>
                ))}
              </select>
              {errors.client_id && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.client_id}
                </p>
              )}
            </div>

            {/* Case Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tipo de Caso
              </label>
              <select
                value={formData.case_type}
                onChange={(e) => handleInputChange('case_type', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
              >
                <option value="civil">Civil</option>
                <option value="criminal">Penal</option>
                <option value="family">Familiar</option>
                <option value="labor">Laboral</option>
                <option value="commercial">Comercial</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as CaseFormData['status'])}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
              >
                <option value="pending">Pendiente</option>
                <option value="active">Activo</option>
                <option value="on_hold">En espera</option>
                <option value="closed">Cerrado</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Prioridad
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value as CaseFormData['priority'])}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 hover:border-slate-300 transition-all duration-200 ${
                  errors.start_date ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-blue-500'
                }`}
              />
              {errors.start_date && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.start_date}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fecha de Finalización
              </label>
              <input
                type="date"
                value={formData.end_date || ''}
                onChange={(e) => handleInputChange('end_date', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
              />
            </div>

            {/* Next Hearing */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Próxima Audiencia
              </label>
              <input
                type="date"
                value={formData.next_hearing || ''}
                onChange={(e) => handleInputChange('next_hearing', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 hover:border-slate-300 transition-all duration-200 resize-none ${
                  errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-blue-500'
                }`}
                placeholder="Describe los detalles del caso..."
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notas Adicionales
              </label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200 resize-none"
                placeholder="Notas internas, recordatorios, etc..."
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-8 border-t border-slate-200">
          <button
            type="button"
            onClick={() => navigate('/admin/cases')}
            className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 focus:ring-4 focus:ring-slate-500/20 focus:border-slate-500 transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            {saving ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Guardando...' : (isEditing ? 'Actualizar Caso' : 'Crear Caso')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseEditor;