import { type RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import LayoutDefault from '../layouts/LayoutDefault'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/LoadingSpinner'

// Lazy load components
const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About/About'))
const UsersList = lazy(() => import('../pages/UserList/UsersList'))
const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'))
const Profile = lazy(() => import('../pages/Profile'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))

export const routes: RouteObject[] = [
  // Authentication routes (accessible when not authenticated)
  {
    path: '/login',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      </ProtectedRoute>
    )
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingSpinner />}>
          <Register />
        </Suspense>
      </ProtectedRoute>
    )
  },
  // Main layout with mixed protected/public routes
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute requireAuth={true}>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute requireAuth={true} adminOnly={true}>
            <Suspense fallback={<LoadingSpinner />}>
              <UsersList />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'users/:userId',
        element: (
          <ProtectedRoute requireAuth={true} adminOnly={true}>
            <Suspense fallback={<LoadingSpinner />}>
              <UserProfile />
            </Suspense>
          </ProtectedRoute>
        )
      }
    ]
  }
]
