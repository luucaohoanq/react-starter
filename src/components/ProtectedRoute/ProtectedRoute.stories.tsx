import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../../contexts/app.context'
import ProtectedRoute from './ProtectedRoute'

const SampleProtectedContent = () => (
  <div style={{ padding: '20px', border: '2px solid green', borderRadius: '8px' }}>
    <h2>🔒 Protected Content</h2>
    <p>This content is only visible to authorized users!</p>
  </div>
)

const meta = {
  title: 'Components/ProtectedRoute',
  component: ProtectedRoute,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A route protection component that controls access based on authentication status and user roles.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppProvider>
          <div style={{ minHeight: '300px', width: '400px' }}>
            <Story />
          </div>
        </AppProvider>
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof ProtectedRoute>

export default meta
type Story = StoryObj<typeof meta>

export const AllowedAccess: Story = {
  args: {
    children: <SampleProtectedContent />,
    requireAuth: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Protected route when user is authenticated and has access.'
      }
    }
  }
}

export const NotAuthenticated: Story = {
  args: {
    children: <SampleProtectedContent />,
    requireAuth: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Protected route redirects to login when user is not authenticated.'
      }
    }
  }
}

export const LoadingState: Story = {
  args: {
    children: <SampleProtectedContent />,
    requireAuth: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows loading spinner while authentication status is being determined.'
      }
    }
  }
}

export const AdminOnlyAllowed: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', border: '2px solid purple', borderRadius: '8px' }}>
        <h2>👑 Admin Only Content</h2>
        <p>This content is only visible to administrators!</p>
      </div>
    ),
    requireAuth: true,
    adminOnly: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Admin-only protected route when user is an admin.'
      }
    }
  }
}

export const AdminOnlyDenied: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', border: '2px solid purple', borderRadius: '8px' }}>
        <h2>👑 Admin Only Content</h2>
        <p>This content is only visible to administrators!</p>
      </div>
    ),
    requireAuth: true,
    adminOnly: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Admin-only protected route when user is authenticated but not an admin.'
      }
    }
  }
}

export const PublicRoute: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', border: '2px solid blue', borderRadius: '8px' }}>
        <h2>🌍 Public Content</h2>
        <p>This content is visible to everyone!</p>
      </div>
    ),
    requireAuth: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Public route that does not require authentication.'
      }
    }
  }
}

export const NestedContent: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', border: '2px solid orange', borderRadius: '8px' }}>
        <h2>📦 Complex Protected Content</h2>
        <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <h3>User Dashboard</h3>
            <p>Welcome to your personal dashboard!</p>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <h3>Account Settings</h3>
            <p>Manage your account preferences here.</p>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <h3>Activity History</h3>
            <p>View your recent activity and transactions.</p>
          </div>
        </div>
      </div>
    ),
    requireAuth: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Protected route with complex nested content and components.'
      }
    }
  }
}
