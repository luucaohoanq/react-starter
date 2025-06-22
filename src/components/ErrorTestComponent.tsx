import { useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { IoBugOutline } from 'react-icons/io5'

const ErrorTestComponent = () => {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('This is a test error to demonstrate the ErrorBoundary!')
  }

  return (
    <div
      style={{
        padding: '1rem',
        margin: '1rem 0',
        border: '2px dashed #ef4444',
        borderRadius: '0.5rem',
        background: '#fef2f2',
        textAlign: 'center'
      }}
    >
      <FiAlertTriangle style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '0.5rem' }} />
      <h3 style={{ color: '#991b1b', marginBottom: '0.5rem' }}>Error Boundary Test</h3>
      <p style={{ color: '#7f1d1d', marginBottom: '1rem', fontSize: '0.875rem' }}>
        Click the button below to trigger an error and see the ErrorBoundary in action.
      </p>
      <button
        onClick={() => setShouldError(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        <IoBugOutline />
        Trigger Error
      </button>
    </div>
  )
}

export default ErrorTestComponent
