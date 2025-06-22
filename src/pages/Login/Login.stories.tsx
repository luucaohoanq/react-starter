import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../../contexts/app.context'
import Login from './Login'

const meta = {
  title: 'Pages/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Login page with React Hook Form validation and authentication.'
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
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default login page with empty form fields.'
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
        story: 'Login page on mobile devices with responsive layout.'
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
        story: 'Login page on tablet devices.'
      }
    }
  }
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Login page with dark background to test contrast and readability.'
      }
    }
  }
}

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Login page showing loading state during authentication.'
      }
    }
  }
}

export const WithValidationErrors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Login page displaying form validation errors.'
      }
    }
  }
}

export const WithServerError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Login page displaying server error message.'
      }
    }
  }
}

export const PasswordVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Login page with password visibility toggle activated.'
      }
    }
  }
}
