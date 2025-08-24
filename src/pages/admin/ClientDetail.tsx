import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  Building, 
  FileText, 
  Plus,
  Briefcase,
  Clock,
  DollarSign
} from 'lucide-react';
import type { Client, Case } from '@/lib/supabase';

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [client, setClient] = useState<Client | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [casesLoading, setCasesLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchClient(id);
      fetchClientCases(id);
    }
  }, [id]);

  const fetchClient = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();

      if (error) throw error;
      setClient(data);
    } catch (error) {
      console.error('Error fetching client:', error);
      alert('Error al cargar el cliente');
      navigate('/admin/clients');
    } finally {
      setLoading(false);
    }
  };

  const fetchClientCases = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error fetching client cases:', error);
    } finally {
      setCasesLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'on_hold':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'pending':
        return 'Pendiente';
      case 'closed':
        return 'Cerrado';
      case 'on_hold':
        return 'En Espera';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-16">
        <div className="bg-slate-50 rounded-2xl p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Cliente no encontrado</h2>
          <p className="text-slate-600 mb-6">El cliente que buscas no existe o ha sido eliminado.</p>
          <Link
            to="/admin/clients"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Volver a Clientes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/clients')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{client.first_name} {client.last_name}</h1>
              <p className="text-slate-600 font-medium">
                {client.client_type === 'business' ? 'Cliente Empresarial' : 'Cliente Individual'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
              client.active 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {client.active ? 'Activo' : 'Inactivo'}
            </span>
            <Link
              to={`/admin/clients/edit/${client.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Edit className="h-4 w-4" />
              Editar
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-xl">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Información Personal</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">Nombre Completo</label>
                <p className="text-slate-900 font-medium">{client.first_name} {client.last_name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">Tipo de Cliente</label>
                <p className="text-slate-900 font-medium">
                  {client.client_type === 'individual' ? 'Persona Física' : 'Empresa'}
                </p>
              </div>
              
              {client.identification_number && (
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Identificación</label>
                  <p className="text-slate-900 font-medium">{client.identification_number}</p>
                </div>
              )}
              
              {client.date_of_birth && (
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Fecha de Nacimiento</label>
                  <p className="text-slate-900 font-medium">
                    {new Date(client.date_of_birth).toLocaleDateString('es-ES')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Business Information */}
          {client.client_type === 'business' && (client.company_name || client.position) && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Información Empresarial</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {client.company_name && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">Empresa</label>
                    <p className="text-slate-900 font-medium">{client.company_name}</p>
                  </div>
                )}
                
                {client.position && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">Cargo</label>
                    <p className="text-slate-900 font-medium">{client.position}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-xl">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Información de Contacto</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-1">Email</label>
                  <a href={`mailto:${client.email}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    {client.email}
                  </a>
                </div>
              </div>
              
              {client.phone && (
                <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-xl">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Phone className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-1">Teléfono</label>
                    <a href={`tel:${client.phone}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      {client.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {client.address && (
                <div className="flex items-start space-x-4 p-3 bg-slate-50 rounded-xl">
                  <div className="p-2 bg-orange-100 rounded-lg mt-0.5">
                    <MapPin className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-1">Dirección</label>
                    <p className="text-slate-900 font-medium">
                      {client.address}
                      {client.city && `, ${client.city}`}
                      {client.state && `, ${client.state}`}
                      {client.postal_code && ` ${client.postal_code}`}
                      {client.country && `, ${client.country}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {client.notes && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-xl">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Notas</h2>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{client.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Estadísticas Rápidas</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-semibold text-slate-600">Total de Casos</span>
                <span className="text-xl font-bold text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm">{cases.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span className="text-sm font-semibold text-green-700">Casos Activos</span>
                <span className="text-xl font-bold text-green-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                  {cases.filter(c => c.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span className="text-sm font-semibold text-blue-700">Cliente desde</span>
                <span className="text-sm font-bold text-blue-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                  {new Date(client.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Acciones Rápidas</h3>
            <div className="space-y-4">
              <Link
                to={`/admin/cases/new?client_id=${client.id}`}
                className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-semibold"
              >
                <Plus className="h-5 w-5" />
                <span>Nuevo Caso</span>
              </Link>
              
              <a
                href={`mailto:${client.email}`}
                className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-semibold"
              >
                <Mail className="h-5 w-5" />
                <span>Enviar Email</span>
              </a>
              
              {client.phone && (
                <a
                  href={`tel:${client.phone}`}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  <span>Llamar</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cases Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Casos del Cliente</h2>
            </div>
            <Link
              to={`/admin/cases/new?client_id=${client.id}`}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-semibold flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Nuevo Caso
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {casesLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-slate-100 rounded-2xl w-fit mx-auto mb-6">
                <Briefcase className="h-16 w-16 text-slate-400 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">No hay casos</h3>
              <p className="text-slate-600 mb-6 text-lg">Este cliente aún no tiene casos asignados.</p>
              <Link
                to={`/admin/cases/new?client_id=${client.id}`}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-semibold inline-flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Crear Primer Caso
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cases.map((case_item) => (
                <div key={case_item.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Link
                          to={`/admin/cases/${case_item.id}`}
                          className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          {case_item.title}
                        </Link>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          getStatusColor(case_item.status)
                        }`}>
                          {getStatusText(case_item.status)}
                        </span>
                      </div>
                      
                      {case_item.description && (
                        <div className="bg-slate-50 rounded-xl p-4 mb-4">
                          <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                            {case_item.description}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full">
                          <Calendar className="h-3 w-3 text-slate-600" />
                          <span className="text-slate-600 font-medium">Creado {new Date(case_item.created_at).toLocaleDateString('es-ES')}</span>
                        </div>
                        {case_item.case_type && (
                          <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full">
                            <Briefcase className="h-3 w-3 text-slate-600" />
                            <span className="text-slate-600 font-medium">{case_item.case_type}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Link
                      to={`/admin/cases/${case_item.id}`}
                      className="ml-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-200 font-semibold"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}