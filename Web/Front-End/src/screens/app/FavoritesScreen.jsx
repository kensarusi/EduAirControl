import { useTranslation } from 'react-i18next'
import { FaHeart } from 'react-icons/fa'
import Navbar from '../../components/layout/Navbar'
import { useEnvironments } from '../../context/EnvironmentsContext'
import { STATUS_COLORS } from '../../constants/environments'
import '../../styles/app/Favorites.css'

function FavoritesScreen() {
  const { t } = useTranslation()
  const { environments, toggleFavorite } = useEnvironments()
  const favorites = environments.filter((e) => e.isFavorite)

  return (
    <div className="app-background">
      <Navbar />
      <div className="dashboard-page">
        <h1><FaHeart style={{ color: '#ff6b6b' }} /> {t('favorites.title')}</h1>
        <p className="favorites-subtitle">{t('favorites.description')}</p>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <FaHeart style={{ fontSize: 48, color: '#ddd' }} />
            <h2>{t('favorites.empty')}</h2>
            <p>{t('favorites.emptyHint')}</p>
          </div>
        ) : (
          favorites.map((fav) => (
            <div key={fav.id} className="fav-card">
              <div className="fav-card-header">
                <div>
                  <h2>{fav.nameKey ? t(fav.nameKey) : fav.name}</h2>
                  <span className="fav-status" style={{ color: STATUS_COLORS[fav.statusKey] }}>
                    {t(fav.statusKey)}
                  </span>
                </div>
                <FaHeart
                  style={{ color: '#ff6b6b', fontSize: 22, cursor: 'pointer' }}
                  onClick={() => toggleFavorite(fav.id, false)}
                />
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