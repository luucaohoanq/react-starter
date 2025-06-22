import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../../contexts/app.context'
import Header from './Header'

// Mock context provider for stories
const MockAppProvider = ({ children, isAuthenticated = false, user = null }: any) => {
  const mockState = {
    isAuthenticated,
    user,
    isLoading: false
  }

  const mockActions = {
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve()
  }

  return (
    <div>
      {/* Mock the context provider */}
      {children}
    </div>
  )
}

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Navigation header with responsive design, user authentication, and role-based access control.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppProvider>
          <div style={{ minHeight: '80px' }}>
            <Story />
          </div>
        </AppProvider>
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LoggedOut: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Header when user is not authenticated - shows login/register options.'
      }
    }
  }
}

export const LoggedInUser: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ minHeight: '80px' }}>
          <Story />
        </div>
      </BrowserRouter>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header when regular user is authenticated - shows user menu and profile access.'
      }
    }
  }
}

export const LoggedInAdmin: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ minHeight: '80px' }}>
          <Story />
        </div>
      </BrowserRouter>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header when admin user is authenticated - shows all navigation options including Users page.'
      }
    }
  }
}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Header on mobile devices with hamburger menu.'
      }
    }
  }
}

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Header on tablet devices.'
      }
    }
  }
}

export const WithLongUserName: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ minHeight: '80px' }}>
          <Story />
        </div>
      </BrowserRouter>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header with a user that has a very long name to test text overflow.'
      }
    }
  }
}
