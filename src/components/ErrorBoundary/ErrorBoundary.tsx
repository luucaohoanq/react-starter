import React, { Component, type ErrorInfo, type ReactNode } from 'react'
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi'
import './ErrorBoundary.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='error-boundary'>
          <div className='error-container'>
            <div className='error-icon'>
              <FiAlertTriangle />
            </div>
            <h1 className='error-title'>Oops! Something went wrong</h1>
            <p className='error-message'>
              We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home
              page.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='error-details'>
                <summary>Error Details (Development Only)</summary>
                <pre className='error-stack'>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className='error-actions'>
              <button onClick={this.handleReset} className='error-button primary'>
                <FiRefreshCw className='button-icon' />
                Try Again
              </button>
              <button onClick={this.handleGoHome} className='error-button secondary'>
                <FiHome className='button-icon' />
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
