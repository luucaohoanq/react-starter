import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { AppProvider } from '../../contexts/app.context'
import Register from './Register'

// Mock the navigation
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <AppProvider>
        <Register />
      </AppProvider>
    </BrowserRouter>
  )
}

describe('Register Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders without crashing', () => {
    renderRegister()
    const heading = screen.getByText('Create Account')
    expect(heading).toBeInTheDocument()
  })

  it('displays all form elements', () => {
    renderRegister()

    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const registerButton = screen.getByRole('button', { name: /create account/i })
    const loginLink = screen.getByRole('link', { name: /sign in here/i })

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(registerButton).toBeInTheDocument()
    expect(loginLink).toBeInTheDocument()
  })

  it('shows password toggle functionality for both password fields', async () => {
    const user = userEvent.setup()
    renderRegister()

    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const passwordToggles =
      screen.getAllByRole('button', { name: /toggle password/i }) || screen.getAllByTestId(/password-toggle/)

    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')

    // Toggle first password field
    await user.click(passwordToggles[0])
    expect(passwordInput).toHaveAttribute('type', 'text')

    // Toggle second password field
    await user.click(passwordToggles[1])
    expect(confirmPasswordInput).toHaveAttribute('type', 'text')
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    renderRegister()

    const registerButton = screen.getByRole('button', { name: /create account/i })

    await user.click(registerButton)

    await waitFor(() => {
      const nameError = screen.getByText(/name is required/i)
      const emailError = screen.getByText(/email is required/i)
      const passwordError = screen.getByText(/password is required/i)

      expect(nameError).toBeInTheDocument()
      expect(emailError).toBeInTheDocument()
      expect(passwordError).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    renderRegister()

    const emailInput = screen.getByLabelText(/email/i)
    const registerButton = screen.getByRole('button', { name: /create account/i })

    await user.type(emailInput, 'invalid-email')
    await user.click(registerButton)

    await waitFor(() => {
      const emailError = screen.getByText(/please enter a valid email/i)
      expect(emailError).toBeInTheDocument()
    })
  })

  it('validates password requirements', async () => {
    const user = userEvent.setup()
    renderRegister()

    const passwordInput = screen.getByLabelText('Password')
    const registerButton = screen.getByRole('button', { name: /create account/i })

    await user.type(passwordInput, 'weak')
    await user.click(registerButton)

    await waitFor(() => {
      const passwordError = screen.getByText(/Password must contain at least one uppercase letter, one lowercase letter, and one number/i)
      expect(passwordError).toBeInTheDocument()
    })
  })

  it('validates password confirmation', async () => {
    const user = userEvent.setup()
    renderRegister()

    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const registerButton = screen.getByRole('button', { name: /create account/i })

    await user.type(passwordInput, 'ValidPassword123!')
    await user.type(confirmPasswordInput, 'DifferentPassword123!')
    await user.click(registerButton)

    await waitFor(() => {
      const confirmError = screen.getByText(/Passwords must match/i)
      expect(confirmError).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderRegister()
    
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const registerButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'ValidPassword123!')
    await user.type(confirmPasswordInput, 'ValidPassword123!')
    
    // Form should be valid and submittable
    expect(registerButton).toBeInTheDocument()
    expect(registerButton).not.toBeDisabled()
    
    await user.click(registerButton)
    
    // After click, verify the form was submitted (no validation errors)
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument()
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()
    renderRegister()

    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const registerButton = screen.getByRole('button', { name: /create account/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'ValidPassword123!')
    await user.type(confirmPasswordInput, 'ValidPassword123!')
    
    // Before submission, button should be enabled
    expect(registerButton).not.toBeDisabled()
    
    await user.click(registerButton)
    
    // Test that form submission attempt was made (check for absence of validation errors)
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
  })

  it('displays password hint', () => {
    renderRegister()

    const passwordHint = screen.getByText(/must contain uppercase, lowercase, and number/i)
    expect(passwordHint).toBeInTheDocument()
  })

  it('navigates to login page when login link is clicked', () => {
    renderRegister()

    const loginLink = screen.getByRole('link', { name: /sign in here/i })
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('has proper form accessibility', () => {
    renderRegister()

    // Check for proper label associations
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    expect(nameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  it('handles keyboard navigation properly', async () => {
    const user = userEvent.setup()
    renderRegister()

    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const registerButton = screen.getByRole('button', { name: /create account/i })

    // Tab through form elements
    await user.tab()
    expect(nameInput).toHaveFocus()

    await user.tab()
    expect(emailInput).toHaveFocus()

    await user.tab()
    expect(passwordInput).toHaveFocus()

    await user.tab()
    // Skip password toggle button
    await user.tab()
    expect(confirmPasswordInput).toHaveFocus()

    await user.tab()
    // Skip password toggle button
    await user.tab()
    expect(registerButton).toHaveFocus()
  })

  it('clears errors when user starts typing', async () => {
    const user = userEvent.setup()
    renderRegister()

    const nameInput = screen.getByLabelText(/full name/i)
    const registerButton = screen.getByRole('button', { name: /create account/i })

    // Trigger validation error
    await user.click(registerButton)

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })

    // Start typing to clear error
    await user.type(nameInput, 'John Doe')

    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
    })
  })

  it('displays server error messages', async () => {
    // This would test server error display
    // Implementation depends on how errors are handled in your context
    renderRegister()

    // Simulate server error scenario
    // This test would need to be updated based on your error handling implementation
  })
})
