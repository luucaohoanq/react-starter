import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../contexts/app.context'
import './Footer.css'

const Footer: React.FC = () => {
  const { state } = useApp()

  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h4>React Starter</h4>
          <p>A modern React application with TypeScript, routing, and authentication.</p>
        </div>
        <div className='footer-section'>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            {state.isAuthenticated && (
              <>
                <li>
                  <Link to='/profile'>Profile</Link>
                </li>
                {state.user?.role === 'admin' && (
                  <li>
                    <Link to='/users'>Manage Users</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div className='footer-section'>
          <h4>User Info</h4>
          {state.isAuthenticated ? (
            <div className='footer-user-info'>
              <p>Welcome, {state.user?.name}</p>
              <span className='footer-user-role'>{state.user?.role}</span>
            </div>
          ) : (
            <div className='footer-auth-links'>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </div>
          )}
        </div>
        <div className='footer-section'>
          <h4>Features</h4>
          <ul>
            <li>Role-based Access</li>
            <li>User Profiles</li>
            <li>Admin Dashboard</li>
            <li>Responsive Design</li>
          </ul>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2025 React Starter. Built with React & TypeScript.</p>
      </div>
    </footer>
  )
}

export default Footer
