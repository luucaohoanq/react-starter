import type { Meta, StoryObj } from '@storybook/react'
import LoadingSpinner from './LoadingSpinner'

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An animated loading spinner with a cute hamster running in a wheel.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof LoadingSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnDarkBackground: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const InContainer: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        height: '200px',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px'
      }}
    >
      <LoadingSpinner />
    </div>
  )
}

export const WithText: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <LoadingSpinner />
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Loading, please wait...</p>
    </div>
  )
}
