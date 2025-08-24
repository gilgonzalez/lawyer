import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Edit, Trash2, Eye, Phone, Mail, Calendar, User, MapPin } from 'lucide-react';
import type { Client } from '@/lib/supabase';

export default function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) return;

    setDeleteLoading(id);
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Error al eliminar el cliente');
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleClientStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      setClients(clients.map(client => 
        client.id === id ? { ...client, active: !currentStatus } : client
      ));
    } catch (error) {
      console.error('Error updating client status:', error);
      alert('Error al actualizar el estado del cliente');
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.company_name && client.company_name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && client.active) ||
      (statusFilter === 'inactive' && !client.active);
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-neutral-200 border-t-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900">Gestión de Clientes</h1>
          <p className="text-neutral-600 mt-1">Administra la información de tus clientes</p>
        </div>
        <Link
          to="/admin/clients/new"
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:shadow-medium transition-all duration-200 flex items-center gap-2 font-medium hover:scale-105 shadow-soft"
        >
          <Plus className="h-5 w-5" />
          Nuevo Cliente
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft border border-neutral-200/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar clientes por nombre, email, teléfono o empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white/80 backdrop-blur-sm placeholder-neutral-500 transition-all duration-200"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white/80 backdrop-blur-sm transition-all duration-200 min-w-[180px]"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
            <User className="h-12 w-12 text-primary-500" />
          </div>
          <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">No hay clientes</h3>
          <p className="text-neutral-600 max-w-md mx-auto">
            {clients.length === 0 ? 'Comienza agregando tu primer cliente para gestionar tu cartera.' : 'No se encontraron clientes con los filtros aplicados.'}
          </p>
          {clients.length === 0 && (
            <div className="mt-8">
              <Link
                to="/admin/clients/new"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:shadow-medium transition-all duration-200 hover:scale-105 shadow-soft"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Agregar primer cliente
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
              <div className="p-6">
                {/* Client Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-neutral-900">{client.first_name} {client.last_name}</h3>
                      {client.company_name && (
                        <p className="text-neutral-600 font-medium">{client.company_name}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        client.active
                          ? 'bg-gradient-to-r from-success-100 to-success-200 text-success-800'
                          : 'bg-gradient-to-r from-error-100 to-error-200 text-error-800'
                      }`}
                    >
                      {client.active ? 'Activo' : 'Inactivo'}
                    </span>
                    <button
                      onClick={() => toggleClientStatus(client.id, client.active)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      {client.active ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-neutral-600">
                    <div className="bg-primary-50 p-1.5 rounded-lg mr-3">
                      <Mail className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="truncate font-medium">{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="bg-accent-50 p-1.5 rounded-lg mr-3">
                        <Phone className="h-4 w-4 text-accent-600" />
                      </div>
                      <span className="font-medium">{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="bg-success-50 p-1.5 rounded-lg mr-3">
                        <MapPin className="h-4 w-4 text-success-600" />
                      </div>
                      <span className="truncate font-medium">{client.address}</span>
                    </div>
                  )}
                </div>

                {/* Client Type & Date */}
                <div className="flex items-center justify-between mb-6">
                  {client.client_type && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700">
                      {client.client_type === 'individual' ? 'Persona física' : 'Empresa'}
                    </span>
                  )}
                  <span className="text-sm text-neutral-500 font-medium">
                    {new Date(client.created_at).toLocaleDateString('es-ES')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link
                    to={`/admin/clients/${client.id}`}
                    className="flex-1 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:shadow-soft transition-all duration-200 text-center hover:scale-105"
                  >
                    Ver detalles
                  </Link>
                  <Link
                    to={`/admin/clients/${client.id}/edit`}
                    className="flex-1 bg-gradient-to-r from-neutral-50 to-neutral-100 text-neutral-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:shadow-soft transition-all duration-200 text-center hover:scale-105"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(client.id)}
                    disabled={deleteLoading === client.id}
                    className="bg-gradient-to-r from-error-50 to-error-100 text-error-700 px-3 py-2.5 rounded-xl text-sm font-medium hover:shadow-soft transition-all duration-200 hover:scale-105 disabled:opacity-50"
                  >
                    {deleteLoading === client.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-error-600"></div>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-soft border border-neutral-200/50">
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">Estadísticas de Clientes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
            <div className="text-3xl font-display font-bold text-primary-600 mb-1">{clients.length}</div>
            <div className="text-sm font-medium text-primary-700">Total</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-xl">
            <div className="text-3xl font-display font-bold text-success-600 mb-1">
              {clients.filter(c => c.active).length}
            </div>
            <div className="text-sm font-medium text-success-700">Activos</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
            <div className="text-3xl font-display font-bold text-accent-600 mb-1">
              {clients.filter(c => c.client_type === 'individual').length}
            </div>
            <div className="text-sm font-medium text-accent-700">Individuales</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl">
            <div className="text-3xl font-display font-bold text-warning-600 mb-1">
              {clients.filter(c => c.client_type === 'business').length}
            </div>
            <div className="text-sm font-medium text-warning-700">Empresas</div>
          </div>
        </div>
      </div>
    </div>
  );
}