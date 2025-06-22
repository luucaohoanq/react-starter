# Testing and Storybook Setup

This document outlines the comprehensive testing and Storybook setup for the React Starter project.

## 🏗️ Setup Overview

### Storybook Configuration

- **Version**: 9.0.12
- **Framework**: React + Vite
- **Port**: 6006 (http://localhost:6006)

### Testing Framework

- **Test Runner**: Vitest
- **Testing Library**: React Testing Library
- **Environment**: jsdom

## 📁 Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx    ✅
│   │   └── Button.test.tsx       ✅
│   ├── Input/
│   │   ├── Input.tsx             ✅ (implemented)
│   │   ├── Input.stories.tsx     ✅
│   │   └── Input.test.tsx        ✅
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.tsx
│   │   ├── LoadingSpinner.stories.tsx ✅
│   │   └── LoadingSpinner.test.tsx    ✅
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.stories.tsx    ✅
│   │   └── Header.test.tsx       ✅
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   ├── Footer.stories.tsx    ✅
│   │   └── Footer.test.tsx       ✅
│   ├── HelpButton/
│   │   ├── HelpButton.tsx
│   │   ├── HelpButton.stories.tsx ✅
│   │   └── HelpButton.test.tsx    ✅
│   └── ProtectedRoute/
│       ├── ProtectedRoute.tsx
│       ├── ProtectedRoute.stories.tsx ✅
│       └── ProtectedRoute.test.tsx    ✅
├── pages/
│   ├── Login/
│   │   ├── Login.tsx             ✅ (React Hook Form)
│   │   ├── Login.stories.tsx     ✅
│   │   └── Login.test.tsx        ✅
│   └── Register/
│       ├── Register.tsx          ✅ (React Hook Form)
│       ├── Register.stories.tsx  ✅
│       └── Register.test.tsx     ✅
```

## 🚀 Available Scripts

```bash
# Development
pnpm dev                 # Start development server
pnpm storybook          # Start Storybook (http://localhost:6006)

# Testing
pnpm test               # Run tests in watch mode
pnpm test:run          # Run tests once
pnpm test:ui           # Run tests with UI
pnpm test:coverage     # Run tests with coverage report

# Building
pnpm build             # Build for production
pnpm build-storybook   # Build Storybook for deployment
```

## 📚 Storybook Features

### Addons Installed

- `@storybook/addon-docs` - Auto-generated documentation
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-vitest` - Vitest integration
- `@storybook/addon-controls` - Interactive controls
- `@storybook/addon-actions` - Action logging
- `@storybook/addon-viewport` - Responsive testing
- `@storybook/addon-backgrounds` - Background themes

### Story Categories

- **Components/** - Reusable UI components
- **Pages/** - Full page components
- **Forms/** - Form-specific stories

### Story Types

- Default states
- Interactive examples
- Error states
- Loading states
- Mobile/tablet views
- Dark mode variants

## 🧪 Testing Strategy

### Component Tests

- **Rendering**: Components render without crashing
- **Props**: Correct props handling
- **User Interaction**: Click, type, focus events
- **Accessibility**: ARIA attributes, keyboard navigation
- **State Management**: Component state changes
- **Error Handling**: Error states and validation

### Test Categories

1. **Unit Tests**: Individual component functionality
2. **Integration Tests**: Component interaction with context/routing
3. **Accessibility Tests**: Screen reader compatibility
4. **Visual Regression**: Via Storybook (optional with Chromatic)

## 🛠️ Development Workflow

### Adding a New Component

1. **Create the component**:

   ```bash
   mkdir src/components/NewComponent
   touch src/components/NewComponent/{NewComponent.tsx,index.ts}
   ```

2. **Add Storybook stories**:

   ```bash
   touch src/components/NewComponent/NewComponent.stories.tsx
   ```

3. **Add tests**:

   ```bash
   touch src/components/NewComponent/NewComponent.test.tsx
   ```

4. **Export from index**:
   ```typescript
   // src/components/NewComponent/index.ts
   export { default } from './NewComponent'
   ```

### Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import NewComponent from './NewComponent'

const meta = {
  title: 'Components/NewComponent',
  component: NewComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of the component.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof NewComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // default props
  }
}
```

### Test Template

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewComponent from './NewComponent'

describe('NewComponent', () => {
  it('renders without crashing', () => {
    render(<NewComponent />)
    const component = screen.getByRole('...')
    expect(component).toBeInTheDocument()
  })
})
```

## 🎨 Form Implementation

### React Hook Form Integration

- **Validation**: Yup schema validation
- **Error Handling**: Field-level and server-level errors
- **UX Features**: Password visibility toggle, loading states
- **Accessibility**: Proper ARIA labels and error associations

### Login Form Features

- Email validation
- Password requirements
- Loading states
- Server error display
- Remember me functionality

### Register Form Features

- Name validation
- Email validation
- Password strength requirements
- Password confirmation
- Terms acceptance
- Progressive enhancement

## 📱 Responsive Testing

### Viewports Configured

- Mobile: 375px
- Mobile Large: 414px
- Tablet: 768px
- Desktop: 1024px
- Large Desktop: 1440px

### Testing Approach

- Stories for each major viewport
- CSS-in-JS responsive utilities
- Touch-friendly interactive elements
- Accessible mobile navigation

## 🎯 Best Practices

### Story Writing

- Use semantic HTML
- Include accessibility descriptions
- Test different states (loading, error, success)
- Show realistic data examples
- Document component props and usage

### Test Writing

- Test behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Test user interactions
- Include accessibility tests
- Mock external dependencies

### Component Development

- Follow accessibility guidelines
- Use semantic HTML elements
- Implement keyboard navigation
- Provide meaningful error messages
- Support both light and dark themes

## 🚨 Known Issues & Solutions

### Common Problems

1. **Storybook addon loading**: Run `pnpm install` if addons fail to load
2. **Test isolation**: Use proper cleanup between tests
3. **Context mocking**: Mock React context providers in tests
4. **Router testing**: Wrap components with BrowserRouter in tests

### Debugging Tips

- Use Storybook's action logger for event debugging
- Leverage React DevTools in Storybook
- Use screen.debug() in tests to see DOM output
- Check browser console for accessibility warnings

## 📈 Performance Considerations

- Lazy load heavy components in stories
- Use MSW for API mocking in development
- Optimize bundle size with tree shaking
- Use code splitting for large story sets

## 🔧 Configuration Files

### Key Files

- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.ts` - Global decorators and parameters
- `vitest.config.ts` - Test configuration
- `src/setupTests.ts` - Test environment setup

This setup provides a comprehensive foundation for component development, testing, and documentation using modern React best practices.
