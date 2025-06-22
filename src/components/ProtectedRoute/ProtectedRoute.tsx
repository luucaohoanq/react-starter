import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../../contexts/app.context'
import { FiLoader } from 'react-icons/fi'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  adminOnly?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true, adminOnly = false }) => {
  const { state } = useApp()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (state.isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <FiLoader style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }} />
        <p>Loading...</p>
      </div>
    )
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !state.isAuthenticated) {
    // Redirect to login page with return path
    return <Navigate to='/' state={{ from: location }} replace />
  }

  // If admin access is required but user is not admin
  if (requireAuth && adminOnly && state.isAuthenticated && state.user?.role !== 'admin') {
    // Redirect to unauthorized page or home
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          flexDirection: 'column',
          gap: '1rem',
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: '#dc2626', fontSize: '1.5rem', fontWeight: '600' }}>Access Denied</h2>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>You need administrator privileges to access this page.</p>
        <p style={{ color: '#6b7280' }}>
          Current role: <strong>{state.user?.role}</strong>
        </p>
      </div>
    )
  }

  // If user is authenticated but trying to access auth pages (login/register)
  if (!requireAuth && state.isAuthenticated) {
    // Redirect to home page
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
