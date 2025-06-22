// Dummy data for the React starter template

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joinedDate: string
  department: string
  location: string
  bio: string
  skills: string[]
  projects: Project[]
  stats: UserStats
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold'
  progress: number
  startDate: string
  endDate?: string
  technologies: string[]
  teamMembers: string[]
}

export interface UserStats {
  projectsCompleted: number
  tasksCompleted: number
  hoursWorked: number
  rating: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedDate: string
  tags: string[]
  readTime: number
  likes: number
  comments: number
  featured: boolean
}

export interface DashboardStats {
  totalUsers: number
  activeProjects: number
  completedTasks: number
  revenue: string
  growthRate: number
}

// Dummy Users Data
export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'Senior Frontend Developer',
    status: 'active',
    joinedDate: '2023-01-15',
    department: 'Engineering',
    location: 'San Francisco, CA',
    bio: 'Passionate frontend developer with 5+ years of experience in React, TypeScript, and modern web technologies.',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    projects: [
      {
        id: 'p1',
        name: 'E-commerce Platform',
        description: 'Modern e-commerce platform with React and Node.js',
        status: 'active',
        progress: 75,
        startDate: '2024-01-01',
        technologies: ['React', 'Node.js', 'MongoDB'],
        teamMembers: ['Alice Johnson', 'Bob Smith']
      }
    ],
    stats: {
      projectsCompleted: 12,
      tasksCompleted: 156,
      hoursWorked: 2340,
      rating: 4.8
    }
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Full Stack Developer',
    status: 'active',
    joinedDate: '2022-11-20',
    department: 'Engineering',
    location: 'New York, NY',
    bio: 'Full-stack developer specializing in modern web applications and cloud infrastructure.',
    skills: ['React', 'Python', 'Docker', 'Kubernetes', 'PostgreSQL'],
    projects: [
      {
        id: 'p2',
        name: 'Analytics Dashboard',
        description: 'Real-time analytics dashboard for business intelligence',
        status: 'completed',
        progress: 100,
        startDate: '2023-09-01',
        endDate: '2024-02-15',
        technologies: ['React', 'Python', 'PostgreSQL'],
        teamMembers: ['Bob Smith', 'Carol Davis']
      }
    ],
    stats: {
      projectsCompleted: 18,
      tasksCompleted: 234,
      hoursWorked: 3120,
      rating: 4.9
    }
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'UI/UX Designer',
    status: 'active',
    joinedDate: '2023-03-10',
    department: 'Design',
    location: 'Los Angeles, CA',
    bio: 'Creative UI/UX designer with a passion for creating intuitive and beautiful user experiences.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    projects: [
      {
        id: 'p3',
        name: 'Mobile App Redesign',
        description: 'Complete redesign of mobile application interface',
        status: 'active',
        progress: 60,
        startDate: '2024-02-01',
        technologies: ['Figma', 'Prototyping'],
        teamMembers: ['Carol Davis', 'David Wilson']
      }
    ],
    stats: {
      projectsCompleted: 8,
      tasksCompleted: 89,
      hoursWorked: 1560,
      rating: 4.7
    }
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'DevOps Engineer',
    status: 'pending',
    joinedDate: '2024-01-05',
    department: 'Engineering',
    location: 'Seattle, WA',
    bio: 'DevOps engineer focused on automation, CI/CD, and cloud infrastructure optimization.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
    projects: [
      {
        id: 'p4',
        name: 'Infrastructure Migration',
        description: 'Migration from on-premise to cloud infrastructure',
        status: 'on-hold',
        progress: 30,
        startDate: '2024-03-01',
        technologies: ['AWS', 'Terraform', 'Docker'],
        teamMembers: ['David Wilson', 'Alice Johnson']
      }
    ],
    stats: {
      projectsCompleted: 5,
      tasksCompleted: 67,
      hoursWorked: 890,
      rating: 4.5
    }
  },
  {
    id: '5',
    name: 'Eva Martinez',
    email: 'eva.martinez@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    role: 'Product Manager',
    status: 'active',
    joinedDate: '2022-08-15',
    department: 'Product',
    location: 'Austin, TX',
    bio: 'Experienced product manager with a track record of delivering successful digital products.',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research', 'Roadmapping'],
    projects: [
      {
        id: 'p5',
        name: 'Product Roadmap 2024',
        description: 'Strategic planning and roadmap for 2024 product initiatives',
        status: 'active',
        progress: 85,
        startDate: '2023-11-01',
        technologies: ['Jira', 'Confluence', 'Analytics'],
        teamMembers: ['Eva Martinez', 'Alice Johnson', 'Bob Smith']
      }
    ],
    stats: {
      projectsCompleted: 15,
      tasksCompleted: 198,
      hoursWorked: 2680,
      rating: 4.9
    }
  },
  {
    id: '6',
    name: 'Frank Thompson',
    email: 'frank.thompson@example.com',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    role: 'Backend Developer',
    status: 'inactive',
    joinedDate: '2021-05-20',
    department: 'Engineering',
    location: 'Chicago, IL',
    bio: 'Senior backend developer with expertise in microservices architecture and database optimization.',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Microservices'],
    projects: [],
    stats: {
      projectsCompleted: 22,
      tasksCompleted: 289,
      hoursWorked: 4120,
      rating: 4.6
    }
  }
]

// Dummy Blog Posts
export const dummyBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern React Applications with TypeScript',
    excerpt:
      'Learn how to set up and structure a modern React application using TypeScript, best practices, and essential tools.',
    content: `# Building Modern React Applications with TypeScript

TypeScript has become an essential tool for React developers who want to build scalable and maintainable applications. In this comprehensive guide, we'll explore how to set up a modern React application with TypeScript and implement best practices.

## Why TypeScript with React?

TypeScript provides several advantages when building React applications:
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocompletion and refactoring
- **Improved Developer Experience**: Better documentation through types
- **Easier Maintenance**: Self-documenting code

## Setting Up Your Project

First, let's create a new React project with TypeScript:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

Or with Vite for faster development:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Best Practices

1. **Use Interfaces for Component Props**
2. **Leverage Union Types for State Management**
3. **Implement Proper Error Boundaries**
4. **Use Generic Components When Appropriate**

This is just the beginning of building robust React applications with TypeScript!`,
    author: 'Alice Johnson',
    publishedDate: '2024-03-15',
    tags: ['React', 'TypeScript', 'Frontend', 'Development'],
    readTime: 8,
    likes: 142,
    comments: 28,
    featured: true
  },
  {
    id: '2',
    title: 'State Management in React: A Complete Guide',
    excerpt:
      'Explore different state management solutions for React applications, from useState to Redux Toolkit and Zustand.',
    content: `# State Management in React: A Complete Guide

State management is one of the most important aspects of React development. As your application grows, managing state becomes more complex and requires careful consideration.

## Built-in State Management

React provides several built-in hooks for state management:
- **useState**: For local component state
- **useReducer**: For complex state logic
- **useContext**: For sharing state across components

## External Libraries

For larger applications, you might need external state management libraries:
- **Redux Toolkit**: The modern way to use Redux
- **Zustand**: Simple and lightweight
- **Jotai**: Atomic approach to state management

## Choosing the Right Solution

The choice depends on your application's complexity and requirements.`,
    author: 'Bob Smith',
    publishedDate: '2024-03-10',
    tags: ['React', 'State Management', 'Redux', 'Zustand'],
    readTime: 12,
    likes: 89,
    comments: 15,
    featured: false
  },
  {
    id: '3',
    title: 'Designing User-Centric Interfaces',
    excerpt: 'Principles and practices for creating intuitive and accessible user interfaces that users love.',
    content: `# Designing User-Centric Interfaces

Great design is not just about making things look beautiful—it's about creating experiences that are intuitive, accessible, and delightful for users.

## Core Principles

1. **User-First Approach**: Always consider the user's needs and goals
2. **Accessibility**: Design for everyone, including users with disabilities
3. **Consistency**: Maintain consistent patterns throughout the application
4. **Feedback**: Provide clear feedback for user actions

## Design Process

Our design process follows these key steps:
- Research and understand user needs
- Create user personas and journey maps
- Wireframe and prototype solutions
- Test with real users
- Iterate based on feedback

## Tools and Techniques

We use modern design tools and methodologies to create exceptional user experiences.`,
    author: 'Carol Davis',
    publishedDate: '2024-03-08',
    tags: ['Design', 'UX', 'UI', 'Accessibility'],
    readTime: 6,
    likes: 156,
    comments: 32,
    featured: true
  },
  {
    id: '4',
    title: 'DevOps Best Practices for React Applications',
    excerpt: 'Learn how to set up efficient CI/CD pipelines and deployment strategies for React applications.',
    content: `# DevOps Best Practices for React Applications

Implementing proper DevOps practices is crucial for maintaining and scaling React applications in production.

## CI/CD Pipeline

A good CI/CD pipeline should include:
- Automated testing
- Code quality checks
- Security scanning
- Automated deployment

## Deployment Strategies

Choose the right deployment strategy for your needs:
- **Blue-Green Deployment**: Zero-downtime deployments
- **Rolling Deployment**: Gradual rollout
- **Canary Deployment**: Test with a subset of users

## Monitoring and Observability

Implement proper monitoring to track application performance and user experience.`,
    author: 'David Wilson',
    publishedDate: '2024-03-05',
    tags: ['DevOps', 'CI/CD', 'Deployment', 'Monitoring'],
    readTime: 10,
    likes: 73,
    comments: 12,
    featured: false
  }
]

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalUsers: 1247,
  activeProjects: 23,
  completedTasks: 1892,
  revenue: '$125,430',
  growthRate: 12.5
}

// Company Information
export const companyInfo = {
  name: 'TechCorp Solutions',
  description: 'We are a leading technology company specializing in modern web applications and digital solutions.',
  founded: '2018',
  employees: '150+',
  locations: ['San Francisco', 'New York', 'London', 'Tokyo'],
  mission: 'To empower businesses with cutting-edge technology solutions that drive growth and innovation.',
  values: [
    "Innovation: We constantly push the boundaries of what's possible",
    'Quality: We deliver excellence in everything we do',
    'Collaboration: We believe in the power of teamwork',
    'Integrity: We operate with honesty and transparency'
  ],
  services: [
    'Web Application Development',
    'Mobile App Development',
    'Cloud Infrastructure',
    'UI/UX Design',
    'DevOps & Automation',
    'Consulting Services'
  ],
  technologies: [
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'AWS',
    'Docker',
    'Kubernetes',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'GraphQL'
  ]
}
