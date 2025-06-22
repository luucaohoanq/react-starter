import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../../contexts/app.context'
import { FiLoader } from 'react-icons/fi'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true }) => {
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
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  // If user is authenticated but trying to access auth pages (login/register)
  if (!requireAuth && state.isAuthenticated) {
    // Redirect to home page
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
