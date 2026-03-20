import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaUser, FaEnvelope, FaBriefcase } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import Navbar from '../components/layout/Navbar'
import '../styles/Profile.css'

function ProfileScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [profile, setProfile] = useState(() => {
    return JSON.parse(localStorage.getItem('profile')) || {
      fullName: 'Keneth Santiago Rubiano Silva',
      email: 'Kensarusi@gmail.com',
      title: 'Product Manager'
    }
  })

  const [modal, setModal] = useState({ open: false, field: '', value: '' })

  const fieldLabels = {
    fullName: t('profile.fullName'),
    email: t('profile.email'),
    title: t('profile.titleLabel'),
  }

  const handleOpen = (field) => {
    setModal({ open: true, field, value: profile[field] })
  }

  const handleSave = () => {
    const updated = { ...profile, [modal.field]: modal.value }
    setProfile(updated)
    localStorage.setItem('profile', JSON.stringify(updated))
    setModal({ open: false, field: '', value: '' })
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">

        <div className="profile-header-card">
          <div className="profile-avatar-large"><FaUser /></div>
          <h1>{profile.fullName}</h1>
          <p className="profile-title">{profile.title}</p>
          <button className="btn-logout" onClick={() => navigate('/')}>
            <IoLogOut /> {t('profile.logoutBtn')}
          </button>
        </div>

        <div className="profile-section-card">
          <h2>📋 {t('profile.title')}</h2>
          <p className="section-description">{t('profile.description')}</p>

          <div className="profile-field">
            <div className="field-icon"><FaUser /></div>
            <div className="field-info">
              <span className="field-label">{t('profile.fullName')}</span>
              <span className="field-value">{profile.fullName}</span>
            </div>
            <button className="btn-update" onClick={() => handleOpen('fullName')}>
              <MdEdit /> {t('profile.updateBtn')}
            </button>
          </div>

          <div className="profile-field">
            <div className="field-icon"><FaEnvelope /></div>
            <div className="field-info">
              <span className="field-label">{t('profile.email')}</span>
              <span className="field-value">{profile.email}</span>
            </div>
            <button className="btn-update" onClick={() => handleOpen('email')}>
              <MdEdit /> {t('profile.updateBtn')}
            </button>
          </div>

          <div className="profile-field">
            <div className="field-icon"><FaBriefcase /></div>
            <div className="field-info">
              <span className="field-label">{t('profile.titleLabel')}</span>
              <span className="field-value">{profile.title}</span>
            </div>
            <button className="btn-update" onClick={() => handleOpen('title')}>
              <MdEdit /> {t('profile.updateBtn')}
            </button>
          </div>
        </div>
      </div>

      {modal.open && (
        <div className="profile-modal-overlay" onClick={() => setModal({ open: false, field: '', value: '' })}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h3>✏️ {fieldLabels[modal.field]}</h3>
            <input
              className="profile-modal-input"
              type={modal.field === 'email' ? 'email' : 'text'}
              value={modal.value}
              onChange={(e) => setModal(prev => ({ ...prev, value: e.target.value }))}
              autoFocus
            />
            <div className="profile-modal-actions">
              <button className="btn-modal-cancel" onClick={() => setModal({ open: false, field: '', value: '' })}>
                Cancelar
              </button>
              <button className="btn-modal-save" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileScreen