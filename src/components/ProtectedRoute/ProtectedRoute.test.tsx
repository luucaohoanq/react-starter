import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { AppProvider } from '../../contexts/app.context'
import ProtectedRoute from './ProtectedRoute'

// Mock the Navigate component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: vi.fn(({ to }) => <div data-testid='navigate-to'>{to}</div>)
  }
})

const TestContent = () => <div data-testid='protected-content'>Protected Content</div>

const renderProtectedRoute = (props = {}, contextValue = {}) => {
  const defaultContextValue = {
    state: {
      isAuthenticated: false,
      user: null,
      isLoading: false
    },
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    ...contextValue
  }

  return render(
    <BrowserRouter>
      <AppProvider>
        <ProtectedRoute {...props}>
          <TestContent />
        </ProtectedRoute>
      </AppProvider>
    </BrowserRouter>
  )
}

describe('ProtectedRoute Component', () => {
  it('renders children when user is authenticated', () => {
    renderProtectedRoute(
      { requireAuth: true },
      {
        state: {
          isAuthenticated: true,
          user: { id: '1', name: 'John Doe', role: 'user' },
          isLoading: false
        }
      }
    )

    const content = screen.getByTestId('protected-content')
    expect(content).toBeInTheDocument()
  })

  it('redirects to login when not authenticated and auth is required', () => {
    renderProtectedRoute(
      { requireAuth: true },
      {
        state: {
          isAuthenticated: false,
          user: null,
          isLoading: false
        }
      }
    )

    const navigate = screen.getByTestId('navigate-to')
    expect(navigate).toHaveTextContent('/login')
  })

  it('renders children when requireAuth is false', () => {
    renderProtectedRoute(
      { requireAuth: false },
      {
        state: {
          isAuthenticated: false,
          user: null,
          isLoading: false
        }
      }
    )

    const content = screen.getByTestId('protected-content')
    expect(content).toBeInTheDocument()
  })

  it('shows loading state when authentication is being determined', () => {
    renderProtectedRoute(
      { requireAuth: true },
      {
        state: {
          isAuthenticated: false,
          user: null,
          isLoading: true
        }
      }
    )

    const loadingText = screen.getByText('Loading...')
    expect(loadingText).toBeInTheDocument()

    const loadingIcon = screen.getByRole('generic') // The FiLoader icon
    expect(loadingIcon).toBeInTheDocument()
  })

  it('allows admin access when user is admin and adminOnly is true', () => {
    renderProtectedRoute(
      { requireAuth: true, adminOnly: true },
      {
        state: {
          isAuthenticated: true,
          user: { id: '1', name: 'Admin User', role: 'admin' },
          isLoading: false
        }
      }
    )

    const content = screen.getByTestId('protected-content')
    expect(content).toBeInTheDocument()
  })

  it('redirects non-admin user when adminOnly is true', () => {
    renderProtectedRoute(
      { requireAuth: true, adminOnly: true },
      {
        state: {
          isAuthenticated: true,
          user: { id: '1', name: 'Regular User', role: 'user' },
          isLoading: false
        }
      }
    )

    const navigate = screen.getByTestId('navigate-to')
    expect(navigate).toHaveTextContent('/')
  })

  it('handles undefined user role correctly', () => {
    renderProtectedRoute(
      { requireAuth: true, adminOnly: true },
      {
        state: {
          isAuthenticated: true,
          user: { id: '1', name: 'User Without Role' }, // No role property
          isLoading: false
        }
      }
    )

    const navigate = screen.getByTestId('navigate-to')
    expect(navigate).toHaveTextContent('/')
  })

  it('preserves the intended location for redirect after login', () => {
    // Mock useLocation to return a specific pathname
    const mockLocation = { pathname: '/protected-page', search: '', hash: '', state: null }
    vi.doMock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useLocation: () => mockLocation,
        Navigate: vi.fn(({ to, state }) => (
          <div data-testid='navigate-to' data-state={JSON.stringify(state)}>
            {to}
          </div>
        ))
      }
    })

    renderProtectedRoute(
      { requireAuth: true },
      {
        state: {
          isAuthenticated: false,
          user: null,
          isLoading: false
        }
      }
    )

    const navigate = screen.getByTestId('navigate-to')
    expect(navigate).toHaveTextContent('/login')

    // Check if state includes the intended location
    const stateAttr = navigate.getAttribute('data-state')
    if (stateAttr) {
      const state = JSON.parse(stateAttr)
      expect(state.from).toBeDefined()
    }
  })

  it('renders children without authentication when requireAuth defaults to true but adminOnly is false', () => {
    renderProtectedRoute(
      {}, // No props, should default to requireAuth: true
      {
        state: {
          isAuthenticated: true,
          user: { id: '1', name: 'John Doe', role: 'user' },
          isLoading: false
        }
      }
    )

    const content = screen.getByTestId('protected-content')
    expect(content).toBeInTheDocument()
  })

  it('has proper loading state styling', () => {
    renderProtectedRoute(
      { requireAuth: true },
      {
        state: {
          isAuthenticated: false,
          user: null,
          isLoading: true
        }
      }
    )

    const loadingContainer = screen.getByText('Loading...').parentElement
    expect(loadingContainer).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    })
  })
})
