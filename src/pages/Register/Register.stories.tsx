import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../../contexts/app.context'
import Register from './Register'

const meta = {
  title: 'Pages/Register',
  component: Register,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'User registration page with React Hook Form validation and password confirmation.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppProvider>
          <Story />
        </AppProvider>
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof Register>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default registration page with empty form fields.'
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
        story: 'Registration page on mobile devices with responsive layout.'
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
        story: 'Registration page on tablet devices.'
      }
    }
  }
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Registration page with dark background to test contrast and readability.'
      }
    }
  }
}

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Registration page showing loading state during account creation.'
      }
    }
  }
}

export const WithValidationErrors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Registration page displaying form validation errors.'
      }
    }
  }
}

export const WithServerError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Registration page displaying server error message.'
      }
    }
  }
}

export const PasswordsVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Registration page with both password fields visible.'
      }
    }
  }
}

export const FormWithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Registration page with sample data filled in (for visual testing).'
      }
    }
  }
}
