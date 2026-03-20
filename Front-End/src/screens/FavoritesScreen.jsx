import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import { FaHeart, FaBell } from 'react-icons/fa'
import '../styles/Favorites.css'

function FavoritesScreen() {
  const { t } = useTranslation()

  const [favorites] = useState([
    {
      id: 1,
      nameKey: 'dashboard.env1',
      statusKey: 'dashboard.statusWarning',
      notifications: [
        { id: 1, messageKey: 'favorites.notif1', timeKey: 'favorites.ago5', type: 'warning' },
        { id: 2, messageKey: 'favorites.notif2', timeKey: 'favorites.ago15', type: 'alert' },
      ]
    },
    {
      id: 3,
      nameKey: 'dashboard.env3',
      statusKey: 'dashboard.statusWarning',
      notifications: [
        { id: 3, messageKey: 'favorites.notif3', timeKey: 'favorites.ago10', type: 'warning' },
      ]
    }
  ])

  const getStatusColor = (type) => {
    if (type === 'warning') return '#FFC107'
    if (type === 'alert') return '#F44336'
    return '#4CAF50'
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
                    style={{ color: fav.statusKey === 'dashboard.statusAlert' ? '#F44336' : '#FFC107' }}
                  >
                    {t(fav.statusKey)}
                  </span>
                </div>
                <button className="fav-heart"><FaHeart /></button>
              </div>

              <div className="fav-notifications">
                {fav.notifications.map(notif => (
                  <div key={notif.id} className="fav-notification">
                    <div className={`fav-notif-border ${notif.type}`} />
                    <FaBell className={`fav-notif-icon ${notif.type}`} />
                    <div className="fav-notif-info">
                      <p>{t(notif.messageKey)}</p>
                      <span>{t(notif.timeKey)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FavoritesScreen