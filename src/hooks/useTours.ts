import { useEffect } from 'react'
import { useApp } from '../contexts/app.context'
import { tourService } from '../services/tourService'

export const useTours = () => {
  const { state } = useApp()

  useEffect(() => {
    // Only run tours for authenticated users
    if (!state.isAuthenticated || state.isLoading) return

    // Check if this is a new user (hasn't seen any tours)
    if (tourService.isNewUser()) {
      // Wait a bit for the UI to fully load, then start welcome tour
      const timer = setTimeout(() => {
        tourService.startTour('welcome', state.user || undefined)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [state.isAuthenticated, state.isLoading, state.user])

  return {
    startTour: (type: 'welcome' | 'profile' | 'admin' | 'features') => {
      tourService.startTour(type, state.user || undefined)
    },
    isNewUser: tourService.isNewUser()
  }
}

export default useTours
