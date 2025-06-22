import Shepherd from 'shepherd.js'
import type { User } from '../types/auth.type'

// Shepherd CSS imports
import 'shepherd.js/dist/css/shepherd.css'

// Type definitions for Shepherd
type ShepherdTour = InstanceType<typeof Shepherd.Tour>

// Custom tour theme styles
const tourTheme = `
  .shepherd-modal-overlay-container {
    background: rgba(0, 0, 0, 0.6);
  }

  .shepherd-element {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border: 1px solid #e5e7eb;
    max-width: 400px;
  }

  .shepherd-content {
    padding: 1.5rem;
  }

  .shepherd-header {
    padding: 0 0 1rem 0;
    border-bottom: 1px solid #f3f4f6;
    margin-bottom: 1rem;
  }

  .shepherd-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }

  .shepherd-text {
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
  }

  .shepherd-footer {
    padding: 1rem 0 0 0;
    margin-top: 1rem;
    border-top: 1px solid #f3f4f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .shepherd-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .shepherd-button:hover {
    background: #2563eb;
  }

  .shepherd-button-secondary {
    background: transparent;
    color: #6b7280;
    border: 1px solid #d1d5db;
  }

  .shepherd-button-secondary:hover {
    background: #f9fafb;
    color: #374151;
  }

  .shepherd-progress {
    font-size: 0.875rem;
    color: #9ca3af;
  }

  .shepherd-arrow:before {
    background: white;
    border: 1px solid #e5e7eb;
  }
`

// Inject custom styles
const injectTourStyles = () => {
  if (!document.getElementById('shepherd-tour-styles')) {
    const style = document.createElement('style')
    style.id = 'shepherd-tour-styles'
    style.textContent = tourTheme
    document.head.appendChild(style)
  }
}

export class TourService {
  private tour: ShepherdTour | null = null

  constructor() {
    injectTourStyles()
  }

  // Create welcome tour for new users
  createWelcomeTour(user?: User): ShepherdTour {
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    })

    const isAdmin = user?.role === 'admin'

    // Welcome step
    this.tour.addStep({
      title: `Welcome ${user?.name ? user.name : 'to React Starter'}!`,
      text: `
        <p>🎉 Great to have you here! Let's take a quick tour to help you get familiar with the application.</p>
        <p>${isAdmin ? "👑 As an admin, you have special privileges we'll show you." : "👤 You're logged in as a regular user - we'll show you what you can do."}</p>
      `,
      buttons: [
        {
          text: 'Skip Tour',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Start Tour',
          action: () => this.tour?.next()
        }
      ]
    })

    // Logo and navigation
    this.tour.addStep({
      title: 'Navigation Bar',
      text: 'This is your main navigation. The logo always takes you back to the home page.',
      attachTo: {
        element: '.logo',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Main navigation items
    this.tour.addStep({
      title: 'Navigation Menu',
      text: `These are your main navigation links. ${isAdmin ? 'As an admin, you can see the Users section for managing all users.' : 'You can access your profile and explore the app.'}`,
      attachTo: {
        element: '.desktop-nav',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // User menu
    this.tour.addStep({
      title: 'Your User Menu',
      text: `This is your user menu. Click here to access your profile, see your role, and logout. ${isAdmin ? "You'll also see admin-specific options here." : ''}`,
      attachTo: {
        element: '.user-menu-button',
        on: 'bottom-start'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Role-specific content
    if (isAdmin) {
      this.tour.addStep({
        title: '👑 Admin Privileges',
        text: `
          <p>As an administrator, you have special access to:</p>
          <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
            <li>User Management (Users page)</li>
            <li>View all user profiles</li>
            <li>Admin dashboard features</li>
          </ul>
          <p>Look for the admin badge next to your name!</p>
        `,
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-button-secondary',
            action: () => this.tour?.back()
          },
          {
            text: 'Next',
            action: () => this.tour?.next()
          }
        ]
      })
    } else {
      this.tour.addStep({
        title: '👤 User Features',
        text: `
          <p>As a user, you have access to:</p>
          <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
            <li>Your personal profile</li>
            <li>All public pages (Home, About)</li>
            <li>Account management</li>
          </ul>
          <p>User management is available only to administrators.</p>
        `,
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-button-secondary',
            action: () => this.tour?.back()
          },
          {
            text: 'Next',
            action: () => this.tour?.next()
          }
        ]
      })
    }

    // Mobile responsiveness
    this.tour.addStep({
      title: '📱 Mobile Friendly',
      text: "The app is fully responsive! On mobile devices, you'll see a hamburger menu that contains all these navigation options.",
      attachTo: {
        element: '.mobile-menu-button',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Footer
    this.tour.addStep({
      title: 'Footer Information',
      text: 'The footer contains quick links and shows your current role. It adapts based on your authentication status and permissions.',
      attachTo: {
        element: '.footer',
        on: 'top'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Final step
    this.tour.addStep({
      title: "🚀 You're All Set!",
      text: `
        <p>That's the basic tour! Here are some things to try:</p>
        <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
          <li>Visit your Profile page to see your information</li>
          ${isAdmin ? '<li>Check out the Users page to see user management</li>' : ''}
          <li>Explore the responsive design on different screen sizes</li>
          <li>Try the Help button anytime for quick guidance</li>
        </ul>
        <p>Enjoy using React Starter! 🎉</p>
      `,
      buttons: [
        {
          text: 'Finish Tour',
          action: () => {
            this.tour?.complete()
            this.saveTourCompletion('welcome')
          }
        }
      ]
    })

    return this.tour
  }

  // Create profile page tour
  createProfileTour(user?: User): ShepherdTour {
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    })

    const isAdmin = user?.role === 'admin'

    this.tour.addStep({
      title: '👤 Your Profile Page',
      text: 'This is your personal profile page where you can view and manage your account information.',
      buttons: [
        {
          text: 'Skip',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Continue',
          action: () => this.tour?.next()
        }
      ]
    })

    this.tour.addStep({
      title: 'Profile Avatar',
      text: 'Your profile photo appears here. Click "Change Photo" to update it (feature coming soon!).',
      attachTo: {
        element: '.profile-avatar-section',
        on: 'right'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    this.tour.addStep({
      title: 'Personal Information',
      text: 'Here you can see your account details like name, email, role, and when you joined.',
      attachTo: {
        element: '.profile-info',
        on: 'left'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    if (isAdmin) {
      this.tour.addStep({
        title: '👑 Admin Privileges',
        text: 'As an admin, you can see your special privileges listed here. These show what additional features you have access to.',
        attachTo: {
          element: '.admin-section',
          on: 'top'
        },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-button-secondary',
            action: () => this.tour?.back()
          },
          {
            text: 'Next',
            action: () => this.tour?.next()
          }
        ]
      })
    }

    this.tour.addStep({
      title: 'Profile Actions',
      text: 'Use these buttons to edit your profile or change your password (features coming soon!).',
      attachTo: {
        element: '.profile-actions',
        on: 'top'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Finish',
          action: () => {
            this.tour?.complete()
            this.saveTourCompletion('profile')
          }
        }
      ]
    })

    return this.tour
  }

  // Create login page tour for new visitors and returning users
  createLoginTour(): ShepherdTour {
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    })

    // Welcome to Login step
    this.tour.addStep({
      title: '🔐 Welcome to React Starter',
      text: `
        <p>Welcome! Let's get you logged in and show you around the app.</p>
        <p>This guided tour will help you understand the login process and what you can do after signing in.</p>
      `,
      buttons: [
        {
          text: 'Skip Tour',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Start Tour',
          action: () => this.tour?.next()
        }
      ]
    })

    // Login form overview
    this.tour.addStep({
      title: 'Login Form',
      text: 'This is your login form. Enter your email and password to access the application.',
      attachTo: {
        element: '.login-form',
        on: 'right'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Email field
    this.tour.addStep({
      title: 'Email Address',
      text: "Enter your registered email address here. Make sure it's the same email you used when registering.",
      attachTo: {
        element: '#email',
        on: 'right'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Password field
    this.tour.addStep({
      title: 'Password',
      text: 'Enter your password here. You can click the eye icon to show/hide your password as you type.',
      attachTo: {
        element: '#password',
        on: 'right'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Password toggle
    this.tour.addStep({
      title: 'Show/Hide Password',
      text: "Click this eye icon to toggle between showing and hiding your password. This helps you verify you've typed it correctly.",
      attachTo: {
        element: '.password-toggle',
        on: 'left'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Demo credentials
    this.tour.addStep({
      title: '🚀 Try Demo Credentials',
      text: 'Want to try the app right away? Click this button to fill in demo credentials automatically. Use admin@example.com / admin123 for admin access.',
      attachTo: {
        element: '.demo-button',
        on: 'top'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Login button
    this.tour.addStep({
      title: 'Sign In',
      text: "Once you've entered your credentials, click this button to log in. The button will show a loading spinner while processing.",
      attachTo: {
        element: '.login-button',
        on: 'top'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Register link
    this.tour.addStep({
      title: 'New User?',
      text: "Don't have an account yet? Click this link to go to the registration page and create a new account.",
      attachTo: {
        element: '.register-link',
        on: 'top'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    // Final step
    this.tour.addStep({
      title: '🎉 Ready to Get Started!',
      text: `
        <p>You're all set! Here's what you can do:</p>
        <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
          <li>Use the demo credentials for a quick test</li>
          <li>Or create a new account if you're new</li>
          <li>After logging in, you'll get another tour of the main app</li>
          <li>Look for the Help button (?) for guidance anytime</li>
        </ul>
        <p>Welcome to React Starter! 🚀</p>
      `,
      buttons: [
        {
          text: 'Finish Tour',
          action: () => {
            this.tour?.complete()
            this.saveTourCompletion('login')
          }
        }
      ]
    })

    return this.tour
  }

  // Create admin users page tour
  createAdminTour(): ShepherdTour {
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    })

    this.tour.addStep({
      title: '👑 Admin User Management',
      text: 'Welcome to the admin area! Here you can view and manage all users in the system.',
      buttons: [
        {
          text: 'Skip',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Start Tour',
          action: () => this.tour?.next()
        }
      ]
    })

    this.tour.addStep({
      title: 'User List',
      text: 'This table shows all registered users with their basic information and roles.',
      attachTo: {
        element: '.users-table',
        on: 'top'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    this.tour.addStep({
      title: 'User Actions',
      text: 'Click on any user row to view their detailed profile. More management features coming soon!',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Finish',
          action: () => {
            this.tour?.complete()
            this.saveTourCompletion('admin')
          }
        }
      ]
    })

    return this.tour
  }

  // Feature highlight tour
  createFeatureTour(): ShepherdTour {
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    })

    this.tour.addStep({
      title: '✨ Key Features',
      text: "Let's explore the key features that make this React app special!",
      buttons: [
        {
          text: 'Skip',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Explore',
          action: () => this.tour?.next()
        }
      ]
    })

    this.tour.addStep({
      title: '🔐 Role-Based Access',
      text: 'The app has smart role-based access control. Different users see different menu items based on their permissions.',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    this.tour.addStep({
      title: '📱 Responsive Design',
      text: 'Try resizing your browser window! The app automatically adapts to different screen sizes with a mobile-friendly design.',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Next',
          action: () => this.tour?.next()
        }
      ]
    })

    this.tour.addStep({
      title: '⚡ Modern Tech Stack',
      text: `
        <p>This app is built with modern technologies:</p>
        <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
          <li>React 19 with TypeScript</li>
          <li>Lazy loading & code splitting</li>
          <li>Authentication with JWT</li>
          <li>React Query for data management</li>
          <li>Mock Service Worker for API</li>
        </ul>
      `,
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Awesome!',
          action: () => {
            this.tour?.complete()
            this.saveTourCompletion('features')
          }
        }
      ]
    })

    return this.tour
  }

  // Start tour based on type
  startTour(type: 'welcome' | 'profile' | 'admin' | 'features' | 'login', user?: User) {
    // Check if user has already seen this tour
    if (this.hasTourBeenCompleted(type)) {
      const shouldShowAgain = confirm(`You've already seen the ${type} tour. Would you like to see it again?`)
      if (!shouldShowAgain) return
    }

    switch (type) {
      case 'welcome':
        this.createWelcomeTour(user).start()
        break
      case 'profile':
        this.createProfileTour(user).start()
        break
      case 'admin':
        this.createAdminTour().start()
        break
      case 'features':
        this.createFeatureTour().start()
        break
      case 'login':
        this.createLoginTour().start()
        break
    }
  }

  // Tour completion tracking
  private saveTourCompletion(tourType: string) {
    const completedTours = this.getCompletedTours()
    completedTours.push(tourType)
    localStorage.setItem('shepherd_completed_tours', JSON.stringify(completedTours))
  }

  private getCompletedTours(): string[] {
    const completed = localStorage.getItem('shepherd_completed_tours')
    return completed ? JSON.parse(completed) : []
  }

  private hasTourBeenCompleted(tourType: string): boolean {
    return this.getCompletedTours().includes(tourType)
  }

  // Cancel current tour
  cancelTour() {
    if (this.tour) {
      this.tour.cancel()
    }
  }

  // Complete current tour
  completeTour() {
    if (this.tour) {
      this.tour.complete()
    }
  }

  // Check if user is new (for auto-starting welcome tour)
  isNewUser(): boolean {
    return this.getCompletedTours().length === 0
  }
}

// Create singleton instance
export const tourService = new TourService()
