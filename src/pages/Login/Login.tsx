import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader, FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useApp } from '../../contexts/app.context'
import { tourService } from '../../services/tourService'
import HelpButton from '../../components/HelpButton'
import { loginSchema, type LoginFormData } from '../../schemas/auth.schema'
import './Login.css'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, state } = useApp()

  const [showPassword, setShowPassword] = useState(false)

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Get the intended destination from location state
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/' // Auto-start login tour for new users
  useEffect(() => {
    // Only auto-start if user is not authenticated and it's their first time
    // Also avoid auto-starting immediately after logout
    if (!state.isAuthenticated && !state.isLoading && tourService.isNewUser()) {
      // Small delay to ensure the DOM is ready and user didn't just logout
      const timer = setTimeout(() => {
        tourService.startTour('login')
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [state.isAuthenticated, state.isLoading])

  // Force focus on email field when component mounts (helps with accessibility and ensures field is interactive)
  useEffect(() => {
    const emailField = document.getElementById('email')
    if (emailField && !state.isLoading) {
      emailField.focus()
    }
  }, [state.isLoading])

  // Form submission handler
  const onSubmit = async (data: LoginFormData) => {
    try {
      clearErrors()
      await login(data)
      navigate(from, { replace: true })
    } catch (err) {
      setError('root.serverError', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'Login failed'
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const fillDemoCredentials = () => {
    setValue('email', 'admin@example.com')
    setValue('password', 'admin123')
    clearErrors()
  }

  return (
    <div className='login-page'>
      <HelpButton />
      <div className='login-container'>
        <div className='login-card'>
          <div className='login-header'>
            <FiLogIn className='login-icon' />
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
            {/* Display server errors */}
            {errors.root?.serverError && <div className='error-message'>{errors.root.serverError.message}</div>}

            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <div className='input-wrapper'>
                <FiMail className='input-icon' />
                <input
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  disabled={state.isLoading || isSubmitting}
                  {...register('email')}
                />
              </div>
              {errors.email && <div className='field-error'>{errors.email.message}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <div className='input-wrapper'>
                <FiLock className='input-icon' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='Enter your password'
                  disabled={state.isLoading || isSubmitting}
                  {...register('password')}
                />
                <button
                  type='button'
                  className='password-toggle'
                  onClick={togglePasswordVisibility}
                  disabled={state.isLoading || isSubmitting}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <div className='field-error'>{errors.password.message}</div>}
            </div>

            <button type='submit' className='login-button' disabled={state.isLoading || isSubmitting}>
              {state.isLoading || isSubmitting ? (
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
              <button
                type='button'
                className='demo-button'
                onClick={fillDemoCredentials}
                disabled={state.isLoading || isSubmitting}
              >
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
