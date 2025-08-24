import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  requireClient?: boolean
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  requireClient = false,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (requireAdmin && profile?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />
  }

  if (requireClient && profile?.role !== 'client') {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

// Loading component for better UX
export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    </div>
  )
}

// Unauthorized access component
export function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Acceso No Autorizado</h2>
        <p className="text-gray-600 mb-8">No tienes permisos para acceder a esta página.</p>
        <a 
          href="/" 
          className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  )
}