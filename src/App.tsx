import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes/routeConfig'
import ErrorBoundary from './components/ErrorBoundary'
import { AppProvider } from './contexts/app.context'

function App() {
  // Create router inside the component to ensure React context is available
  const router = createBrowserRouter(routes)

  return (
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
