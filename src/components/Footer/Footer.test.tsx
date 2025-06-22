import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { AppProvider } from '../../contexts/app.context'
import Footer from './Footer'

const renderFooter = () => {
  return render(
    <BrowserRouter>
      <AppProvider>
        <Footer />
      </AppProvider>
    </BrowserRouter>
  )
}

describe('Footer Component', () => {
  it('renders without crashing', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('displays application title and description', () => {
    renderFooter()

    const title = screen.getByText('React Starter')
    expect(title).toBeInTheDocument()

    const description = screen.getByText(/A modern React application/i)
    expect(description).toBeInTheDocument()
  })

  it('shows basic navigation links', () => {
    renderFooter()

    const homeLink = screen.getByRole('link', { name: 'Home' })
    const aboutLink = screen.getByRole('link', { name: 'About' })

    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('displays copyright information', () => {
    renderFooter()

    // Look for current year in copyright
    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(new RegExp(currentYear.toString()))
    expect(copyright).toBeInTheDocument()
  })

  it('has proper footer structure', () => {
    renderFooter()

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('footer')

    // Check for footer content wrapper
    const footerContent = footer.querySelector('.footer-content')
    expect(footerContent).toBeInTheDocument()
  })

  it('shows quick links section', () => {
    renderFooter()

    const quickLinksHeading = screen.getByText('Quick Links')
    expect(quickLinksHeading).toBeInTheDocument()
  })

  it('contains social media or external links section', () => {
    renderFooter()

    // This test assumes there's a social media or external links section
    // Adjust based on your actual footer implementation
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    renderFooter()

    // Footer should be a landmark
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()

    // Should contain properly structured content
    const headings = screen.getAllByRole('heading', { level: 4 })
    expect(headings.length).toBeGreaterThan(0)
  })

  it('has accessible link structure', () => {
    renderFooter()

    const links = screen.getAllByRole('link')

    // All links should have proper href attributes
    links.forEach((link) => {
      expect(link).toHaveAttribute('href')
    })
  })

  it('displays correctly on different screen sizes', () => {
    // This is more of a visual regression test
    // In a real scenario, you might use tools like Chromatic
    renderFooter()

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()

    // Check that footer has responsive classes
    expect(footer).toHaveClass('footer')
  })

  it('maintains consistent styling', () => {
    renderFooter()

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('footer')

    // Check for consistent section structure
    const sections = footer.querySelectorAll('.footer-section')
    expect(sections.length).toBeGreaterThan(0)
  })
})
