import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Plus,
  FolderOpen,
  Image,
  FileIcon,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  category: string;
  case_id?: string;
  client_id?: string;
  uploaded_by: string;
  uploaded_at: string;
  case?: {
    title: string;
    case_number: string;
  };
  client?: {
    name: string;
  };
}

interface DocumentStats {
  total: number;
  contracts: number;
  evidence: number;
  correspondence: number;
  other: number;
}

const DocumentManagement: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [stats, setStats] = useState<DocumentStats>({
    total: 0,
    contracts: 0,
    evidence: 0,
    correspondence: 0,
    other: 0
  });
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, categoryFilter, typeFilter]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - in real implementation, fetch from Supabase
      const mockDocuments: Document[] = [
        {
          id: '1',
          name: 'Contrato de Servicios Legales - García vs. Empresa XYZ.pdf',
          file_path: '/documents/contract-garcia-xyz.pdf',
          file_size: 2048576,
          file_type: 'application/pdf',
          category: 'contract',
          case_id: 'case-1',
          uploaded_by: 'admin',
          uploaded_at: '2024-01-15T10:30:00Z',
          case: {
            title: 'García vs. Empresa XYZ',
            case_number: 'CASE-2024-001'
          }
        },
        {
          id: '2',
          name: 'Evidencia Fotográfica - Accidente Laboral.jpg',
          file_path: '/documents/evidence-accident.jpg',
          file_size: 1024000,
          file_type: 'image/jpeg',
          category: 'evidence',
          case_id: 'case-2',
          uploaded_by: 'admin',
          uploaded_at: '2024-01-16T14:20:00Z',
          case: {
            title: 'Accidente Laboral - Martínez',
            case_number: 'CASE-2024-002'
          }
        },
        {
          id: '3',
          name: 'Correspondencia Cliente - Consulta Divorcio.docx',
          file_path: '/documents/correspondence-divorce.docx',
          file_size: 512000,
          file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          category: 'correspondence',
          client_id: 'client-1',
          uploaded_by: 'admin',
          uploaded_at: '2024-01-17T09:15:00Z',
          client: {
            name: 'Ana López'
          }
        },
        {
          id: '4',
          name: 'Testamento - Revisión Legal.pdf',
          file_path: '/documents/will-review.pdf',
          file_size: 1536000,
          file_type: 'application/pdf',
          category: 'other',
          client_id: 'client-2',
          uploaded_by: 'admin',
          uploaded_at: '2024-01-18T16:45:00Z',
          client: {
            name: 'Carlos Rodríguez'
          }
        },
        {
          id: '5',
          name: 'Acuerdo de Confidencialidad.pdf',
          file_path: '/documents/nda.pdf',
          file_size: 768000,
          file_type: 'application/pdf',
          category: 'contract',
          uploaded_by: 'admin',
          uploaded_at: '2024-01-19T11:30:00Z'
        }
      ];
      
      setDocuments(mockDocuments);
      
      // Calculate stats
      const newStats = {
        total: mockDocuments.length,
        contracts: mockDocuments.filter(doc => doc.category === 'contract').length,
        evidence: mockDocuments.filter(doc => doc.category === 'evidence').length,
        correspondence: mockDocuments.filter(doc => doc.category === 'correspondence').length,
        other: mockDocuments.filter(doc => doc.category === 'other').length
      };
      setStats(newStats);
      
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Error al cargar los documentos');
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.case?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.client?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(doc => doc.category === categoryFilter);
    }

    // Filter by file type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(doc => {
        if (typeFilter === 'pdf') return doc.file_type === 'application/pdf';
        if (typeFilter === 'image') return doc.file_type.startsWith('image/');
        if (typeFilter === 'document') return doc.file_type.includes('document') || doc.file_type.includes('word');
        return true;
      });
    }

    setFilteredDocuments(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este documento?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      
      // In real implementation, delete from Supabase and storage
      // const { error } = await supabase
      //   .from('documents')
      //   .delete()
      //   .eq('id', id);
      
      // if (error) throw error;
      
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      toast.success('Documento eliminado correctamente');
      
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Error al eliminar el documento');
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    if (fileType.startsWith('image/')) {
      return <Image className="h-8 w-8 text-green-500" />;
    }
    if (fileType.includes('document') || fileType.includes('word')) {
      return <FileIcon className="h-8 w-8 text-blue-500" />;
    }
    return <FileIcon className="h-8 w-8 text-gray-500" />;
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'contract': return 'Contrato';
      case 'evidence': return 'Evidencia';
      case 'correspondence': return 'Correspondencia';
      case 'other': return 'Otro';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract': return 'bg-blue-100 text-blue-800';
      case 'evidence': return 'bg-green-100 text-green-800';
      case 'correspondence': return 'bg-yellow-100 text-yellow-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Documentos</h1>
          <p className="text-gray-600">Administra todos los documentos del bufete</p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Subir Documento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FolderOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contratos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.contracts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Image className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Evidencia</p>
              <p className="text-2xl font-bold text-gray-900">{stats.evidence}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileIcon className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Correspondencia</p>
              <p className="text-2xl font-bold text-gray-900">{stats.correspondence}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-gray-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Otros</p>
              <p className="text-2xl font-bold text-gray-900">{stats.other}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            <option value="contract">Contratos</option>
            <option value="evidence">Evidencia</option>
            <option value="correspondence">Correspondencia</option>
            <option value="other">Otros</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los tipos</option>
            <option value="pdf">PDF</option>
            <option value="image">Imágenes</option>
            <option value="document">Documentos</option>
          </select>
          
          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            {filteredDocuments.length} de {documents.length} documentos
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay documentos</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || categoryFilter !== 'all' || typeFilter !== 'all'
                ? 'No se encontraron documentos con los filtros aplicados.'
                : 'Sube el primer documento para comenzar.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.file_type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate" title={doc.name}>
                        {doc.name}
                      </h3>
                      <p className="text-xs text-gray-500">{formatFileSize(doc.file_size)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(doc.category)}`}>
                    {getCategoryLabel(doc.category)}
                  </span>
                  
                  {doc.case && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Caso:</span> {doc.case.title}
                    </div>
                  )}
                  
                  {doc.client && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Cliente:</span> {doc.client.name}
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(doc.uploaded_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-xs hover:bg-blue-100 flex items-center justify-center gap-1">
                    <Eye className="h-3 w-3" />
                    Ver
                  </button>
                  <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded text-xs hover:bg-gray-100 flex items-center justify-center gap-1">
                    <Download className="h-3 w-3" />
                    Descargar
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    disabled={deleteLoading === doc.id}
                    className="bg-red-50 text-red-600 px-3 py-2 rounded text-xs hover:bg-red-100 flex items-center justify-center"
                  >
                    {deleteLoading === doc.id ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal Placeholder */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Subir Documento</h3>
            <p className="text-gray-600 mb-4">Funcionalidad de subida de documentos - Por implementar</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;