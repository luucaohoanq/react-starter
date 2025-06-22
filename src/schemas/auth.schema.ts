import * as yup from 'yup'

// Login validation schema
export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Please enter a valid email address').trim(),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long')
})

// Register validation schema
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters')
    .trim(),
  email: yup.string().required('Email is required').email('Please enter a valid email address').trim(),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must not exceed 100 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

// Type inference from schemas
export type LoginFormData = yup.InferType<typeof loginSchema>
export type RegisterFormData = yup.InferType<typeof registerSchema>
