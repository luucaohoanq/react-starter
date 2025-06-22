# Authentication System Documentation

This React starter template includes a complete authentication system with login, register, and app context that persists user data to localStorage.

## 🔐 Features

- **User Registration & Login**: Complete auth flow with validation
- **Protected Routes**: Automatic redirection based on auth status
- **Persistent Sessions**: User data saved to localStorage
- **Token Management**: Access and refresh token handling
- **Context-based State**: React Context API for global auth state
- **Mock API**: MSW handlers for realistic API simulation
- **React Query Integration**: Auth mutations with proper error handling

## 🏗️ Architecture

### Auth Context (`src/contexts/app.context.tsx`)

- **State Management**: User data, tokens, loading states
- **Actions**: Login, register, logout, token refresh
- **Persistence**: Automatic localStorage sync
- **Error Handling**: Centralized auth error management

### Protected Routes (`src/components/ProtectedRoute`)

- **Route Protection**: Redirects based on auth status
- **Loading States**: Shows spinner during auth check
- **Return URLs**: Preserves intended destination after login

### Auth Types (`src/types/auth.type.ts`)

- **User Interface**: Complete user data structure
- **Credentials**: Login and register form interfaces
- **API Responses**: Typed API response formats

## 📱 Components

### Login Page (`src/pages/Login`)

```tsx
// Demo credentials provided
Email: admin@example.com
Password: admin123
```

Features:

- Email/password validation
- Password visibility toggle
- Demo credentials button
- Loading states
- Error handling
- Responsive design

### Register Page (`src/pages/Register`)

- Form validation (name, email, password confirmation)
- Password strength requirements
- Real-time error feedback
- Auto-login after registration

### Layout Integration

- User menu with avatar/name display
- Logout functionality
- Responsive mobile navigation

## 🔧 API Endpoints (MSW)

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh

### Response Format

```json
{
  "data": {
    "user": { ... },
    "accessToken": "string",
    "refreshToken": "string"
  },
  "message": "Success message",
  "success": true
}
```

## 🎯 Usage Examples

### Using Auth Context

```tsx
import { useApp } from '../contexts/app.context'

function MyComponent() {
  const { state, login, logout } = useApp()

  // Check auth status
  if (state.isAuthenticated) {
    return <div>Welcome {state.user?.name}!</div>
  }

  // Login user
  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' })
    } catch (error) {
      console.error('Login failed:', error.message)
    }
  }

  return <button onClick={handleLogin}>Login</button>
}
```

### Protected Route Usage

```tsx
// Protect entire route
<ProtectedRoute requireAuth={true}>
  <DashboardPage />
</ProtectedRoute>

// Prevent access when authenticated (auth pages)
<ProtectedRoute requireAuth={false}>
  <LoginPage />
</ProtectedRoute>
```

### React Query Auth Mutations

```tsx
import { useLoginMutation } from '../queries/useAuth'

function LoginForm() {
  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      console.log('Login successful:', data.user.name)
    },
    onError: (error) => {
      console.error('Login failed:', error.message)
    }
  })

  const handleSubmit = (credentials) => {
    loginMutation.mutate(credentials)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type='submit' disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

## 💾 LocalStorage Structure

```javascript
// Stored keys
localStorage.setItem('auth_access_token', 'token_string')
localStorage.setItem('auth_refresh_token', 'refresh_token_string')
localStorage.setItem('auth_user', JSON.stringify(userObject))
```

## 🔄 Auto-logout Scenarios

The system automatically logs out users in these cases:

- Refresh token expires/invalid
- Manual logout button click
- Token refresh API call fails

## 🚀 Getting Started

1. **Login with demo account**:

   - Email: `admin@example.com`
   - Password: `admin123`

2. **Or register a new account**:

   - All fields required
   - Password minimum 6 characters
   - Passwords must match

3. **Access protected routes**:
   - Home, Users, About pages require authentication
   - Automatic redirect to login if not authenticated

## 🎨 Styling

All auth components include:

- Responsive design (mobile-first)
- Loading states with spinners
- Error message styling
- Form validation states
- Professional UI/UX

The authentication system provides a solid foundation for any React application requiring user management and secure route protection.
