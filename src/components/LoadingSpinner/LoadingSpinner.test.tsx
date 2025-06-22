import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner Component', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('img')
    expect(spinner).toBeInTheDocument()
  })

  it('has accessible aria-label', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('img')
    expect(spinner).toHaveAttribute('aria-label', 'Orange and tan hamster running in a metal wheel')
  })

  it('has the correct CSS classes', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('img')
    expect(spinner).toHaveClass('wheel-and-hamster')
  })

  it('contains all expected child elements', () => {
    const { container } = render(<LoadingSpinner />)

    // Check for wheel
    const wheel = container.querySelector('.wheel')
    expect(wheel).toBeInTheDocument()

    // Check for hamster body parts
    const hamster = container.querySelector('.hamster')
    expect(hamster).toBeInTheDocument()

    const hamsterBody = container.querySelector('.hamster__body')
    expect(hamsterBody).toBeInTheDocument()

    const hamsterHead = container.querySelector('.hamster__head')
    expect(hamsterHead).toBeInTheDocument()

    const hamsterEar = container.querySelector('.hamster__ear')
    expect(hamsterEar).toBeInTheDocument()

    const hamsterEye = container.querySelector('.hamster__eye')
    expect(hamsterEye).toBeInTheDocument()

    const hamsterNose = container.querySelector('.hamster__nose')
    expect(hamsterNose).toBeInTheDocument()

    const hamsterTail = container.querySelector('.hamster__tail')
    expect(hamsterTail).toBeInTheDocument()

    // Check for limbs
    const limbs = container.querySelectorAll('.hamster__limb')
    expect(limbs).toHaveLength(4)
  })

  it('is accessible as an image role', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('img')
    expect(spinner).toBeInTheDocument()
  })

  it('renders with styled-components wrapper', () => {
    const { container } = render(<LoadingSpinner />)
    // The component should be wrapped in styled-components containers
    expect(container.firstChild).toBeTruthy()
  })
})
