import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader, FiLogIn } from 'react-icons/fi'
import { useApp } from '../../contexts/app.context'
import type { LoginCredentials } from '../../types/auth.type'
import './Login.css'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, state } = useApp()

  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>('')

  // Get the intended destination from location state
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      await login(formData)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@example.com',
      password: 'admin123'
    })
    setError('')
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-card'>
          <div className='login-header'>
            <FiLogIn className='login-icon' />
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className='login-form'>
            {error && <div className='error-message'>{error}</div>}

            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <div className='input-wrapper'>
                <FiMail className='input-icon' />
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  disabled={state.isLoading}
                  required
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <div className='input-wrapper'>
                <FiLock className='input-icon' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  disabled={state.isLoading}
                  required
                />
                <button
                  type='button'
                  className='password-toggle'
                  onClick={togglePasswordVisibility}
                  disabled={state.isLoading}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type='submit' className='login-button' disabled={state.isLoading}>
              {state.isLoading ? (
                <>
                  <FiLoader className='loading-spinner' />
                  Signing In...
                </>
              ) : (
                <>
                  <FiLogIn />
                  Sign In
                </>
              )}
            </button>

            <div className='demo-section'>
              <button type='button' className='demo-button' onClick={fillDemoCredentials} disabled={state.isLoading}>
                Fill Demo Credentials
              </button>
              <p className='demo-info'>Use: admin@example.com / admin123</p>
            </div>
          </form>

          <div className='login-footer'>
            <p>
              Don't have an account?{' '}
              <Link to='/register' className='register-link'>
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
