import type { Meta, StoryObj } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import Input from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with various types, states, and validation support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The type of input field'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the input'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether the input has an error state'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the input should take full width of its container'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input'
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input'
    }
  }
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Basic Stories
export const Default: Story = {
  args: {
    placeholder: 'Enter text...'
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email'
  }
}

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true
  }
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    error: true,
    errorMessage: 'Password must be at least 8 characters'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    disabled: true,
    value: 'Cannot edit this'
  }
}

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This takes full width',
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
}

// Size Variants
export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'small'
  }
}

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size (default)',
    size: 'medium'
  }
}

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'large'
  }
}

// Interactive Examples
export const Controlled: Story = {
  render: () => {
    const ControlledInput = () => {
      const [value, setValue] = useState('')

      return (
        <Input
          label='Controlled Input'
          placeholder='Type something...'
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
      )
    }

    return <ControlledInput />
  }
}

export const WithValidation: Story = {
  render: () => {
    const ValidationInput = () => {
      const [email, setEmail] = useState('')
      const [error, setError] = useState(false)

      const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
      }

      return (
        <Input
          type='email'
          label='Email with Validation'
          placeholder='Enter your email'
          value={email}
          error={error}
          errorMessage={error ? 'Please enter a valid email address' : undefined}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setEmail(value)
            setError(value.length > 0 && !validateEmail(value))
          }}
        />
      )
    }

    return <ValidationInput />
  }
}

// Form Example
export const FormExample: Story = {
  render: () => (
    <div className='space-y-4 p-4 max-w-md'>
      <Input label='First Name' placeholder='Enter first name' required />
      <Input label='Last Name' placeholder='Enter last name' required />
      <Input type='email' label='Email' placeholder='Enter email address' required />
      <Input type='tel' label='Phone Number' placeholder='Enter phone number' />
      <Input label='Company (Optional)' placeholder='Enter company name' />
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
}

// All Sizes Comparison
export const SizeComparison: Story = {
  render: () => (
    <div className='space-y-4'>
      <Input size='small' label='Small Input' placeholder='Small size' />
      <Input size='medium' label='Medium Input' placeholder='Medium size' />
      <Input size='large' label='Large Input' placeholder='Large size' />
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
}
