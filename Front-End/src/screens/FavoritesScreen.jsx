import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import { FaHeart, FaBell } from 'react-icons/fa'
import '../styles/Favorites.css'

function FavoritesScreen() {
  const { t } = useTranslation()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(saved)
  }, [])

  const getStatusColor = (statusKey) => {
    if (statusKey === 'dashboard.statusNormal') return '#4CAF50'
    if (statusKey === 'dashboard.statusAlert') return '#F44336'
    return '#FFC107'
  }

  return (
    <div className="favorites-page">
      <Navbar />
      <div className="favorites-content">
        <h1><FaHeart style={{ color: '#ff6b6b' }} /> {t('favorites.title')}</h1>
        <p className="favorites-subtitle">{t('favorites.description')}</p>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <FaHeart style={{ fontSize: 48, color: '#ddd' }} />
            <h2>{t('favorites.empty')}</h2>
            <p>{t('favorites.emptyHint')}</p>
          </div>
        ) : (
          favorites.map(fav => (
            <div key={fav.id} className="fav-card">
              <div className="fav-card-header">
                <div>
                  <h2>{t(fav.nameKey)}</h2>
                  <span
                    className="fav-status"
                    style={{ color: getStatusColor(fav.statusKey) }}
                  >
                    {t(fav.statusKey)}
                  </span>
                </div>
                <FaHeart style={{ color: '#ff6b6b', fontSize: 22 }} />
              </div>

              <div className="fav-card-body">
                <div className="fav-metric">
                  <span className="fav-metric-label">🌡️ {t('dashboard.temperature')}</span>
                  <span className="fav-metric-value">{fav.temp}°C</span>
                </div>
                <div className="fav-metric">
                  <span className="fav-metric-label">💧 {t('dashboard.humidity')}</span>
                  <span className="fav-metric-value">{fav.humidity}%</span>
                </div>
                <div className="fav-metric">
                  <span className="fav-metric-label">🌫️ CO₂</span>
                  <span className="fav-metric-value">{fav.co2} ppm</span>
                </div>
                <div className="fav-metric">
                  <span className="fav-metric-label">🔊 {t('dashboard.noise')}</span>
                  <span className="fav-metric-value">{fav.noise} dB</span>
                </div>
              </div>

              <div className="fav-card-footer">
                <span>{t('dashboard.airQuality')}</span>
                <strong>{t(fav.qualityKey)}</strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FavoritesScreen