import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component with multiple variants and states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The visual style of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button should take full width of its container'
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked'
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic Stories
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}

// Size Variations
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small'
  }
}

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'medium'
  }
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large'
  }
}

// States
export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
}

// Interactive Examples
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span style={{ marginRight: '8px' }}>📧</span>
        Send Email
      </>
    ),
    variant: 'primary'
  }
}

export const LongText: Story = {
  args: {
    children: 'This is a button with very long text to test how it handles wrapping',
    variant: 'primary'
  },
  parameters: {
    layout: 'padded'
  }
}

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all button variants side by side.'
      }
    }
  }
}

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size='small'>Small</Button>
      <Button size='medium'>Medium</Button>
      <Button size='large'>Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all button sizes side by side.'
      }
    }
  }
}
