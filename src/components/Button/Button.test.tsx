import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant='primary'>Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')

    rerender(<Button variant='secondary'>Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-secondary')

    rerender(<Button variant='outline'>Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-outline')

    rerender(<Button variant='ghost'>Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-ghost')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size='small'>Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-small')

    rerender(<Button size='medium'>Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-medium')

    rerender(<Button size='large'>Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-large')
  })

  it('shows loading state correctly', () => {
    render(<Button loading>Loading</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('btn-loading')
    expect(button).toBeDisabled()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('handles disabled state correctly', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('btn-disabled')

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies fullWidth class when specified', () => {
    render(<Button fullWidth>Full Width</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-full-width')
  })

  it('forwards additional props to button element', () => {
    render(
      <Button data-testid='custom-button' title='Custom Title'>
        Button
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-testid', 'custom-button')
    expect(button).toHaveAttribute('title', 'Custom Title')
  })

  it('has correct default variant and size', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('btn-primary')
    expect(button).toHaveClass('btn-medium')
  })

  it('supports custom className', () => {
    render(<Button className='custom-class'>Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('maintains button type attribute', () => {
    render(<Button type='submit'>Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes when loading', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button).toBeDisabled()
    })

    it('maintains accessibility when disabled', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toBeDisabled()
    })

    it('is keyboard accessible', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Keyboard</Button>)

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)

      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('Loading State Behavior', () => {
    it('prevents multiple clicks when loading', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      )

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('shows custom loading text when provided', () => {
      render(
        <Button loading loadingText='Processing...'>
          Process
        </Button>
      )
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    })
  })
})
