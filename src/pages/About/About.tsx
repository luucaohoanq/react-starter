import {
  FiCode,
  FiUsers,
  FiAward,
  FiTarget,
  FiHeart,
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiStar,
  FiMapPin,
  FiMail,
  FiPhone
} from 'react-icons/fi'
import { companyInfo } from '../../data/dummyData'
import './About.css'

const About = () => {
  const features = [
    {
      icon: FiCode,
      title: 'Modern Technology Stack',
      description:
        'Built with React, TypeScript, and the latest web technologies for optimal performance and developer experience.',
      color: '#3b82f6'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description:
        'Comprehensive user management system with role-based access control and team collaboration features.',
      color: '#10b981'
    },
    {
      icon: FiAward,
      title: 'Best Practices',
      description: 'Follows industry best practices for code organization, testing, and deployment strategies.',
      color: '#f59e0b'
    },
    {
      icon: FiShield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security features with comprehensive error handling and data validation.',
      color: '#8b5cf6'
    }
  ]

  const stats = [
    { value: '150+', label: 'Team Members', icon: FiUsers },
    { value: '500+', label: 'Projects Completed', icon: FiTarget },
    { value: '99.9%', label: 'Uptime', icon: FiTrendingUp },
    { value: '50+', label: 'Countries Served', icon: FiGlobe }
  ]

  const values = [
    {
      icon: FiCode,
      title: 'Innovation',
      description: companyInfo.values[0],
      color: '#3b82f6'
    },
    {
      icon: FiAward,
      title: 'Quality',
      description: companyInfo.values[1],
      color: '#10b981'
    },
    {
      icon: FiUsers,
      title: 'Collaboration',
      description: companyInfo.values[2],
      color: '#f59e0b'
    },
    {
      icon: FiShield,
      title: 'Integrity',
      description: companyInfo.values[3],
      color: '#8b5cf6'
    }
  ]

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Visionary leader with 15+ years in tech industry'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Technical expert specializing in scalable architectures'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Creative director with passion for user experience'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Full-stack engineer with expertise in modern frameworks'
    }
  ]

  return (
    <div className='about-page'>
      {/* Hero Section */}
      <section className='about-hero'>
        <div className='hero-content'>
          <h1 className='hero-title'>About {companyInfo.name}</h1>
          <p className='hero-description'>{companyInfo.description}</p>
          <div className='hero-stats'>
            <div className='hero-stat'>
              <span className='stat-value'>Founded {companyInfo.founded}</span>
              <span className='stat-label'>Years of Excellence</span>
            </div>
            <div className='hero-stat'>
              <span className='stat-value'>{companyInfo.employees}</span>
              <span className='stat-label'>Team Members</span>
            </div>
            <div className='hero-stat'>
              <span className='stat-value'>{companyInfo.locations.length}</span>
              <span className='stat-label'>Global Offices</span>
            </div>
          </div>
        </div>
        <div className='hero-visual'>
          <div className='floating-card'>
            <div className='card-header'>
              <div className='card-dots'>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className='card-title'>React Starter</span>
            </div>
            <div className='card-content'>
              <div className='feature-list'>
                <div className='feature-item'>
                  <FiCode className='feature-icon' />
                  <span>Modern Stack</span>
                </div>
                <div className='feature-item'>
                  <FiUsers className='feature-icon' />
                  <span>Team Management</span>
                </div>
                <div className='feature-item'>
                  <FiShield className='feature-icon' />
                  <span>Secure & Reliable</span>
                </div>
                <div className='feature-item'>
                  <FiAward className='feature-icon' />
                  <span>Best Practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='mission-section'>
        <div className='section-header'>
          <h2 className='section-title'>Our Mission</h2>
          <p className='section-subtitle'>Driving innovation through technology</p>
        </div>
        <div className='mission-content'>
          <div className='mission-text'>
            <FiTarget className='mission-icon' />
            <p className='mission-statement'>{companyInfo.mission}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='features-section'>
        <div className='section-header'>
          <h2 className='section-title'>Why Choose React Starter?</h2>
          <p className='section-subtitle'>Everything you need to build modern applications</p>
        </div>
        <div className='features-grid'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className='feature-card'>
                <div className='feature-icon-wrapper' style={{ backgroundColor: `${feature.color}15` }}>
                  <Icon className='feature-icon' style={{ color: feature.color }} />
                </div>
                <h3 className='feature-title'>{feature.title}</h3>
                <p className='feature-description'>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className='stats-section'>
        <div className='stats-container'>
          <h2 className='stats-title'>Trusted by Teams Worldwide</h2>
          <div className='stats-grid'>
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className='stat-item'>
                  <Icon className='stat-icon' />
                  <div className='stat-content'>
                    <span className='stat-value'>{stat.value}</span>
                    <span className='stat-label'>{stat.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='values-section'>
        <div className='section-header'>
          <h2 className='section-title'>Our Values</h2>
          <p className='section-subtitle'>The principles that guide everything we do</p>
        </div>
        <div className='values-grid'>
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className='value-card'>
                <div className='value-icon-wrapper' style={{ backgroundColor: `${value.color}15` }}>
                  <Icon className='value-icon' style={{ color: value.color }} />
                </div>
                <h3 className='value-title'>{value.title}</h3>
                <p className='value-description'>{value.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className='services-section'>
        <div className='section-header'>
          <h2 className='section-title'>Our Services</h2>
          <p className='section-subtitle'>Comprehensive solutions for modern businesses</p>
        </div>
        <div className='services-grid'>
          {companyInfo.services.map((service, index) => (
            <div key={index} className='service-item'>
              <FiStar className='service-icon' />
              <span className='service-name'>{service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies Section */}
      <section className='technologies-section'>
        <div className='section-header'>
          <h2 className='section-title'>Technologies We Use</h2>
          <p className='section-subtitle'>Cutting-edge tools and frameworks</p>
        </div>
        <div className='technologies-grid'>
          {companyInfo.technologies.map((tech, index) => (
            <div key={index} className='tech-item'>
              <span className='tech-name'>{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className='team-section'>
        <div className='section-header'>
          <h2 className='section-title'>Meet Our Leadership</h2>
          <p className='section-subtitle'>The visionaries behind our success</p>
        </div>
        <div className='team-grid'>
          {teamMembers.map((member, index) => (
            <div key={index} className='team-card'>
              <div className='team-avatar'>
                <img src={member.avatar} alt={member.name} />
              </div>
              <div className='team-info'>
                <h3 className='team-name'>{member.name}</h3>
                <p className='team-role'>{member.role}</p>
                <p className='team-bio'>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Locations Section */}
      <section className='locations-section'>
        <div className='section-header'>
          <h2 className='section-title'>Global Presence</h2>
          <p className='section-subtitle'>Offices around the world</p>
        </div>
        <div className='locations-grid'>
          {companyInfo.locations.map((location, index) => (
            <div key={index} className='location-item'>
              <FiMapPin className='location-icon' />
              <span className='location-name'>{location}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className='contact-section'>
        <div className='contact-content'>
          <h2 className='contact-title'>Ready to Get Started?</h2>
          <p className='contact-description'>Let's discuss how React Starter can accelerate your next project.</p>
          <div className='contact-actions'>
            <div className='contact-info'>
              <div className='contact-item'>
                <FiMail className='contact-icon' />
                <span>hello@techcorp.com</span>
              </div>
              <div className='contact-item'>
                <FiPhone className='contact-icon' />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <button className='contact-button'>
              <FiHeart className='button-icon' />
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
