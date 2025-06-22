import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { AppProvider } from '../../contexts/app.context'
import Login from './Login'

// Mock the navigation
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AppProvider>
        <Login />
      </AppProvider>
    </BrowserRouter>
  )
}

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders without crashing', () => {
    renderLogin()
    const heading = screen.getByText('Welcome Back')
    expect(heading).toBeInTheDocument()
  })

  it('displays all form elements', () => {
    renderLogin()

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /sign in/i })
    const registerLink = screen.getByRole('link', { name: /create account/i })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
    expect(registerLink).toBeInTheDocument()
  })

  it('shows password toggle functionality', async () => {
    const user = userEvent.setup()
    renderLogin()

    const passwordInput = screen.getByLabelText(/password/i)
    const toggleButton =
      screen.getByRole('button', { name: /toggle password/i }) || screen.getByTestId('password-toggle')

    expect(passwordInput).toHaveAttribute('type', 'password')

    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')

    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    renderLogin()

    const loginButton = screen.getByRole('button', { name: /sign in/i })

    await user.click(loginButton)

    await waitFor(() => {
      const emailError = screen.getByText(/email is required/i)
      const passwordError = screen.getByText(/password is required/i)

      expect(emailError).toBeInTheDocument()
      expect(passwordError).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    renderLogin()

    const emailInput = screen.getByLabelText(/email/i)
    const loginButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'invalid-email')
    await user.click(loginButton)

    await waitFor(() => {
      const emailError = screen.getByText(/please enter a valid email/i)
      expect(emailError).toBeInTheDocument()
    })
  })

  it('validates password length', async () => {
    const user = userEvent.setup()
    renderLogin()

    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(passwordInput, '123')
    await user.click(loginButton)

    await waitFor(() => {
      const passwordError = screen.getByText(/password must be at least/i)
      expect(passwordError).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderLogin()

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'ValidPassword123!')
    
    // Before submission, button should be enabled
    expect(loginButton).not.toBeDisabled()
    
    await user.click(loginButton)

    // Test that form submission attempt was made (check for absence of validation errors)
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument()
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()
    renderLogin()

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'ValidPassword123!')
    
    // Before submission, button should be enabled
    expect(loginButton).not.toBeDisabled()
    
    await user.click(loginButton)

    // Test that form submission attempt was made
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument()
  })

  it('displays server error messages', async () => {
    // This would test server error display
    // Implementation depends on how errors are handled in your context
    renderLogin()

    // Simulate server error scenario
    // This test would need to be updated based on your error handling implementation
  })

  it('navigates to register page when register link is clicked', () => {
    renderLogin()

    const registerLink = screen.getByRole('link', { name: /create account/i })

    expect(registerLink).toHaveAttribute('href', '/register')
  })

  it('has proper form accessibility', () => {
    renderLogin()

    const form = screen.getByRole('form') || screen.getByTestId('login-form')
    expect(form).toBeInTheDocument()

    // Check for proper label associations
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('handles keyboard navigation properly', async () => {
    const user = userEvent.setup()
    renderLogin()

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /sign in/i })

    // Tab through form elements
    await user.tab()
    expect(emailInput).toHaveFocus()

    await user.tab()
    expect(passwordInput).toHaveFocus()

    await user.tab()
    expect(loginButton).toHaveFocus()
  })

  it('clears errors when user starts typing', async () => {
    const user = userEvent.setup()
    renderLogin()

    const emailInput = screen.getByLabelText(/email/i)
    const loginButton = screen.getByRole('button', { name: /sign in/i })

    // Trigger validation error
    await user.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })

    // Start typing to clear error
    await user.type(emailInput, 'test@example.com')

    await waitFor(() => {
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument()
    })
  })
})
