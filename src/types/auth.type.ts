// Authentication types and interfaces

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  data: {
    user: User
    accessToken: string
    refreshToken: string
  }
  message: string
  success: boolean
}

export interface AuthError {
  message: string
  field?: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
