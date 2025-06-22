import { useParams, Link } from 'react-router-dom'
import {
  FiArrowLeft,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiStar,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiBriefcase,
  FiAward,
  FiActivity,
  FiLoader
} from 'react-icons/fi'
import { useUser } from '../../queries/useUsers'
import './UserProfile.css'

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: user, isLoading, error, isError } = useUser(userId!)

  // Loading state
  if (isLoading) {
    return (
      <div className='user-profile-page'>
        <div className='loading-state'>
          <FiLoader className='loading-spinner' />
          <p>Loading user profile...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className='user-profile-page'>
        <div className='error-state'>
          <FiUser className='not-found-icon' />
          <h2>Error Loading Profile</h2>
          <p>Error: {error?.message}</p>
          <Link to='/users' className='back-link'>
            <FiArrowLeft />
            Back to Users
          </Link>
        </div>
      </div>
    )
  }

  // Not found state
  if (!user) {
    return (
      <div className='user-profile-page'>
        <div className='not-found'>
          <FiUser className='not-found-icon' />
          <h2>User Not Found</h2>
          <p>The user you're looking for doesn't exist.</p>
          <Link to='/users' className='back-link'>
            <FiArrowLeft className='link-icon' />
            Back to Users
          </Link>
        </div>
      </div>
    )
  }

  const getStatusClass = (status: string) => {
    return `status-badge ${status}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <FiCheckCircle className='status-icon active' />
      case 'inactive':
        return <FiCheckCircle className='status-icon inactive' />
      case 'pending':
        return <FiClock className='status-icon pending' />
      default:
        return null
    }
  }

  const completedProjects = user.projects.filter((p) => p.status === 'completed')
  const activeProjects = user.projects.filter((p) => p.status === 'active')

  return (
    <div className='user-profile-page'>
      {/* Navigation */}
      <div className='profile-nav'>
        <Link to='/users' className='back-link'>
          <FiArrowLeft className='link-icon' />
          Back to Users
        </Link>
      </div>

      {/* Profile Header */}
      <div className='profile-header'>
        <div className='profile-banner'>
          <div className='banner-content'>
            <div className='user-avatar-large'>
              <img src={user.avatar} alt={user.name} />
              <div className='status-indicator'>{getStatusIcon(user.status)}</div>
            </div>
            <div className='user-info'>
              <h1 className='user-name'>{user.name}</h1>
              <p className='user-role'>{user.role}</p>
              <div className={getStatusClass(user.status)}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </div>
              <div className='user-contact'>
                <div className='contact-item'>
                  <FiMail className='contact-icon' />
                  <a href={`mailto:${user.email}`} className='contact-link'>
                    {user.email}
                  </a>
                </div>
                <div className='contact-item'>
                  <FiMapPin className='contact-icon' />
                  <span>{user.location}</span>
                </div>
                <div className='contact-item'>
                  <FiCalendar className='contact-icon' />
                  <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className='profile-content'>
        {/* Stats Overview */}
        <div className='stats-overview'>
          <div className='stats-grid'>
            <div className='stat-card'>
              <div className='stat-icon-wrapper'>
                <FiTrendingUp className='stat-icon' />
              </div>
              <div className='stat-content'>
                <h3 className='stat-value'>{user.stats.projectsCompleted}</h3>
                <p className='stat-label'>Projects Completed</p>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon-wrapper'>
                <FiCheckCircle className='stat-icon' />
              </div>
              <div className='stat-content'>
                <h3 className='stat-value'>{user.stats.tasksCompleted}</h3>
                <p className='stat-label'>Tasks Completed</p>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon-wrapper'>
                <FiClock className='stat-icon' />
              </div>
              <div className='stat-content'>
                <h3 className='stat-value'>{user.stats.hoursWorked.toLocaleString()}</h3>
                <p className='stat-label'>Hours Worked</p>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon-wrapper'>
                <FiStar className='stat-icon' />
              </div>
              <div className='stat-content'>
                <h3 className='stat-value'>{user.stats.rating}</h3>
                <p className='stat-label'>Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className='profile-sections'>
          {/* About Section */}
          <div className='profile-section'>
            <div className='section-header'>
              <FiUser className='section-icon' />
              <h2 className='section-title'>About</h2>
            </div>
            <div className='section-content'>
              <p className='user-bio'>{user.bio}</p>
              <div className='user-details-grid'>
                <div className='detail-item'>
                  <FiBriefcase className='detail-icon' />
                  <div className='detail-content'>
                    <span className='detail-label'>Department</span>
                    <span className='detail-value'>{user.department}</span>
                  </div>
                </div>
                <div className='detail-item'>
                  <FiCalendar className='detail-icon' />
                  <div className='detail-content'>
                    <span className='detail-label'>Join Date</span>
                    <span className='detail-value'>
                      {new Date(user.joinedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className='profile-section'>
            <div className='section-header'>
              <FiAward className='section-icon' />
              <h2 className='section-title'>Skills & Expertise</h2>
            </div>
            <div className='section-content'>
              <div className='skills-grid'>
                {user.skills.map((skill) => (
                  <div key={skill} className='skill-item'>
                    <span className='skill-name'>{skill}</span>
                    <div className='skill-level'>
                      <div className='skill-progress' style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className='profile-section'>
            <div className='section-header'>
              <FiActivity className='section-icon' />
              <h2 className='section-title'>Projects</h2>
            </div>
            <div className='section-content'>
              {user.projects.length > 0 ? (
                <div className='projects-grid'>
                  {user.projects.map((project) => (
                    <div key={project.id} className='project-card'>
                      <div className='project-header'>
                        <h4 className='project-name'>{project.name}</h4>
                        <div className={`project-status ${project.status}`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                        </div>
                      </div>
                      <p className='project-description'>{project.description}</p>

                      <div className='project-progress'>
                        <div className='progress-header'>
                          <span className='progress-label'>Progress</span>
                          <span className='progress-value'>{project.progress}%</span>
                        </div>
                        <div className='progress-bar'>
                          <div className='progress-fill' style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>

                      <div className='project-meta'>
                        <div className='meta-item'>
                          <FiCalendar className='meta-icon' />
                          <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                        {project.endDate && (
                          <div className='meta-item'>
                            <FiCheckCircle className='meta-icon' />
                            <span>Completed: {new Date(project.endDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      <div className='project-technologies'>
                        <span className='tech-label'>Technologies:</span>
                        <div className='tech-list'>
                          {project.technologies.map((tech) => (
                            <span key={tech} className='tech-tag'>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className='project-team'>
                        <span className='team-label'>Team:</span>
                        <div className='team-list'>
                          {project.teamMembers.map((member) => (
                            <span key={member} className='team-member'>
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='no-projects'>
                  <FiActivity className='no-projects-icon' />
                  <p>No projects assigned yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Performance Summary */}
          <div className='profile-section'>
            <div className='section-header'>
              <FiTrendingUp className='section-icon' />
              <h2 className='section-title'>Performance Summary</h2>
            </div>
            <div className='section-content'>
              <div className='performance-grid'>
                <div className='performance-item'>
                  <div className='performance-metric'>
                    <span className='metric-value'>{completedProjects.length}</span>
                    <span className='metric-label'>Completed Projects</span>
                  </div>
                  <div className='metric-change positive'>
                    <FiTrendingUp className='change-icon' />+{Math.floor(Math.random() * 20 + 5)}% this quarter
                  </div>
                </div>
                <div className='performance-item'>
                  <div className='performance-metric'>
                    <span className='metric-value'>{activeProjects.length}</span>
                    <span className='metric-label'>Active Projects</span>
                  </div>
                  <div className='metric-change neutral'>Current workload</div>
                </div>
                <div className='performance-item'>
                  <div className='performance-metric'>
                    <span className='metric-value'>{user.stats.rating}/5.0</span>
                    <span className='metric-label'>Average Rating</span>
                  </div>
                  <div className='metric-change positive'>
                    <FiStar className='change-icon' />
                    Excellent performance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
