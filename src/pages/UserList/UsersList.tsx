import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FiSearch,
  FiFilter,
  FiUser,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiStar,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiLoader
} from 'react-icons/fi'
import { type User } from '../../data/dummyData'
import { useUsers } from '../../queries/useUsers'
import './UsersList.css'

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')

  // Fetch users with React Query
  const { data: users = [], isLoading, error, isError } = useUsers()

  // Get unique departments for filter
  const departments = useMemo(() => {
    const depts = Array.from(new Set(users.map((user: User) => user.department)))
    return depts.sort()
  }, [users])

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    const filtered = users.filter((user: User) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter

      return matchesSearch && matchesStatus && matchesDepartment
    })

    // Sort users
    filtered.sort((a: User, b: User) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'role':
          return a.role.localeCompare(b.role)
        case 'department':
          return a.department.localeCompare(b.department)
        case 'joinedDate':
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
        case 'rating':
          return b.stats.rating - a.stats.rating
        default:
          return 0
      }
    })

    return filtered
  }, [users, searchTerm, statusFilter, departmentFilter, sortBy])

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <FiCheckCircle className='status-icon active' />
      case 'inactive':
        return <FiXCircle className='status-icon inactive' />
      case 'pending':
        return <FiAlertCircle className='status-icon pending' />
      default:
        return null
    }
  }

  const getStatusClass = (status: User['status']) => {
    return `status-badge ${status}`
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className='users-list-page'>
        <div className='loading-state'>
          <FiLoader className='loading-spinner' />
          <p>Loading team members...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (isError) {
    return (
      <div className='users-list-page'>
        <div className='error-state'>
          <p>Error loading team members: {error?.message}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className='users-list-page'>
      {/* Header */}
      <div className='page-header'>
        <div className='header-content'>
          <h1 className='page-title'>Team Members</h1>
          <p className='page-description'>Manage and view all team members, their roles, and current projects.</p>
        </div>
        <div className='header-stats'>
          <div className='stat-item'>
            <span className='stat-value'>{users.length}</span>
            <span className='stat-label'>Total Members</span>
          </div>
          <div className='stat-item'>
            <span className='stat-value'>{users.filter((u: User) => u.status === 'active').length}</span>
            <span className='stat-label'>Active</span>
          </div>
          <div className='stat-item'>
            <span className='stat-value'>{departments.length}</span>
            <span className='stat-label'>Departments</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='filters-section'>
        <div className='search-box'>
          <FiSearch className='search-icon' />
          <input
            type='text'
            placeholder='Search by name, email, or role...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
        </div>

        <div className='filter-controls'>
          <div className='filter-group'>
            <FiFilter className='filter-icon' />
            <label className='filter-label'>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className='filter-select'>
              <option value='all'>All Status</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
              <option value='pending'>Pending</option>
            </select>
          </div>

          <div className='filter-group'>
            <label className='filter-label'>Department:</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className='filter-select'
            >
              <option value='all'>All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label className='filter-label'>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='filter-select'>
              <option value='name'>Name</option>
              <option value='role'>Role</option>
              <option value='department'>Department</option>
              <option value='joinedDate'>Join Date</option>
              <option value='rating'>Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className='results-summary'>
        <p>
          Showing <span className='highlight'>{filteredUsers.length}</span> of{' '}
          <span className='highlight'>{users.length}</span> team members
        </p>
      </div>

      {/* Users Grid */}
      <div className='users-grid'>
        {filteredUsers.map((user) => (
          <div key={user.id} className='user-card'>
            <div className='user-header'>
              <div className='user-avatar'>
                <img src={user.avatar} alt={user.name} />
                <div className='status-indicator'>{getStatusIcon(user.status)}</div>
              </div>
              <div className='user-basic-info'>
                <h3 className='user-name'>{user.name}</h3>
                <p className='user-role'>{user.role}</p>
                <div className={getStatusClass(user.status)}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </div>
              </div>
            </div>

            <div className='user-details'>
              <div className='detail-item'>
                <FiMail className='detail-icon' />
                <span className='detail-text'>{user.email}</span>
              </div>
              <div className='detail-item'>
                <FiMapPin className='detail-icon' />
                <span className='detail-text'>{user.location}</span>
              </div>
              <div className='detail-item'>
                <FiCalendar className='detail-icon' />
                <span className='detail-text'>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className='user-stats'>
              <div className='stat-grid'>
                <div className='stat-item'>
                  <FiTrendingUp className='stat-icon' />
                  <div className='stat-content'>
                    <span className='stat-value'>{user.stats.projectsCompleted}</span>
                    <span className='stat-label'>Projects</span>
                  </div>
                </div>
                <div className='stat-item'>
                  <FiClock className='stat-icon' />
                  <div className='stat-content'>
                    <span className='stat-value'>{user.stats.hoursWorked.toLocaleString()}</span>
                    <span className='stat-label'>Hours</span>
                  </div>
                </div>
                <div className='stat-item'>
                  <FiStar className='stat-icon' />
                  <div className='stat-content'>
                    <span className='stat-value'>{user.stats.rating}</span>
                    <span className='stat-label'>Rating</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='user-skills'>
              <h4 className='skills-title'>Skills</h4>
              <div className='skills-list'>
                {user.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className='skill-tag'>
                    {skill}
                  </span>
                ))}
                {user.skills.length > 3 && <span className='skill-tag more'>+{user.skills.length - 3} more</span>}
              </div>
            </div>

            <div className='user-actions'>
              <Link to={`/users/${user.id}`} className='view-profile-btn'>
                <FiUser className='btn-icon' />
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredUsers.length === 0 && (
        <div className='no-results'>
          <div className='no-results-icon'>
            <FiUser />
          </div>
          <h3>No team members found</h3>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}

export default UsersList
