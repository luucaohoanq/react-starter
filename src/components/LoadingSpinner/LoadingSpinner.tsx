import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner: React.FC = () => (
  <div className='loading-container'>
    <div className='loading-spinner'></div>
    <p className='loading-text'>Loading...</p>
  </div>
)

export default LoadingSpinner
