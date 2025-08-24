import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Save, User, Building, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import type { Client } from '@/lib/supabase';

interface ClientFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  date_of_birth: string;
  identification_number: string;
  client_type: 'individual' | 'business';
  company: string;
  position: string;
  notes: string;
  active: boolean;
}

const initialFormData: ClientFormData = {
  full_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'España',
  date_of_birth: '',
  identification_number: '',
  client_type: 'individual',
  company: '',
  position: '',
  notes: '',
  active: true
};

export default function ClientEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<ClientFormData>>({});

  useEffect(() => {
    if (isEditing && id) {
      fetchClient(id);
    }
  }, [id, isEditing]);

  const fetchClient = async (clientId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          full_name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          postal_code: data.postal_code || '',
          country: data.country || 'España',
          date_of_birth: data.date_of_birth || '',
          identification_number: data.identification_number || '',
          client_type: data.client_type || 'individual',
          company: data.company || '',
          position: data.position || '',
          notes: data.notes || '',
          active: data.active ?? true
        });
      }
    } catch (error) {
      console.error('Error fetching client:', error);
      alert('Error al cargar el cliente');
      navigate('/admin/clients');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ClientFormData> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'El nombre completo es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (formData.client_type === 'business' && !formData.company.trim()) {
      newErrors.company = 'El nombre de la empresa es requerido para clientes empresariales';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    try {
      const clientData = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('clients')
          .insert([{
            ...clientData,
            created_at: new Date().toISOString()
          }]);

        if (error) throw error;
      }

      navigate('/admin/clients');
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Error al guardar el cliente');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof ClientFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/60">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/clients')}
            className="p-2 rounded-xl bg-white/80 backdrop-blur-sm text-slate-600 hover:text-slate-800 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h1>
            <p className="text-slate-600 mt-1">
              {isEditing ? 'Modifica la información del cliente' : 'Agrega un nuevo cliente al sistema'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Información Básica</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                  errors.full_name ? 'border-red-300 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'
                }`}
                placeholder="Nombre completo del cliente"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.full_name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tipo de Cliente *
              </label>
              <select
                value={formData.client_type}
                onChange={(e) => handleInputChange('client_type', e.target.value as 'individual' | 'business')}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
              >
                <option value="individual">Persona Física</option>
                <option value="business">Empresa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                  errors.email ? 'border-red-300 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'
                }`}
                placeholder="email@ejemplo.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
                placeholder="+34 600 000 000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Número de Identificación
              </label>
              <input
                type="text"
                value={formData.identification_number}
                onChange={(e) => handleInputChange('identification_number', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
                placeholder="DNI, NIE, CIF, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Business Information */}
        {formData.client_type === 'business' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                <Building className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Información Empresarial</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nombre de la Empresa *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    errors.company ? 'border-red-300 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  placeholder="Nombre de la empresa"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.company}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cargo/Posición
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
                  placeholder="Director, Gerente, etc."
                />
              </div>
            </div>
          </div>
        )}

        {/* Address Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Dirección</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
                placeholder="Calle, número, piso, puerta"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Ciudad
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
                placeholder="Ciudad"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Provincia/Estado
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
                placeholder="Provincia o estado"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Código Postal
              </label>
              <input
                type="text"
                value={formData.postal_code}
                onChange={(e) => handleInputChange('postal_code', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
                placeholder="00000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                País
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200"
                placeholder="País"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Información Adicional</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notas
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200 resize-none"
                placeholder="Notas adicionales sobre el cliente..."
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => handleInputChange('active', e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500/20 focus:ring-4 border-2 border-slate-300 rounded-lg transition-all duration-200"
              />
              <label htmlFor="active" className="text-sm font-medium text-slate-700 cursor-pointer">
                Cliente activo
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/clients')}
            className="px-6 py-3 border-2 border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            ) : (
              <Save className="h-5 w-5" />
            )}
            {saving ? 'Guardando...' : 'Guardar Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
}