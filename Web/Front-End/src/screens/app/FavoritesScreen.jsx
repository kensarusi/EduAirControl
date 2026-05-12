import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaHeart } from 'react-icons/fa'
import Navbar from '../../components/layout/Navbar'
import { useEnvironments } from '../../context/EnvironmentsContext'
import '../../styles/app/Favorites.css'

function FavoritesScreen() {
  const { t } = useTranslation()
  const { environments, toggleFavorite } = useEnvironments()
  const favorites = environments.filter((e) => e.isFavorite)

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedFavId, setSelectedFavId] = useState(null)
  const [selectedFavName, setSelectedFavName] = useState('')

  const getStatusColor = (statusKey) => {
    switch (statusKey) {
      case 'dashboard.statusNormal': return '#238636'
      case 'dashboard.statusWarning': return '#d29922'
      case 'dashboard.statusAlert': return '#da3633'
      default: return '#8b949e'
    }
  }

  // Handle remove favorite click
  const handleRemoveFavoriteClick = (id, name) => {
    setSelectedFavId(id)
    setSelectedFavName(name)
    setShowConfirmModal(true)
  }

  // Confirm removal
  const handleConfirmRemove = () => {
    if (selectedFavId) {
      toggleFavorite(selectedFavId, false)
      setShowConfirmModal(false)
      setSelectedFavId(null)
      setSelectedFavName('')
    }
  }

  // Cancel removal
  const handleCancelRemove = () => {
    setShowConfirmModal(false)
    setSelectedFavId(null)
    setSelectedFavName('')
  }

  return (
    <div className="favorites-page">
      <Navbar />
      <div className="favorites-container">
        {/* ── Header ── */}
        <div className="favorites-header">
          <div className="favorites-header-content">
            <FaHeart size={32} color="#ff6b6b" />
            <div>
              <h1>{t('favorites.title')}</h1>
              <p className="favorites-subtitle">{t('favorites.description')}</p>
            </div>
          </div>
        </div>

        {/* ── Empty State ── */}
        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <div className="empty-icon-wrapper">
              <FaHeart size={56} />
            </div>
            <h2>{t('favorites.empty')}</h2>
            <p>{t('favorites.emptyHint')}</p>
          </div>
        ) : (
          /* ── Favorites List ── */
          <div className="favorites-list">
            {favorites.map((fav) => (
              <div key={fav.id} className="fav-card-impact">
                {/* Status Indicator */}
                <div 
                  className="fav-status-indicator" 
                  style={{ backgroundColor: getStatusColor(fav.statusKey) }}
                />

                {/* Content Container */}
                <div className="fav-card-content">
                  {/* Left Section: Name & Status */}
                  <div className="fav-section-left">
                    <h3>{fav.nameKey ? t(fav.nameKey) : fav.name}</h3>
                    <span 
                      className="fav-status-badge" 
                      style={{ color: getStatusColor(fav.statusKey) }}
                    >
                      {t(fav.statusKey)}
                    </span>
                  </div>

                  {/* Center Section: Metrics */}
                  <div className="fav-section-metrics">
                    <div className="fav-metric-box">
                      <span className="fav-metric-icon">🌡️</span>
                      <div className="fav-metric-info">
                        <span className="fav-metric-label">{t('dashboard.temperature')}</span>
                        <span className="fav-metric-value">{fav.temp}°C</span>
                      </div>
                    </div>
                    <div className="fav-metric-box">
                      <span className="fav-metric-icon">💧</span>
                      <div className="fav-metric-info">
                        <span className="fav-metric-label">{t('dashboard.humidity')}</span>
                        <span className="fav-metric-value">{fav.humidity}%</span>
                      </div>
                    </div>
                    <div className="fav-metric-box">
                      <span className="fav-metric-icon">🌫️</span>
                      <div className="fav-metric-info">
                        <span className="fav-metric-label">CO₂</span>
                        <span className="fav-metric-value">{fav.co2}ppm</span>
                      </div>
                    </div>
                    <div className="fav-metric-box">
                      <span className="fav-metric-icon">🔊</span>
                      <div className="fav-metric-info">
                        <span className="fav-metric-label">{t('dashboard.noise')}</span>
                        <span className="fav-metric-value">{fav.noise} dB</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Quality & Action */}
                  <div className="fav-section-right">
                    <div className="fav-quality-info">
                      <span className="fav-quality-label">{t('dashboard.airQuality')}</span>
                      <span className="fav-quality-value">{t(fav.qualityKey)}</span>
                    </div>
                    <button
                      className="fav-heart-btn-impact"
                      onClick={() => handleRemoveFavoriteClick(fav.id, fav.nameKey ? t(fav.nameKey) : fav.name)}
                      title={t('favorites.removeFavorite')}
                    >
                      <FaHeart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Confirmation Modal ── */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={handleCancelRemove}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header modal-header-warning">
              <FaHeart size={24} color="#ff6b6b" />
              <h2>Eliminar de Favoritos</h2>
            </div>

            <div className="modal-body">
              <p>
                ¿Estás seguro de que deseas eliminar <strong>{selectedFavName}</strong> de tus favoritos? Ya no se mostrará notificaciones de este ambiente. 
              </p>
            </div>

            <div className="modal-footer">
              <button 
                className="modal-btn modal-btn-cancel"
                onClick={handleCancelRemove}
              >
                Cancelar
              </button>
              <button 
                className="modal-btn modal-btn-confirm modal-btn-danger"
                onClick={handleConfirmRemove}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FavoritesScreen