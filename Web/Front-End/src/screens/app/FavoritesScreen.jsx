import { useTranslation } from 'react-i18next'
import { FaHeart } from 'react-icons/fa'
import Navbar from '../../components/layout/Navbar'
import { useEnvironments } from '../../context/EnvironmentsContext'
import '../../styles/app/Favorites.css'

function FavoritesScreen() {
  const { t } = useTranslation()
  const { environments, toggleFavorite } = useEnvironments()
  const favorites = environments.filter((e) => e.isFavorite)

  const getStatusColor = (statusKey) => {
    switch (statusKey) {
      case 'dashboard.statusNormal': return '#238636'
      case 'dashboard.statusWarning': return '#d29922'
      case 'dashboard.statusAlert': return '#da3633'
      default: return '#8b949e'
    }
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
                        <span className="fav-metric-value">{fav.co2}</span>
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
                      onClick={() => toggleFavorite(fav.id, false)}
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
    </div>
  )
}

export default FavoritesScreen