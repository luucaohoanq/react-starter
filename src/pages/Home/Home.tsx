import { Link } from 'react-router-dom'
import {
  FiUsers,
  FiTrendingUp,
  FiActivity,
  FiDollarSign,
  FiArrowRight,
  FiStar,
  FiClock,
  FiMessageCircle
} from 'react-icons/fi'
import { dashboardStats, dummyBlogPosts } from '../../data/dummyData'
import ErrorTestComponent from '../../components/ErrorTestComponent'
import './Home.css'

export default function Home() {
  const featuredPosts = dummyBlogPosts.filter((post) => post.featured).slice(0, 2)
  const recentPosts = dummyBlogPosts.slice(0, 3)

  const stats = [
    {
      title: 'Total Users',
      value: dashboardStats.totalUsers.toLocaleString(),
      icon: FiUsers,
      color: '#3b82f6',
      bgColor: '#eff6ff'
    },
    {
      title: 'Active Projects',
      value: dashboardStats.activeProjects.toString(),
      icon: FiActivity,
      color: '#10b981',
      bgColor: '#ecfdf5'
    },
    {
      title: 'Tasks Completed',
      value: dashboardStats.completedTasks.toLocaleString(),
      icon: FiTrendingUp,
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      title: 'Revenue',
      value: dashboardStats.revenue,
      icon: FiDollarSign,
      color: '#8b5cf6',
      bgColor: '#f3e8ff'
    }
  ]

  return (
    <div className='home-page'>
      {/* Error Test Component */}
      {process.env.NODE_ENV === 'development' && <ErrorTestComponent />}

      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-content'>
          <h1 className='hero-title'>
            Welcome to <span className='hero-highlight'>React Starter</span>
          </h1>
          <p className='hero-description'>
            A comprehensive React starter template with TypeScript, modern tooling, and best practices. Build amazing
            applications faster with our well-structured foundation.
          </p>
          <div className='hero-actions'>
            <Link to='/users' className='hero-button primary'>
              Explore Users
              <FiArrowRight className='button-icon' />
            </Link>
            <Link to='/about' className='hero-button secondary'>
              Learn More
            </Link>
          </div>
        </div>
        <div className='hero-visual'>
          <div className='hero-card'>
            <div className='hero-card-header'>
              <div className='hero-card-dots'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className='hero-card-content'>
              <div className='code-line'>
                <span className='code-keyword'>import</span>
                <span className='code-text'> React </span>
                <span className='code-keyword'>from</span>
                <span className='code-string'> 'react'</span>
              </div>
              <div className='code-line'>
                <span className='code-keyword'>function</span>
                <span className='code-function'> App</span>
                <span className='code-text'>{'() {'}</span>
              </div>
              <div className='code-line indent'>
                <span className='code-keyword'>return</span>
                <span className='code-text'> (</span>
              </div>
              <div className='code-line indent-2'>
                <span className='code-tag'>&lt;div&gt;</span>
                <span className='code-string'>Hello World!</span>
                <span className='code-tag'>&lt;/div&gt;</span>
              </div>
              <div className='code-line indent'>
                <span className='code-text'>{')'}</span>
              </div>
              <div className='code-line'>
                <span className='code-text'>{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='stats-section'>
        <h2 className='section-title'>Dashboard Overview</h2>
        <div className='stats-grid'>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className='stat-card'>
                <div className='stat-icon' style={{ backgroundColor: stat.bgColor }}>
                  <Icon style={{ color: stat.color }} />
                </div>
                <div className='stat-content'>
                  <p className='stat-title'>{stat.title}</p>
                  <p className='stat-value'>{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className='featured-section'>
        <div className='section-header'>
          <h2 className='section-title'>Featured Articles</h2>
          <p className='section-description'>Latest insights and best practices from our team</p>
        </div>
        <div className='featured-grid'>
          {featuredPosts.map((post) => (
            <article key={post.id} className='featured-card'>
              <div className='featured-badge'>
                <FiStar className='badge-icon' />
                Featured
              </div>
              <h3 className='featured-title'>{post.title}</h3>
              <p className='featured-excerpt'>{post.excerpt}</p>
              <div className='featured-meta'>
                <div className='meta-item'>
                  <FiClock className='meta-icon' />
                  {post.readTime} min read
                </div>
                <div className='meta-item'>
                  <FiMessageCircle className='meta-icon' />
                  {post.comments} comments
                </div>
              </div>
              <div className='featured-footer'>
                <span className='featured-author'>By {post.author}</span>
                <button className='featured-button'>
                  Read More
                  <FiArrowRight className='button-icon' />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className='recent-section'>
        <div className='section-header'>
          <h2 className='section-title'>Recent Articles</h2>
          <Link to='/blog' className='section-link'>
            View all articles
            <FiArrowRight className='link-icon' />
          </Link>
        </div>
        <div className='recent-grid'>
          {recentPosts.map((post) => (
            <article key={post.id} className='recent-card'>
              <div className='recent-header'>
                <h4 className='recent-title'>{post.title}</h4>
                <div className='recent-tags'>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className='tag'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className='recent-excerpt'>{post.excerpt}</p>
              <div className='recent-footer'>
                <div className='recent-meta'>
                  <span className='recent-author'>{post.author}</span>
                  <span className='recent-date'>{new Date(post.publishedDate).toLocaleDateString()}</span>
                </div>
                <div className='recent-stats'>
                  <span className='stat-item'>
                    <FiClock className='stat-icon' />
                    {post.readTime}m
                  </span>
                  <span className='stat-item'>❤️ {post.likes}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='cta-section'>
        <div className='cta-content'>
          <h2 className='cta-title'>Ready to get started?</h2>
          <p className='cta-description'>
            Explore our user management system and see how easy it is to build modern applications.
          </p>
          <div className='cta-actions'>
            <Link to='/users' className='cta-button primary'>
              View Users
            </Link>
            <Link to='/about' className='cta-button secondary'>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
