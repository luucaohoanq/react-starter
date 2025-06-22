import React from 'react'
import { useApp } from '../../contexts/app.context'
import { FiUser, FiMail, FiShield, FiCalendar, FiEdit3 } from 'react-icons/fi'
import './Profile.css'

const Profile: React.FC = () => {
  const { state } = useApp()
  const { user } = state

  if (!user) {
    return (
      <div className='profile-container'>
        <div className='profile-error'>
          <h2>Access Denied</h2>
          <p>You need to be logged in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <h1>My Profile</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className='profile-content'>
        <div className='profile-card'>
          <div className='profile-avatar-section'>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className='profile-avatar-large' />
            ) : (
              <div className='profile-avatar-placeholder'>
                <FiUser size={48} />
              </div>
            )}
            <button className='edit-avatar-btn'>
              <FiEdit3 size={16} />
              Change Photo
            </button>
          </div>

          <div className='profile-info'>
            <div className='profile-field'>
              <label className='profile-label'>
                <FiUser className='profile-icon' />
                Full Name
              </label>
              <div className='profile-value'>{user.name}</div>
            </div>

            <div className='profile-field'>
              <label className='profile-label'>
                <FiMail className='profile-icon' />
                Email Address
              </label>
              <div className='profile-value'>{user.email}</div>
            </div>

            <div className='profile-field'>
              <label className='profile-label'>
                <FiShield className='profile-icon' />
                Role
              </label>
              <div className='profile-value'>
                <span className={`role-badge role-${user.role}`}>{user.role}</span>
              </div>
            </div>

            <div className='profile-field'>
              <label className='profile-label'>
                <FiCalendar className='profile-icon' />
                Member Since
              </label>
              <div className='profile-value'>
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>

            {user.role === 'admin' && (
              <div className='admin-section'>
                <h3>Admin Privileges</h3>
                <ul className='admin-privileges'>
                  <li>✅ View all users</li>
                  <li>✅ Manage user accounts</li>
                  <li>✅ Access admin dashboard</li>
                  <li>✅ System administration</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className='profile-actions'>
          <button className='btn btn-primary'>
            <FiEdit3 />
            Edit Profile
          </button>
          <button className='btn btn-secondary'>Change Password</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
