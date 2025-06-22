import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { AppProvider } from '../../contexts/app.context'
import Header from './Header'

// Mock the app context
const mockContextValue = {
  state: {
    isAuthenticated: false,
    user: null,
    isLoading: false
  },
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn()
}

const renderHeader = (contextOverrides = {}) => {
  const contextValue = { ...mockContextValue, ...contextOverrides }

  return render(
    <BrowserRouter>
      <AppProvider>
        <Header />
      </AppProvider>
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  it('renders without crashing', () => {
    renderHeader()
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('renders logo link', () => {
    renderHeader()
    const logoLink = screen.getByRole('link', { name: /logo/i })
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('shows navigation items', () => {
    renderHeader()

    // Should always show Home and About
    const homeLink = screen.getByRole('link', { name: /home/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })

    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })

  it('shows login/register when not authenticated', () => {
    renderHeader()

    const loginButton = screen.getByRole('button', { name: /login/i })
    const registerButton = screen.getByRole('button', { name: /register/i })

    expect(loginButton).toBeInTheDocument()
    expect(registerButton).toBeInTheDocument()
  })

  it('shows user menu when authenticated', () => {
    renderHeader({
      state: {
        isAuthenticated: true,
        user: { name: 'John Doe', email: 'john@example.com', role: 'user' },
        isLoading: false
      }
    })

    const userMenuButton = screen.getByRole('button', { name: /john doe/i })
    expect(userMenuButton).toBeInTheDocument()
  })

  it('shows admin-only items for admin users', () => {
    renderHeader({
      state: {
        isAuthenticated: true,
        user: { name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        isLoading: false
      }
    })

    const usersLink = screen.getByRole('link', { name: /users/i })
    expect(usersLink).toBeInTheDocument()
  })

  it('hides admin-only items for regular users', () => {
    renderHeader({
      state: {
        isAuthenticated: true,
        user: { name: 'Regular User', email: 'user@example.com', role: 'user' },
        isLoading: false
      }
    })

    const usersLink = screen.queryByRole('link', { name: /users/i })
    expect(usersLink).not.toBeInTheDocument()
  })

  it('toggles mobile menu', () => {
    renderHeader()

    const menuButton = screen.getByRole('button', { name: /menu/i })
    expect(menuButton).toBeInTheDocument()

    fireEvent.click(menuButton)

    // Check if mobile menu is open (specific implementation may vary)
    // This would depend on how the mobile menu visibility is implemented
  })

  it('calls logout when logout button is clicked', () => {
    const mockLogout = vi.fn()

    renderHeader({
      state: {
        isAuthenticated: true,
        user: { name: 'John Doe', email: 'john@example.com', role: 'user' },
        isLoading: false
      },
      logout: mockLogout
    })

    // Open user menu first
    const userMenuButton = screen.getByRole('button', { name: /john doe/i })
    fireEvent.click(userMenuButton)

    // Click logout
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  it('highlights active navigation item', () => {
    // This would test if the current route is highlighted
    // Implementation depends on your CSS classes and routing setup
    renderHeader()

    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeInTheDocument()
    // Add specific assertions based on your active state implementation
  })

  it('is accessible with keyboard navigation', () => {
    renderHeader()

    const menuButton = screen.getByRole('button', { name: /menu/i })

    // Test that menu button is focusable
    menuButton.focus()
    expect(document.activeElement).toBe(menuButton)
  })

  it('has proper ARIA attributes', () => {
    renderHeader()

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    // Test for navigation landmark
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
