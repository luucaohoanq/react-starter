import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiLoader, FiUserPlus } from 'react-icons/fi'
import { useApp } from '../../contexts/app.context'
import type { RegisterCredentials } from '../../types/auth.type'
import './Register.css'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { register, state } = useApp()

  const [formData, setFormData] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return 'Name is required'
    }
    if (!formData.email.trim()) {
      return 'Email is required'
    }
    if (!formData.password) {
      return 'Password is required'
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long'
    }
    if (!formData.confirmPassword) {
      return 'Please confirm your password'
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      await register(formData)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className='register-page'>
      <div className='register-container'>
        <div className='register-card'>
          <div className='register-header'>
            <FiUserPlus className='register-icon' />
            <h1>Create Account</h1>
            <p>Sign up to get started with your account</p>
          </div>

          <form onSubmit={handleSubmit} className='register-form'>
            {error && <div className='error-message'>{error}</div>}

            <div className='form-group'>
              <label htmlFor='name'>Full Name</label>
              <div className='input-wrapper'>
                <FiUser className='input-icon' />
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                  disabled={state.isLoading}
                  required
                />
              </div>
            </div>

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
                  placeholder='Create a password'
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
              <div className='password-hint'>Password must be at least 6 characters long</div>
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <div className='input-wrapper'>
                <FiLock className='input-icon' />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm your password'
                  disabled={state.isLoading}
                  required
                />
                <button
                  type='button'
                  className='password-toggle'
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={state.isLoading}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type='submit' className='register-button' disabled={state.isLoading}>
              {state.isLoading ? (
                <>
                  <FiLoader className='loading-spinner' />
                  Creating Account...
                </>
              ) : (
                <>
                  <FiUserPlus />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className='register-footer'>
            <p>
              Already have an account?{' '}
              <Link to='/login' className='login-link'>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
