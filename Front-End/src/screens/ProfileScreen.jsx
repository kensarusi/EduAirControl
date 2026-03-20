import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaBriefcase } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import Navbar from '../components/layout/Navbar'
import '../styles/Profile.css'

function ProfileScreen() {
  const navigate = useNavigate()

  const [profile] = useState({
    fullName: 'Keneth Santiago Rubiano Silva',
    email: 'Kensarusi@gmail.com',
    title: 'Product Manager'
  })

  const handleLogout = () => {
    console.log('Cerrando sesión...')
    navigate('/')
  }

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-content">
        {/* Header del perfil */}
        <div className="profile-header-card">
          <div className="profile-avatar-large">
            <FaUser />
          </div>
          <h1>{profile.fullName}</h1>
          <p className="profile-title">{profile.title}</p>
          <button className="btn-logout" onClick={handleLogout}>
            <IoLogOut /> Log Out
          </button>
        </div>

        {/* Personal Information */}
        <div className="profile-section-card">
          <h2>📋 Personal Information</h2>
          <p className="section-description">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="profile-field">
            <div className="field-icon"><FaUser /></div>
            <div className="field-info">
              <span className="field-label">Full name</span>
              <span className="field-value">{profile.fullName}</span>
            </div>
            <button className="btn-update"><MdEdit /> Update</button>
          </div>

          <div className="profile-field">
            <div className="field-icon"><FaEnvelope /></div>
            <div className="field-info">
              <span className="field-label">Email address</span>
              <span className="field-value">{profile.email}</span>
            </div>
            <button className="btn-update"><MdEdit /> Update</button>
          </div>

          <div className="profile-field">
            <div className="field-icon"><FaBriefcase /></div>
            <div className="field-info">
              <span className="field-label">Title</span>
              <span className="field-value">{profile.title}</span>
            </div>
            <button className="btn-update"><MdEdit /> Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen