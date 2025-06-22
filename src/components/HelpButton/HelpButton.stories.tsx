import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../../contexts/app.context'
import HelpButton from './HelpButton'

const meta = {
  title: 'Components/HelpButton',
  component: HelpButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A contextual help button that provides guided tours based on the current page and user role.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppProvider>
          <div style={{ position: 'relative', height: '200px', width: '200px' }}>
            <Story />
          </div>
        </AppProvider>
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof HelpButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default help button when user is not authenticated on the home page.'
      }
    }
  }
}

export const OnLoginPage: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter initialEntries={['/login']}>
        <AppProvider>
          <div style={{ position: 'relative', height: '200px', width: '200px' }}>
            <Story />
          </div>
        </AppProvider>
      </BrowserRouter>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Help button on login page - shows login guide option.'
      }
    }
  }
}

export const AuthenticatedUser: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Help button for authenticated regular user - shows available tours.'
      }
    }
  }
}

export const AdminUser: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Help button for admin user - shows all available tours including admin-specific ones.'
      }
    }
  }
}

export const OnProfilePage: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter initialEntries={['/profile']}>
        <AppProvider>
          <div style={{ position: 'relative', height: '200px', width: '200px' }}>
            <Story />
          </div>
        </AppProvider>
      </BrowserRouter>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Help button on profile page - shows profile-specific tour.'
      }
    }
  }
}

export const OnUsersPage: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter initialEntries={['/users']}>
        <AppProvider>
          <div style={{ position: 'relative', height: '200px', width: '200px' }}>
            <Story />
          </div>
        </AppProvider>
      </BrowserRouter>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Help button on users page - shows admin tour options.'
      }
    }
  }
}

export const MenuOpen: Story = {
  render: () => {
    // This would show the help button with menu open
    // You might need to modify the component to accept an initial state prop
    return <HelpButton />
  },
  parameters: {
    docs: {
      description: {
        story: 'Help button with dropdown menu open showing available tour options.'
      }
    }
  }
}

export const FixedPosition: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppProvider>
          <div
            style={{
              position: 'relative',
              height: '400px',
              width: '100%',
              border: '1px solid #ccc',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '20px' }}>
              <h3>Page Content</h3>
              <p>This simulates how the help button appears in a real page layout.</p>
              <p>The help button should be positioned fixed at the bottom right.</p>
            </div>
            <Story />
          </div>
        </AppProvider>
      </BrowserRouter>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Help button in its typical fixed position within a page layout.'
      }
    }
  }
}
