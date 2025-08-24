import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { supabase } from '../../lib/supabase'
import {
  Users,
  Briefcase,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  DollarSign,
  BarChart3,
  MessageSquare,
  User,
  XCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface DashboardStats {
  totalClients: number
  activeCases: number
  totalBlogPosts: number
  pendingAppointments: number
  monthlyRevenue: number
  newInquiries: number
}

interface RecentActivity {
  id: string
  type: 'client' | 'case' | 'appointment' | 'inquiry'
  title: string
  description: string
  time: string
  status?: string
}

interface UpcomingAppointment {
  id: string
  client_name: string
  appointment_date: string
  appointment_time: string
  type: string
  status: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeCases: 0,
    totalBlogPosts: 0,
    pendingAppointments: 0,
    monthlyRevenue: 0,
    newInquiries: 0
  })
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load statistics
      const [clientsResult, casesResult, blogResult, appointmentsResult, inquiriesResult] = await Promise.all([
        supabase.from('clients').select('id', { count: 'exact' }),
        supabase.from('cases').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('appointments').select('id', { count: 'exact' }).eq('status', 'scheduled'),
        supabase.from('contact_inquiries').select('id', { count: 'exact' }).eq('status', 'pending')
      ])

      setStats({
        totalClients: clientsResult.count || 0,
        activeCases: casesResult.count || 0,
        totalBlogPosts: blogResult.count || 0,
        pendingAppointments: appointmentsResult.count || 0,
        monthlyRevenue: 45000, // Mock data
        newInquiries: inquiriesResult.count || 0
      })

      // Load recent activities (mock data for now)
      setRecentActivities([
        {
          id: '1',
          type: 'client',
          title: 'Nuevo cliente registrado',
          description: 'Ana García se registró como nuevo cliente',
          time: '2 horas',
          status: 'new'
        },
        {
          id: '2',
          type: 'case',
          title: 'Caso actualizado',
          description: 'Caso de divorcio - Documentos presentados',
          time: '4 horas',
          status: 'updated'
        },
        {
          id: '3',
          type: 'appointment',
          title: 'Cita programada',
          description: 'Consulta con Carlos Mendoza para mañana',
          time: '6 horas',
          status: 'scheduled'
        },
        {
          id: '4',
          type: 'inquiry',
          title: 'Nueva consulta',
          description: 'Consulta sobre derecho laboral recibida',
          time: '1 día',
          status: 'pending'
        }
      ])

      // Load upcoming appointments
      const { data: appointments } = await supabase
        .from('appointments')
        .select(`
          id,
          start_time,
          end_time,
          type,
          title,
          clients!inner(first_name, last_name)
        `)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(5)

      if (appointments) {
        setUpcomingAppointments(appointments.map(apt => ({
          id: apt.id,
          client_name: apt.clients ? `${(apt.clients as any).first_name} ${(apt.clients as any).last_name}` : 'Cliente',
          appointment_date: apt.start_time.split('T')[0],
          appointment_time: apt.start_time.split('T')[1].substring(0, 5),
          type: apt.type,
          status: 'scheduled'
        })))
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'client': return Users
      case 'case': return Briefcase
      case 'appointment': return Calendar
      case 'inquiry': return Mail
      default: return AlertCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-green-600 bg-green-100'
      case 'updated': return 'text-blue-600 bg-blue-100'
      case 'scheduled': return 'text-purple-600 bg-purple-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="mb-8">
              <div className="h-8 bg-neutral-200 rounded-xl w-1/4 mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded-xl w-1/2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft border border-neutral-200/50">
                  <div className="h-4 bg-neutral-200 rounded-xl w-1/2 mb-4"></div>
                  <div className="h-8 bg-neutral-200 rounded-xl w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 overflow-hidden shadow-soft rounded-2xl mb-8">
          <div className="px-6 py-8 sm:p-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-soft">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  Bienvenida, Dra. María González
                </h2>
                <p className="text-lg text-primary-100">
                  Aquí tienes un resumen de tu práctica legal de hoy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300 group">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Total Clientes</p>
                <p className="text-2xl font-display font-bold text-neutral-900">{stats.totalClients}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/clients" className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                Ver todos →
              </Link>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300 group">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Casos Activos</p>
                <p className="text-2xl font-display font-bold text-neutral-900">{stats.activeCases}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/cases" className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                Gestionar →
              </Link>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300 group">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Citas Pendientes</p>
                <p className="text-2xl font-display font-bold text-neutral-900">{stats.pendingAppointments}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/calendar" className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                Ver calendario →
              </Link>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300 group">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Posts del Blog</p>
                <p className="text-2xl font-display font-bold text-neutral-900">{stats.totalBlogPosts}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/blog" className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                Gestionar →
              </Link>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300 group">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Nuevas Consultas</p>
                <p className="text-2xl font-display font-bold text-neutral-900">{stats.newInquiries}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-primary-600">
                Requieren atención
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300 group">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Ingresos del Mes</p>
                <p className="text-2xl font-display font-bold text-neutral-900">
                  ${stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% vs mes anterior
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-neutral-200/50">
            <div className="p-6 border-b border-neutral-200/50">
              <h3 className="text-xl font-display font-bold text-neutral-900">Actividad Reciente</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-xl shadow-soft ${getStatusColor(activity.status || '')}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {activity.description}
                        </p>
                        <p className="text-xs text-neutral-400 mt-1">
                          Hace {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6">
                <Link
                  to="/admin/activity"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Ver toda la actividad →
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-neutral-200/50">
            <div className="p-6 border-b border-neutral-200/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-bold text-neutral-900">Próximas Citas</h3>
                <Link
                  to="/admin/calendar"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Ver calendario →
                </Link>
              </div>
            </div>
            <div className="p-6">
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-neutral-50/50 rounded-xl hover:bg-neutral-100/50 transition-all duration-200 group">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">
                            {appointment.client_name}
                          </p>
                          <p className="text-xs text-neutral-600">
                            {formatDate(appointment.appointment_date)} - {formatTime(appointment.appointment_time)}
                          </p>
                          <p className="text-xs text-neutral-500 capitalize">
                            {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-neutral-400" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600 mb-2">No hay citas programadas</p>
                  <p className="text-xs text-neutral-500 mb-4">Programa tu primera cita para comenzar</p>
                  <Link
                    to="/admin/calendar"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Programar cita
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/clients/new"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300"
            >
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nuevo Cliente</p>
                <p className="text-xs text-gray-500">Registrar cliente</p>
              </div>
            </Link>

            <Link
              to="/admin/cases/new"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-green-300"
            >
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Plus className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nuevo Caso</p>
                <p className="text-xs text-gray-500">Crear caso</p>
              </div>
            </Link>

            <Link
              to="/admin/blog/new"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-purple-300"
            >
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <Plus className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nuevo Post</p>
                <p className="text-xs text-gray-500">Escribir artículo</p>
              </div>
            </Link>

            <Link
              to="/admin/calendar/new"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-yellow-300"
            >
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <Plus className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nueva Cita</p>
                <p className="text-xs text-gray-500">Programar cita</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}