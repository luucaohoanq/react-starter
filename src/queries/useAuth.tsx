import { useMutation } from '@tanstack/react-query'
import type { MutationOptions, UseMutationResult } from '@tanstack/react-query'
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.type'

// API response interface
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// Login mutation
export const useLoginMutation = (options?: MutationOptions<AuthResponse, Error, LoginCredentials>) => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const result: ApiResponse<AuthResponse['data']> = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Login failed')
      }

      if (!result.success) {
        throw new Error(result.message || 'Login failed')
      }

      return {
        data: result.data,
        message: result.message,
        success: result.success
      }
    },
    ...options
  })
}

// Register mutation
export const useRegisterMutation = (options?: MutationOptions<AuthResponse, Error, RegisterCredentials>) => {
  return useMutation({
    mutationFn: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const result: ApiResponse<AuthResponse['data']> = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed')
      }

      if (!result.success) {
        throw new Error(result.message || 'Registration failed')
      }

      return {
        data: result.data,
        message: result.message,
        success: result.success
      }
    },
    ...options
  })
}

// Refresh token mutation
export const useRefreshTokenMutation = (
  options?: MutationOptions<{ accessToken: string; refreshToken: string }, Error, string>
) => {
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`
        }
      })

      const result: ApiResponse<{ accessToken: string; refreshToken: string }> = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Token refresh failed')
      }

      if (!result.success) {
        throw new Error(result.message || 'Token refresh failed')
      }

      return result.data
    },
    ...options
  })
}

// Query keys for auth-related operations
export const authQueryKeys = {
  all: ['auth'] as const,
  login: () => [...authQueryKeys.all, 'login'] as const,
  register: () => [...authQueryKeys.all, 'register'] as const,
  refresh: () => [...authQueryKeys.all, 'refresh'] as const
}
