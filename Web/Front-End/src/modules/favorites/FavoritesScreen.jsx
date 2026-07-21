import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FaHeart } from 'react-icons/fa'
import Navbar from "../dashboard/components/Navbar/Navbar";
import { useEnvironment } from "../../context/EnvironmentContext";
import "./Favorites.css";

function FavoritesScreen() {
  const { t } = useTranslation()
  const { environments, toggleFavorite } = useEnvironment();

  // favoritos memoizados (más limpio y eficiente)
  const favorites = useMemo(
    () => environments.filter((e) => e.isFavorite),
    [environments]
  )

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedFav, setSelectedFav] = useState(null)

  const getStatusColor = (statusKey) => {
    switch (statusKey) {
      case 'dashboard.statusNormal':
        return '#238636'
      case 'dashboard.statusWarning':
        return '#d29922'
      case 'dashboard.statusAlert':
        return '#da3633'
      default:
        return '#8b949e'
    }
  }

  const handleRemoveFavoriteClick = (fav) => {
    setSelectedFav(fav)
    setShowConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    if (!selectedFav) return

    // importante: depende de tu context
    toggleFavorite(selectedFav.id, false)

    setShowConfirmModal(false)
    setSelectedFav(null)
  }

  const handleCancelRemove = () => {
    setShowConfirmModal(false)
    setSelectedFav(null)
  }

  return (
    <div className="favorites-page">
      <Navbar />

      <div className="app-page-container">

        {/* HEADER */}
        <div className="favorites-header">
          <div className="favorites-header-content">
            <FaHeart size={32} color="#ff6b6b" />
            <div>
              <h1>{t('favorites.title')}</h1>
              <p className="favorites-subtitle">
                {t('favorites.description')}
              </p>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <FaHeart size={56} />
            <h2>{t('favorites.empty')}</h2>
            <p>{t('favorites.emptyHint')}</p>
          </div>
        ) : (
          /* LIST */
          <div className="favorites-list">
            {favorites.map((fav) => {
              const name = fav.nameKey ? t(fav.nameKey) : fav.name

              return (
                <div key={fav.id} className="fav-card-impact">

                  <div
                    className="fav-status-indicator"
                    style={{ backgroundColor: getStatusColor(fav.statusKey) }}
                  />

                  {/* CONTENT */}
                  <div className="fav-card-content">

                    {/* LEFT */}
                    <div className="fav-section-left">
                      <h3>{name}</h3>

                      <span
                        className="fav-status-badge"
                        style={{ color: getStatusColor(fav.statusKey) }}
                      >
                        {t(fav.statusKey)}
                      </span>
                    </div>

                    {/* METRICS */}
                    <div className="fav-section-metrics">

                      <div className="fav-metric-box">
                        <span>🌡️</span>
                        <div>
                          <span>{t('dashboard.temperature')}</span>
                          <span>{fav.temp}°C</span>
                        </div>
                      </div>

                      <div className="fav-metric-box">
                        <span>💧</span>
                        <div>
                          <span>{t('dashboard.humidity')}</span>
                          <span>{fav.humidity}%</span>
                        </div>
                      </div>

                      <div className="fav-metric-box">
                        <span>🌫️</span>
                        <div>
                          <span>CO₂</span>
                          <span>{fav.co2}ppm</span>
                        </div>
                      </div>

                      <div className="fav-metric-box">
                        <span>🔊</span>
                        <div>
                          <span>{t('dashboard.noise')}</span>
                          <span>{fav.noise} dB</span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="fav-section-right">

                      <div className="fav-quality-info">
                        <span>{t('dashboard.airQuality')}</span>
                        <span>{t(fav.qualityKey)}</span>
                      </div>

                      <button
                        className="fav-heart-btn-impact"
                        onClick={() => handleRemoveFavoriteClick(fav)}
                        title={t('favorites.removeFavorite')}
                      >
                        <FaHeart size={20} />
                      </button>

                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showConfirmModal && selectedFav && (
        <div className="modal-overlay" onClick={handleCancelRemove}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header modal-header-warning">
              <FaHeart size={24} color="#ff6b6b" />
              <h2>Eliminar de Favoritos</h2>
            </div>

            <div className="modal-body">
              <p>
                ¿Seguro que quieres eliminar{' '}
                <strong>
                  {selectedFav.nameKey
                    ? t(selectedFav.nameKey)
                    : selectedFav.name}
                </strong>{' '}
                de favoritos?
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