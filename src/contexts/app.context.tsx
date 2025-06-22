import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/auth.type'
import type { AuthState } from '../types/auth.type'
import type { LoginCredentials } from '../types/auth.type'
import type { RegisterCredentials } from '../types/auth.type'

// Auth Actions
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; accessToken: string; refreshToken: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_TOKENS'; payload: { accessToken: string; refreshToken: string } }

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true
}

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_TOKENS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    default:
      return state
  }
}

// Context interface
interface AppContextType {
  state: AuthState
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
  refreshToken: () => Promise<void>
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Local storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER: 'auth_user'
}

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load auth data from localStorage on mount
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
        const userStr = localStorage.getItem(STORAGE_KEYS.USER)

        if (accessToken && refreshToken && userStr) {
          const user = JSON.parse(userStr)
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, accessToken, refreshToken }
          })
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('Error loading auth data from localStorage:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    loadAuthData()
  }, [])

  // Save auth data to localStorage
  const saveAuthData = (user: User, accessToken: string, refreshToken: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    } catch (error) {
      console.error('Error saving auth data to localStorage:', error)
    }
  }

  // Clear auth data from localStorage
  const clearAuthData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
    } catch (error) {
      console.error('Error clearing auth data from localStorage:', error)
    }
  }

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      if (!data.success) {
        throw new Error(data.message || 'Login failed')
      }

      const { user, accessToken, refreshToken } = data.data

      // Save to localStorage
      saveAuthData(user, accessToken, refreshToken)

      // Update state
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, accessToken, refreshToken }
      })
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
      throw error
    }
  }

  // Register function
  const register = async (credentials: RegisterCredentials): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      if (!data.success) {
        throw new Error(data.message || 'Registration failed')
      }

      const { user, accessToken, refreshToken } = data.data

      // Save to localStorage
      saveAuthData(user, accessToken, refreshToken)

      // Update state
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, accessToken, refreshToken }
      })
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
      throw error
    }
  }

  // Logout function
  const logout = () => {
    clearAuthData()
    dispatch({ type: 'LOGOUT' })
  }

  // Update user function
  const updateUser = (user: User) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
      dispatch({ type: 'UPDATE_USER', payload: user })
    } catch (error) {
      console.error('Error updating user in localStorage:', error)
    }
  }

  // Refresh token function
  const refreshTokenFn = async (): Promise<void> => {
    if (!state.refreshToken) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.refreshToken}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Token refresh failed')
      }

      if (!data.success) {
        throw new Error(data.message || 'Token refresh failed')
      }

      const { accessToken, refreshToken } = data.data

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)

      // Update state
      dispatch({
        type: 'SET_TOKENS',
        payload: { accessToken, refreshToken }
      })
    } catch (error) {
      // If refresh fails, logout user
      logout()
      throw error
    }
  }

  const contextValue: AppContextType = {
    state,
    login,
    register,
    logout,
    updateUser,
    refreshToken: refreshTokenFn
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext
