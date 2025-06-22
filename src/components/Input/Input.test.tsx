import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Input from './Input'

describe('Input Component', () => {
  it('renders with basic props', () => {
    render(<Input placeholder='Enter text' />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label='Username' placeholder='Enter username' />)
    const label = screen.getByText('Username')
    const input = screen.getByPlaceholderText('Enter username')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(<Input label='Email' required />)
    const asterisk = screen.getByText('*')
    expect(asterisk).toBeInTheDocument()
    expect(asterisk).toHaveClass('text-red-500')
  })

  it('handles different input types', () => {
    render(<Input type='email' placeholder='Enter email' />)
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('shows error state correctly', () => {
    render(<Input error errorMessage='This field is required' />)
    const errorMessage = screen.getByText('This field is required')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-red-600')
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder='Disabled input' />)
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Input size='small' />)
    let input = screen.getByRole('textbox')
    expect(input).toHaveClass('px-2', 'py-1', 'text-sm')

    rerender(<Input size='medium' />)
    input = screen.getByRole('textbox')
    expect(input).toHaveClass('px-3', 'py-2')

    rerender(<Input size='large' />)
    input = screen.getByRole('textbox')
    expect(input).toHaveClass('px-4', 'py-3', 'text-lg')
  })

  it('applies full width when specified', () => {
    render(<Input fullWidth />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('w-full')
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'test')
    expect(handleChange).toHaveBeenCalledTimes(4) // Called for each character
  })

  it('supports controlled input', () => {
    const handleChange = vi.fn()
    render(<Input value='test value' onChange={handleChange} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('test value')
  })

  it('forwards ref correctly', () => {
    let ref: HTMLInputElement | null = null

    render(
      <Input
        ref={(el) => {
          ref = el
        }}
      />
    )

    expect(ref).toBeInstanceOf(HTMLInputElement)
  })

  it('applies custom className', () => {
    render(<Input className='custom-class' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  it('handles focus and blur events', async () => {
    const user = userEvent.setup()
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    const input = screen.getByRole('textbox')

    await user.click(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)

    await user.tab()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('validates accessibility attributes', () => {
    render(<Input label='Test Input' required error errorMessage='Error message' aria-describedby='help-text' />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'help-text')
    expect(input).toBeRequired()
  })

  describe('Error state styling', () => {
    it('applies error border when error is true', () => {
      render(<Input error />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-500', 'focus:ring-red-500')
    })

    it('shows error message when provided', () => {
      render(<Input error errorMessage='Something went wrong' />)
      const errorText = screen.getByText('Something went wrong')
      expect(errorText).toBeInTheDocument()
      expect(errorText).toHaveClass('text-red-600')
    })
  })

  describe('Integration tests', () => {
    it('works as part of a form', async () => {
      const user = userEvent.setup()
      const handleSubmit = vi.fn()

      render(
        <form onSubmit={handleSubmit}>
          <Input name='username' placeholder='Username' required />
          <button type='submit'>Submit</button>
        </form>
      )

      const input = screen.getByPlaceholderText('Username')
      const button = screen.getByText('Submit')

      await user.type(input, 'testuser')
      await user.click(button)

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
