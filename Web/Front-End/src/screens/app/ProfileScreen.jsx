import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaUser, FaEnvelope, FaBriefcase } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import Navbar from '../../components/layout/Navbar'
import '../../styles/app/Profile.css'

const DEFAULT_PROFILE = {
  fullName: 'Keneth Santiago Rubiano Silva',
  email: 'Kensarusi@gmail.com',
  title: 'Product Manager',
}

function ProfileScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [profile, setProfile] = useState(
    () => JSON.parse(localStorage.getItem('profile')) || DEFAULT_PROFILE
  )
  const [modal, setModal] = useState({ open: false, field: '', value: '' })

  const fieldLabels = {
    fullName: t('profile.fullName'),
    email: t('profile.email'),
    title: t('profile.titleLabel'),
  }

  const fieldIcons = {
    fullName: <FaUser />,
    email: <FaEnvelope />,
    title: <FaBriefcase />,
  }

  const openModal = (field) => setModal({ open: true, field, value: profile[field] })
  const closeModal = () => setModal({ open: false, field: '', value: '' })

  const handleSave = () => {
    const updated = { ...profile, [modal.field]: modal.value }
    setProfile(updated)
    localStorage.setItem('profile', JSON.stringify(updated))
    closeModal()
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

          {['fullName', 'email', 'title'].map((field) => (
            <div key={field} className="profile-field">
              <div className="field-icon">{fieldIcons[field]}</div>
              <div className="field-info">
                <span className="field-label">{fieldLabels[field]}</span>
                <span className="field-value">{profile[field]}</span>
              </div>
              <button className="btn-update" onClick={() => openModal(field)}>
                <MdEdit /> {t('profile.updateBtn')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {modal.open && (
        <div className="profile-modal-overlay" onClick={closeModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h3>✏️ {fieldLabels[modal.field]}</h3>
            <input
              className="profile-modal-input"
              type={modal.field === 'email' ? 'email' : 'text'}
              value={modal.value}
              onChange={(e) => setModal((prev) => ({ ...prev, value: e.target.value }))}
              autoFocus
            />
            <div className="profile-modal-actions">
              <button className="btn-modal-cancel" onClick={closeModal}>Cancelar</button>
              <button className="btn-modal-save" onClick={handleSave}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileScreen
