import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../../contexts/app.context'
import Footer from './Footer'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Application footer with links and authentication-aware content.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, padding: '20px' }}>
              <p>Page content would go here...</p>
            </div>
            <Story />
          </div>
        </AppProvider>
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default footer when user is not authenticated.'
      }
    }
  }
}

export const LoggedInUser: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer when regular user is authenticated - shows additional user links.'
      }
    }
  }
}

export const LoggedInAdmin: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer when admin user is authenticated - shows all available links including admin sections.'
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
        story: 'Footer on mobile devices with responsive layout.'
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
        story: 'Footer on tablet devices.'
      }
    }
  }
}

export const StandaloneFooter: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppProvider>
          <Story />
        </AppProvider>
      </BrowserRouter>
    )
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Footer as a standalone component without page layout.'
      }
    }
  }
}
