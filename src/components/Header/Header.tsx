import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiUsers, FiInfo, FiMenu, FiX, FiLogOut, FiUser, FiLogIn } from 'react-icons/fi'
import { useApp } from '../../contexts/app.context'
import './Header.css'

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)
  const location = useLocation()
  const { state, logout } = useApp()

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/users', label: 'Users', icon: FiUsers, requireAuth: true, adminOnly: true },
    { path: '/profile', label: 'Profile', icon: FiUser, requireAuth: true },
    { path: '/about', label: 'About', icon: FiInfo }
  ]

  // Filter nav items based on authentication status and role
  const visibleNavItems = navItems.filter((item) => {
    // Show item if no auth required
    if (!item.requireAuth) return true

    // Don't show if not authenticated
    if (!state.isAuthenticated) return false

    // Show admin-only items only to admins
    if (item.adminOnly && state.user?.role !== 'admin') return false

    return true
  })

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <header className='header'>
      <div className='header-content'>
        <div className='logo'>
          <Link to='/' className='logo-link'>
            <span className='logo-icon'>⚛️</span>
            <span className='logo-text'>React Starter</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className='desktop-nav'>
          {visibleNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.path} to={item.path} className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}>
                <Icon className='nav-icon' />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Menu or Auth Buttons */}
        {state.isAuthenticated ? (
          <div className='user-menu'>
            <button className='user-menu-button' onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              {state.user?.avatar ? (
                <img src={state.user.avatar} alt={state.user.name} className='user-avatar' />
              ) : (
                <FiUser className='user-icon' />
              )}
              <span className='user-name'>{state.user?.name}</span>
              <span className='user-role-badge'>{state.user?.role}</span>
            </button>

            {isUserMenuOpen && (
              <div className='user-menu-dropdown'>
                <div className='user-info'>
                  <p className='user-name-dropdown'>{state.user?.name}</p>
                  <p className='user-email'>{state.user?.email}</p>
                  <span className='user-role'>{state.user?.role}</span>
                </div>
                <div className='menu-divider'></div>
                <Link to='/profile' className='menu-item' onClick={() => setIsUserMenuOpen(false)}>
                  <FiUser />
                  My Profile
                </Link>
                {state.user?.role === 'admin' && (
                  <Link to='/users' className='menu-item' onClick={() => setIsUserMenuOpen(false)}>
                    <FiUsers />
                    Manage Users
                  </Link>
                )}
                <div className='menu-divider'></div>
                <button className='logout-button' onClick={handleLogout}>
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='auth-buttons'>
            <Link to='/login' className='auth-button login-btn'>
              <FiLogIn />
              Login
            </Link>
            <Link to='/register' className='auth-button register-btn'>
              <FiUser />
              Register
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className='mobile-menu-button' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className='mobile-nav'>
          {visibleNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className='nav-icon' />
                {item.label}
              </Link>
            )
          })}

          {/* Mobile User Info & Logout or Auth Buttons */}
          {state.isAuthenticated ? (
            <div className='mobile-user-section'>
              <div className='mobile-user-info'>
                {state.user?.avatar ? (
                  <img src={state.user.avatar} alt={state.user.name} className='mobile-user-avatar' />
                ) : (
                  <FiUser className='mobile-user-icon' />
                )}
                <div className='mobile-user-details'>
                  <p className='mobile-user-name'>{state.user?.name}</p>
                  <p className='mobile-user-email'>{state.user?.email}</p>
                  <span className='mobile-user-role'>{state.user?.role}</span>
                </div>
              </div>
              <div className='mobile-menu-actions'>
                <Link to='/profile' className='mobile-menu-action' onClick={() => setIsMobileMenuOpen(false)}>
                  <FiUser />
                  Profile
                </Link>
                {state.user?.role === 'admin' && (
                  <Link to='/users' className='mobile-menu-action' onClick={() => setIsMobileMenuOpen(false)}>
                    <FiUsers />
                    Users
                  </Link>
                )}
              </div>
              <button
                className='mobile-logout-button'
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          ) : (
            <div className='mobile-auth-section'>
              <Link to='/login' className='mobile-auth-button login-btn' onClick={() => setIsMobileMenuOpen(false)}>
                <FiLogIn />
                Login
              </Link>
              <Link
                to='/register'
                className='mobile-auth-button register-btn'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiUser />
                Register
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header
