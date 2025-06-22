import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiLoader, FiUserPlus } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useApp } from '../../contexts/app.context'
import { registerSchema, type RegisterFormData } from '../../schemas/auth.schema'
import './Register.css'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { register: registerUser, state } = useApp()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  // Form submission handler
  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearErrors()
      await registerUser(data)
      navigate('/', { replace: true })
    } catch (err) {
      setError('root.serverError', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'Registration failed'
      })
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
            <p>Join us today and get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
            {/* Display server errors */}
            {errors.root?.serverError && <div className='error-message'>{errors.root.serverError.message}</div>}

            <div className='form-group'>
              <label htmlFor='name'>Full Name</label>
              <div className='input-wrapper'>
                <FiUser className='input-icon' />
                <input
                  type='text'
                  id='name'
                  placeholder='Enter your full name'
                  disabled={state.isLoading || isSubmitting}
                  {...register('name')}
                />
              </div>
              {errors.name && <div className='field-error'>{errors.name.message}</div>}
            </div>

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
                  placeholder='Create a password'
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
              <div className='password-hint'>Must contain uppercase, lowercase, and number</div>
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <div className='input-wrapper'>
                <FiLock className='input-icon' />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  placeholder='Confirm your password'
                  disabled={state.isLoading || isSubmitting}
                  {...register('confirmPassword')}
                />
                <button
                  type='button'
                  className='password-toggle'
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={state.isLoading || isSubmitting}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && <div className='field-error'>{errors.confirmPassword.message}</div>}
            </div>

            <button type='submit' className='register-button' disabled={state.isLoading || isSubmitting}>
              {state.isLoading || isSubmitting ? (
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
