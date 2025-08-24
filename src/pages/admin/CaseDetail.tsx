import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { 
  ArrowLeft, 
  Edit, 
  Calendar, 
  User, 
  FileText, 
  Clock, 
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Plus,
  Download,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface Case {
  id: string;
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
  created_at: string;
  updated_at: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  client_type: 'individual' | 'business';
}

interface Document {
  id: string;
  name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  uploaded_at: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  created_at: string;
}

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'activities'>('overview');

  useEffect(() => {
    if (id) {
      fetchCaseData(id);
    }
  }, [id]);

  const fetchCaseData = async (caseId: string) => {
    try {
      setLoading(true);
      
      // Fetch case data
      const { data: caseData, error: caseError } = await supabase
        .from('cases')
        .select('*')
        .eq('id', caseId)
        .single();

      if (caseError) throw caseError;
      setCaseData(caseData);

      // Fetch client data
      if (caseData?.client_id) {
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('*')
          .eq('id', caseData.client_id)
          .single();

        if (clientError) throw clientError;
        setClient(clientData);
      }

      // Fetch documents (mock data for now)
      setDocuments([
        {
          id: '1',
          name: 'Contrato inicial.pdf',
          file_path: '/documents/contract.pdf',
          file_size: 2048576,
          file_type: 'application/pdf',
          uploaded_at: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Evidencia fotográfica.jpg',
          file_path: '/documents/evidence.jpg',
          file_size: 1024000,
          file_type: 'image/jpeg',
          uploaded_at: '2024-01-16T14:20:00Z'
        }
      ]);

      // Fetch activities (mock data for now)
      setActivities([
        {
          id: '1',
          type: 'case_created',
          description: 'Caso creado',
          created_at: caseData.created_at
        },
        {
          id: '2',
          type: 'document_uploaded',
          description: 'Documento "Contrato inicial.pdf" subido',
          created_at: '2024-01-15T10:30:00Z'
        },
        {
          id: '3',
          type: 'status_changed',
          description: 'Estado cambiado a "Activo"',
          created_at: '2024-01-16T09:15:00Z'
        }
      ]);

    } catch (error) {
      console.error('Error fetching case data:', error);
      toast.error('Error al cargar los datos del caso');
      navigate('/admin/cases');
    } finally {
      setLoading(false);
    }
  };

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'case_created': return <Plus className="h-4 w-4" />;
      case 'document_uploaded': return <FileText className="h-4 w-4" />;
      case 'status_changed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Caso no encontrado</h3>
        <p className="text-gray-500">El caso que buscas no existe o ha sido eliminado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/cases')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{caseData.title}</h1>
            <p className="text-gray-600">{caseData.case_number}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/admin/cases/edit/${caseData.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar
          </Link>
        </div>
      </div>

      {/* Case Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Estado</p>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(caseData.status)}`}>
                {caseData.status === 'active' ? 'Activo' :
                 caseData.status === 'pending' ? 'Pendiente' :
                 caseData.status === 'closed' ? 'Cerrado' : 'En espera'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Prioridad</p>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(caseData.priority)}`}>
                {caseData.priority === 'urgent' ? 'Urgente' :
                 caseData.priority === 'high' ? 'Alta' :
                 caseData.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fecha de Inicio</p>
              <p className="text-sm font-bold text-gray-900">
                {new Date(caseData.start_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tipo</p>
              <p className="text-sm font-bold text-gray-900 capitalize">{caseData.case_type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documentos ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'activities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Actividad ({activities.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Case Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles del Caso</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descripción</label>
                      <p className="mt-1 text-sm text-gray-900">{caseData.description}</p>
                    </div>
                    
                    {caseData.notes && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Notas</label>
                        <p className="mt-1 text-sm text-gray-900">{caseData.notes}</p>
                      </div>
                    )}
                    
                    {caseData.next_hearing && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Próxima Audiencia</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(caseData.next_hearing).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    {caseData.end_date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha de Finalización</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(caseData.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Client Information */}
              {client && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Cliente</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{client.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{client.client_type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <p className="text-sm text-gray-900">{client.email}</p>
                      </div>
                      
                      {client.phone && (
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400 mr-3" />
                          <p className="text-sm text-gray-900">{client.phone}</p>
                        </div>
                      )}
                      
                      {client.address && (
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                          <p className="text-sm text-gray-900">{client.address}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-3 mt-4">
                      <Link
                        to={`/admin/clients/${client.id}`}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                      >
                        Ver Perfil
                      </Link>
                      <a
                        href={`mailto:${client.email}`}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-center"
                      >
                        Enviar Email
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Documentos del Caso</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Subir Documento
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                        <p className="text-sm text-gray-500">{formatFileSize(doc.file_size)}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(doc.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {documents.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay documentos</h3>
                  <p className="mt-1 text-sm text-gray-500">Sube el primer documento para este caso.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Historial de Actividades</h3>
              
              <div className="flow-root">
                <ul className="-mb-8">
                  {activities.map((activity, index) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {index !== activities.length - 1 && (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                        )}
                        <div className="relative flex space-x-3">
                          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">{activity.description}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {new Date(activity.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {activities.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay actividades</h3>
                  <p className="mt-1 text-sm text-gray-500">Las actividades del caso aparecerán aquí.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;