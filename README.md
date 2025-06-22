# React Starter Template

A comprehensive React starter template with TypeScript, authentication, role-based access control, and interactive user guidance.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite
- **Authentication System**: JWT-based auth with persistence
- **Role-Based Access Control**: Admin and User roles with different permissions
- **Component Architecture**: Extracted Header/Footer components
- **Interactive Tours**: Shepherd.js guided tours for user onboarding
- **Responsive Design**: Mobile-first responsive design
- **Code Splitting**: Lazy loading with React.lazy and Suspense
- **Mock API**: MSW (Mock Service Worker) for realistic API simulation
- **Modern Routing**: React Router v7 with nested routing
- **State Management**: React Context with React Query
- **Error Handling**: Comprehensive ErrorBoundary implementation

## 🎯 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

## 🔐 Demo Credentials

```bash
# Admin User (full access)
Email: admin@example.com
Password: admin123

# Regular User (profile access only)
Email: john@example.com
Password: password123

# Or register a new account (defaults to 'user' role)
```

## 🎮 Interactive Tours

The app includes **Shepherd.js guided tours** to help users understand the interface:

- **🎉 Welcome Tour**: Auto-starts for new users, explains main features
- **👤 Profile Tour**: Available on profile page, shows personal features
- **👑 Admin Tour**: Admin-only tour for user management features
- **✨ Features Tour**: Technical highlights and app capabilities

**Access tours via the floating Help button (blue circle) in the bottom-right corner!**

## 📚 Documentation

- **[Authentication Guide](AUTHENTICATION.md)** - Complete auth system documentation
- **[Role-Based Access](ROLE_BASED_ACCESS.md)** - Component extraction and roles
- **[Shepherd Tours](SHEPHERD_TOURS.md)** - Interactive guidance implementation
- **[Demo Guide](DEMO_GUIDE.md)** - Comprehensive demo instructions

## 🏗 Architecture

### Component Structure

```
src/
├── components/
│   ├── Header/           # Navigation component
│   ├── Footer/           # Footer component
│   ├── HelpButton/       # Floating help with tours
│   └── ProtectedRoute/   # Route protection with role support
├── pages/
│   ├── Profile/          # User profile page
│   ├── Login/            # Authentication pages
│   └── UserList/         # Admin user management
├── services/
│   └── tourService.ts    # Shepherd.js tour management
└── hooks/
    └── useTours.ts       # Auto-start tour logic
```

### Role-Based Features

**Admin Role:**

- ✅ View all users (`/users`)
- ✅ Access user details (`/users/:userId`)
- ✅ Admin navigation items
- ✅ User management capabilities

**User Role:**

- ✅ Access personal profile (`/profile`)
- ✅ View public pages (Home, About)
- ❌ Cannot access user management

### Key Technologies

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router v7 with lazy loading
- **Authentication**: JWT with localStorage persistence
- **API**: Mock Service Worker (MSW) for realistic API simulation
- **State**: React Context + React Query for data management
- **Tours**: Shepherd.js for interactive user guidance
- **Styling**: Custom CSS with responsive design
- **Icons**: React Icons (Feather icons)

## 🛠 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Project Structure

```
react-starter/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components (lazy loaded)
│   ├── layouts/       # Layout components
│   ├── contexts/      # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── services/      # Service layer (tours, etc.)
│   ├── queries/       # React Query hooks
│   ├── types/         # TypeScript type definitions
│   ├── routes/        # Route configuration
│   ├── data/          # Mock data and constants
│   └── msw/           # Mock Service Worker setup
├── public/            # Static assets
└── docs/              # Documentation files
```

## 🔧 Customization

### Adding New Tours

```typescript
// In tourService.ts
createCustomTour(): ShepherdTour {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      cancelIcon: { enabled: true }
    }
  })

  tour.addStep({
    title: 'Custom Feature',
    text: 'Learn about this feature...',
    attachTo: { element: '.target-element', on: 'bottom' },
    buttons: [{ text: 'Next', action: () => tour.next() }]
  })

  return tour
}
```

### Adding New Roles

```typescript
// Update user types
export interface User {
  // ...existing fields
  role: 'admin' | 'user' | 'manager' // Add new role
}

// Update ProtectedRoute logic
if (requireAuth && managerOnly && state.user?.role !== 'manager') {
  // Handle manager-only access
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shepherd.js** for the excellent tour library
- **React Team** for the amazing framework
- **Vite** for lightning-fast development experience
- **MSW** for seamless API mocking

---

**Ready to build something amazing? Start with `npm run dev` and click the Help button to take a tour!** 🚀
