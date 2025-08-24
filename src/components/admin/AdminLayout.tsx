import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  FolderOpen,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Clientes', href: '/admin/clients', icon: Users },
  { name: 'Casos', href: '/admin/cases', icon: Briefcase },
  { name: 'Documentos', href: '/admin/documents', icon: FolderOpen },
  { name: 'Calendario', href: '/admin/calendar', icon: Calendar },
  { name: 'Configuración', href: '/admin/settings', icon: Settings }
]

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isCurrentPath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-72 flex-col bg-white/95 backdrop-blur-xl shadow-2xl border-r border-neutral-200/50">
            <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-200/50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-soft">
                    <span className="text-white font-display font-bold text-sm">DM</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-display font-bold text-neutral-900">Admin Panel</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-6 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isCurrentPath(item.href)
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                      isCurrentPath(item.href) ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-600'
                    }`} />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
            <div className="border-t border-neutral-200/50 p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center shadow-soft">
                    <User className="h-5 w-5 text-neutral-600" />
                  </div>
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-neutral-500 capitalize">{profile?.role}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-neutral-700 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
              >
                <LogOut className="mr-3 h-4 w-4 group-hover:text-red-600" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white/95 backdrop-blur-xl border-r border-neutral-200/50 shadow-soft">
          <div className="flex items-center h-16 px-6 border-b border-neutral-200/50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white font-display font-bold text-sm">DM</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-display font-bold text-neutral-900">Admin Panel</p>
                <p className="text-xs text-neutral-500">Dra. María González</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-6 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isCurrentPath(item.href)
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                    isCurrentPath(item.href) ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-600'
                  }`} />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-neutral-200/50 p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center shadow-soft">
                  <User className="h-5 w-5 text-neutral-600" />
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-neutral-500 capitalize">{profile?.role}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-neutral-700 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
            >
              <LogOut className="mr-3 h-4 w-4 group-hover:text-red-600" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 shadow-soft">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </button>
              {title && (
                <h1 className="ml-4 lg:ml-0 text-xl font-display font-bold text-neutral-900">
                  {title}
                </h1>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="block w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
              
              {/* Notifications */}
              <button className="relative p-2.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white shadow-sm"></span>
              </button>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button className="flex items-center p-2.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <div className="h-8 w-8 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center shadow-soft">
                    <User className="h-4 w-4 text-neutral-600" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 min-h-screen">
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}