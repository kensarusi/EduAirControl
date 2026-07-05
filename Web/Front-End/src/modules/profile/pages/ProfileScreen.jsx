import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaUser, FaEnvelope, FaBriefcase, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import Navbar from '../../components/layout/Navbar'
import '../../styles/app/Profile.css'

const DEFAULT_PROFILE = {
  fullName: 'Keneth Santiago Rubiano Silva',
  email: 'Kensarusi@gmail.com',
  title: 'Product Manager',
  phone: '+57 (123) 456-7890',
  location: 'Bogotá, Colombia',
}

function ProfileScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [profile, setProfile] = useState(
    () => JSON.parse(localStorage.getItem('profile')) || DEFAULT_PROFILE
  )
  const [editModal, setEditModal] = useState({ open: false, field: '', value: '' })
  const [logoutModal, setLogoutModal] = useState(false)

  const fieldLabels = {
    fullName: t('profile.fullName'),
    email: t('profile.email'),
    title: t('profile.titleLabel'),
    phone: 'Teléfono',
    location: 'Ubicación',
  }

  const fieldIcons = {
    fullName: <FaUser />,
    email: <FaEnvelope />,
    title: <FaBriefcase />,
    phone: <FaPhone />,
    location: <FaMapMarkerAlt />,
  }

  const openEditModal = (field) => setEditModal({ open: true, field, value: profile[field] })
  const closeEditModal = () => setEditModal({ open: false, field: '', value: '' })

  const handleSave = () => {
    const updated = { ...profile, [editModal.field]: editModal.value }
    setProfile(updated)
    localStorage.setItem('profile', JSON.stringify(updated))
    closeEditModal()
  }

  const handleLogout = () => {
    setLogoutModal(false)
    navigate('/')
  }

  return (
    <div className="profile-page-final">
      <Navbar />
      <div className="profile-container-final">
        {/* ── Hero Section ── */}
        <div className="profile-hero-final">
          <div className="hero-avatar-final">
            <FaUser />
          </div>
          <div className="hero-info-final">
            <h1>{profile.fullName}</h1>
            <p className="hero-title-final">{profile.title}</p>
          </div>
          <button 
            className="btn-logout-final" 
            onClick={() => setLogoutModal(true)}
          >
            <IoLogOut /> {t('profile.logoutBtn')}
          </button>
        </div>

        {/* ── Information Section ── */}
        <div className="profile-info-final">
          <h2>{t('profile.title')}</h2>
          <p className="info-description">{t('profile.description')}</p>

          <div className="info-items-container">
            {['fullName', 'email', 'title', 'phone', 'location'].map((field) => (
              <div key={field} className="info-item">
                <div className="item-icon">{fieldIcons[field]}</div>
                <div className="item-content">
                  <span className="item-label">{fieldLabels[field]}</span>
                  <span className="item-value">{profile[field]}</span>
                </div>
                <button 
                  className="item-edit-btn" 
                  onClick={() => openEditModal(field)}
                  title={`Editar ${fieldLabels[field]}`}
                >
                  <MdEdit />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {editModal.open && (
        <div className="modal-overlay-final" onClick={closeEditModal}>
          <div className="modal-final" onClick={(e) => e.stopPropagation()}>
            <h3> {fieldLabels[editModal.field]}</h3>
            <input
              className="modal-input-final"
              type={editModal.field === 'email' ? 'email' : 'text'}
              value={editModal.value}
              onChange={(e) => setEditModal((prev) => ({ ...prev, value: e.target.value }))}
              autoFocus
            />
            <div className="modal-actions-final">
              <button className="btn-cancel-final" onClick={closeEditModal}>
                Cancelar
              </button>
              <button className="btn-save-final" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Logout Confirmation Modal ── */}
      {logoutModal && (
        <div className="modal-overlay-final" onClick={() => setLogoutModal(false)}>
          <div className="modal-final modal-logout" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-header">
              <IoLogOut size={28} color="#ff6b6b" />
              <h3>Cerrar Sesión</h3>
            </div>
            <p className="logout-modal-message">
              ¿Estás seguro de que deseas cerrar sesión? Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.
            </p>
            <div className="modal-actions-final">
              <button 
                className="btn-cancel-final" 
                onClick={() => setLogoutModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn-logout-confirm-final" 
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileScreen