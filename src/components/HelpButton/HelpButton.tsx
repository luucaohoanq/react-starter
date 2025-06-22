import React, { useState } from 'react'
import { FiHelpCircle, FiPlay, FiUser, FiUsers, FiStar, FiX } from 'react-icons/fi'
import { useApp } from '../../contexts/app.context'
import { tourService } from '../../services/tourService'
import { useLocation } from 'react-router-dom'
import './HelpButton.css'

const HelpButton: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state } = useApp()
  const location = useLocation()

  const isAdmin = state.user?.role === 'admin'
  const isProfilePage = location.pathname === '/profile'
  const isUsersPage = location.pathname.startsWith('/users')
  const isLoginPage = location.pathname === '/login' || location.pathname === '/'

  const handleTourStart = (tourType: 'welcome' | 'profile' | 'admin' | 'features' | 'login') => {
    tourService.startTour(tourType, state.user || undefined)
    setIsMenuOpen(false)
  }

  const tourOptions = [
    {
      id: 'login' as const,
      label: 'Login Guide',
      description: 'Learn how to log in and get started',
      icon: FiPlay,
      available: isLoginPage && !state.isAuthenticated
    },
    {
      id: 'welcome' as const,
      label: 'App Overview',
      description: 'Learn about the main features and navigation',
      icon: FiPlay,
      available: state.isAuthenticated
    },
    {
      id: 'profile' as const,
      label: 'Profile Tour',
      description: 'Explore your profile page features',
      icon: FiUser,
      available: isProfilePage
    },
    {
      id: 'admin' as const,
      label: 'Admin Features',
      description: 'Learn about user management (Admin only)',
      icon: FiUsers,
      available: isAdmin && isUsersPage
    },
    {
      id: 'features' as const,
      label: 'Technical Features',
      description: 'Discover the technical highlights',
      icon: FiStar,
      available: true
    }
  ]

  const availableTours = tourOptions.filter((tour) => tour.available)

  return (
    <div className='help-button-container'>
      <button className='help-button' onClick={() => setIsMenuOpen(!isMenuOpen)} title='Get Help & Take Tours'>
        <FiHelpCircle />
      </button>

      {isMenuOpen && (
        <>
          <div className='help-overlay' onClick={() => setIsMenuOpen(false)} />
          <div className='help-menu'>
            <div className='help-menu-header'>
              <h3>Help & Tours</h3>
              <button className='help-menu-close' onClick={() => setIsMenuOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className='help-menu-content'>
              <p className='help-menu-description'>Take an interactive tour to learn how to use the application:</p>

              <div className='tour-options'>
                {availableTours.map((tour) => {
                  const Icon = tour.icon
                  return (
                    <button key={tour.id} className='tour-option' onClick={() => handleTourStart(tour.id)}>
                      <div className='tour-option-icon'>
                        <Icon />
                      </div>
                      <div className='tour-option-content'>
                        <h4>{tour.label}</h4>
                        <p>{tour.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {state.isAuthenticated && (
                <div className='help-user-info'>
                  <div className='help-user-details'>
                    <span className='help-user-name'>{state.user?.name}</span>
                    <span className={`help-user-role role-${state.user?.role}`}>{state.user?.role}</span>
                  </div>
                  <p className='help-user-tip'>
                    {isAdmin
                      ? 'As an admin, you have access to all tours and features.'
                      : 'Some features are only available to administrators.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default HelpButton
