import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Filter, Eye, Edit, Trash2, Calendar, FileText, User, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Case {
  id: string;
  title: string;
  case_number: string;
  client_id: string;
  client_name: string;
  case_type: string;
  status: 'active' | 'pending' | 'closed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date: string;
  next_hearing?: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const CaseManagement: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cases')
        .select(`
          *,
          clients!inner(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedCases = data?.map(caseItem => ({
        ...caseItem,
        client_name: caseItem.clients.name
      })) || [];

      setCases(formattedCases);
    } catch (error) {
      console.error('Error fetching cases:', error);
      toast.error('Error al cargar los casos');
    } finally {
      setLoading(false);
    }
  };

  const deleteCase = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este caso?')) return;

    try {
      setDeleteLoading(id);
      const { error } = await supabase
        .from('cases')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCases(cases.filter(c => c.id !== id));
      toast.success('Caso eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting case:', error);
      toast.error('Error al eliminar el caso');
    } finally {
      setDeleteLoading(null);
    }
  };

  const updateCaseStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('cases')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setCases(cases.map(c => 
        c.id === id ? { ...c, status: newStatus as Case['status'] } : c
      ));
      toast.success('Estado del caso actualizado');
    } catch (error) {
      console.error('Error updating case status:', error);
      toast.error('Error al actualizar el estado del caso');
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
    const matchesType = typeFilter === 'all' || caseItem.case_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'on_hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const caseStats = {
    total: cases.length,
    active: cases.filter(c => c.status === 'active').length,
    pending: cases.filter(c => c.status === 'pending').length,
    closed: cases.filter(c => c.status === 'closed').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Casos</h1>
          <p className="text-gray-600">Administra todos los casos legales</p>
        </div>
        <Link
          to="/admin/cases/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuevo Caso
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Total</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{caseStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-emerald-50 p-6 rounded-2xl shadow-lg border border-emerald-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Activos</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">{caseStats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-2xl shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Pendientes</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent">{caseStats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Cerrados</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">{caseStats.closed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar casos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 w-full bg-white/80 backdrop-blur-sm hover:bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="pending">Pendiente</option>
            <option value="closed">Cerrado</option>
            <option value="on_hold">En espera</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <option value="all">Todos los tipos</option>
            <option value="civil">Civil</option>
            <option value="criminal">Penal</option>
            <option value="family">Familiar</option>
            <option value="labor">Laboral</option>
            <option value="commercial">Comercial</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Caso
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Próxima Audiencia
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-slate-200">
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-slate-50/80 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{caseItem.title}</div>
                      <div className="text-sm text-slate-500">{caseItem.case_number}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{caseItem.client_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 capitalize font-medium">{caseItem.case_type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={caseItem.status}
                      onChange={(e) => updateCaseStatus(caseItem.id, e.target.value)}
                      className={`text-xs px-3 py-1.5 rounded-xl border-0 font-medium shadow-sm ${getStatusColor(caseItem.status)}`}
                    >
                      <option value="active">Activo</option>
                      <option value="pending">Pendiente</option>
                      <option value="closed">Cerrado</option>
                      <option value="on_hold">En espera</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-xl shadow-sm ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority === 'urgent' ? 'Urgente' :
                       caseItem.priority === 'high' ? 'Alta' :
                       caseItem.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {caseItem.next_hearing ? new Date(caseItem.next_hearing).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/cases/${caseItem.id}`}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/admin/cases/edit/${caseItem.id}`}
                        className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => deleteCase(caseItem.id)}
                        disabled={deleteLoading === caseItem.id}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 rounded-lg transition-all duration-200"
                        title="Eliminar"
                      >
                        {deleteLoading === caseItem.id ? (
                          <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCases.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl w-fit mx-auto mb-6">
              <FileText className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No hay casos</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'No se encontraron casos con los filtros aplicados.'
                : 'Comienza creando tu primer caso para gestionar tu práctica legal.'}
            </p>
            {!searchTerm && statusFilter === 'all' && typeFilter === 'all' && (
              <div className="mt-6">
                <Link
                  to="/admin/cases/new"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Nuevo Caso
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseManagement;