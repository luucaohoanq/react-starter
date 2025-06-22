import { http, HttpResponse } from 'msw'
import { dummyUsers } from '../data/dummyData'
import type { LoginCredentials, RegisterCredentials, User } from '../types/auth.type'

// In-memory storage for demo purposes
const registeredUsers = new Map<
  string,
  {
    user: User
    password: string
    accessToken: string
    refreshToken: string
  }
>()

// Generate mock tokens
const generateToken = (type: 'access' | 'refresh') => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2)
  return `${type}_${timestamp}_${random}`
}

// Default admin user for demo
const defaultUser: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

// Initialize with default user
registeredUsers.set('admin@example.com', {
  user: defaultUser,
  password: 'admin123',
  accessToken: generateToken('access'),
  refreshToken: generateToken('refresh')
})

export const handlers = [
  // Authentication endpoints
  http.post('/api/auth/login', async ({ request }) => {
    try {
      const credentials = (await request.json()) as LoginCredentials
      const { email, password } = credentials

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userRecord = registeredUsers.get(email.toLowerCase())

      if (!userRecord || userRecord.password !== password) {
        return HttpResponse.json(
          {
            data: null,
            message: 'Invalid email or password',
            success: false
          },
          { status: 401 }
        )
      }

      // Generate new tokens
      const accessToken = generateToken('access')
      const refreshToken = generateToken('refresh')

      // Update stored tokens
      userRecord.accessToken = accessToken
      userRecord.refreshToken = refreshToken

      return HttpResponse.json({
        data: {
          user: userRecord.user,
          accessToken,
          refreshToken
        },
        message: 'Login successful',
        success: true
      })
    } catch (error) {
      return HttpResponse.json(
        {
          data: null,
          message: 'Invalid request format',
          success: false
        },
        { status: 400 }
      )
    }
  }),

  http.post('/api/auth/register', async ({ request }) => {
    try {
      const credentials = (await request.json()) as RegisterCredentials
      const { name, email, password, confirmPassword } = credentials

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        return HttpResponse.json(
          {
            data: null,
            message: 'All fields are required',
            success: false
          },
          { status: 400 }
        )
      }

      if (password !== confirmPassword) {
        return HttpResponse.json(
          {
            data: null,
            message: 'Passwords do not match',
            success: false
          },
          { status: 400 }
        )
      }

      if (password.length < 6) {
        return HttpResponse.json(
          {
            data: null,
            message: 'Password must be at least 6 characters long',
            success: false
          },
          { status: 400 }
        )
      }

      if (registeredUsers.has(email.toLowerCase())) {
        return HttpResponse.json(
          {
            data: null,
            message: 'User with this email already exists',
            success: false
          },
          { status: 409 }
        )
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff`,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const accessToken = generateToken('access')
      const refreshToken = generateToken('refresh')

      // Store user
      registeredUsers.set(email.toLowerCase(), {
        user: newUser,
        password,
        accessToken,
        refreshToken
      })

      return HttpResponse.json({
        data: {
          user: newUser,
          accessToken,
          refreshToken
        },
        message: 'Registration successful',
        success: true
      })
    } catch (error) {
      return HttpResponse.json(
        {
          data: null,
          message: 'Invalid request format',
          success: false
        },
        { status: 400 }
      )
    }
  }),

  http.post('/api/auth/refresh', async ({ request }) => {
    try {
      const authHeader = request.headers.get('Authorization')
      const refreshToken = authHeader?.replace('Bearer ', '')

      if (!refreshToken) {
        return HttpResponse.json(
          {
            data: null,
            message: 'Refresh token is required',
            success: false
          },
          { status: 401 }
        )
      }

      // Find user by refresh token
      const userRecord = Array.from(registeredUsers.values()).find((record) => record.refreshToken === refreshToken)

      if (!userRecord) {
        return HttpResponse.json(
          {
            data: null,
            message: 'Invalid refresh token',
            success: false
          },
          { status: 401 }
        )
      }

      // Generate new tokens
      const newAccessToken = generateToken('access')
      const newRefreshToken = generateToken('refresh')

      // Update stored tokens
      userRecord.accessToken = newAccessToken
      userRecord.refreshToken = newRefreshToken

      return HttpResponse.json({
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        },
        message: 'Token refreshed successfully',
        success: true
      })
    } catch (error) {
      return HttpResponse.json(
        {
          data: null,
          message: 'Invalid request format',
          success: false
        },
        { status: 400 }
      )
    }
  }),

  // Users API
  http.get('/api/users', () => {
    return HttpResponse.json({
      data: dummyUsers,
      message: 'Users fetched successfully',
      success: true
    })
  }),

  http.get('/api/users/:id', ({ params }) => {
    const { id } = params
    const user = dummyUsers.find((u) => u.id === id)

    if (!user) {
      return HttpResponse.json(
        {
          data: null,
          message: 'User not found',
          success: false
        },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      data: user,
      message: 'User fetched successfully',
      success: true
    })
  })
]
