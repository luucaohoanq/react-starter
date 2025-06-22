import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: boolean
  errorMessage?: string
  fullWidth?: boolean
  size?: 'small' | 'medium' | 'large'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, errorMessage, fullWidth, size = 'medium', className, ...props }, ref) => {
    const sizeClasses = {
      small: 'px-2 py-1 text-sm',
      medium: 'px-3 py-2',
      large: 'px-4 py-3 text-lg'
    }

    const baseClasses = `
      border border-gray-300 rounded-md
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      disabled:bg-gray-100 disabled:cursor-not-allowed
      transition-colors duration-200
    `

    const errorClasses = error ? 'border-red-500 focus:ring-red-500' : ''

    const widthClasses = fullWidth ? 'w-full' : ''

    const inputClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${errorClasses}
      ${widthClasses}
      ${className || ''}
    `.trim()

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            {label}
            {props.required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && errorMessage && <p className='mt-1 text-sm text-red-600'>{errorMessage}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
