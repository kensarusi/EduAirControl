import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { FaHeart, FaBell } from 'react-icons/fa'
import { WiThermometer } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import '../styles/Favorites.css'

function FavoritesScreen() {
  const [favorites] = useState([
    {
      id: 1,
      name: 'Ambiente de Formación 1',
      status: 'Advertencia',
      notifications: [
        { id: 1, message: '⚠️ Temperatura elevada: 26°C', time: 'Hace 5 min', type: 'warning' },
        { id: 2, message: '🔴 CO₂ alto: 1200 ppm', time: 'Hace 15 min', type: 'alert' },
      ]
    },
    {
      id: 3,
      name: 'Ambiente de Formación 3',
      status: 'Advertencia',
      notifications: [
        { id: 3, message: '⚠️ Humedad baja: 28%', time: 'Hace 10 min', type: 'warning' },
      ]
    }
  ])

  const getStatusColor = (type) => {
    if (type === 'warning') return '#FFC107'
    if (type === 'alert') return '#F44336'
    return '#4CAF50'
  }

  return (
    <div>
      <Navbar />
      <div className="favorites-page">
        <h1><FaHeart className="favorites-title-icon" /> Favoritos</h1>
        <p className="favorites-description">
          Notificaciones de tus ambientes favoritos
        </p>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <FaHeart className="empty-heart" />
            <p>No tienes ambientes favoritos</p>
            <span>Marca un corazón en el dashboard para agregar favoritos</span>
          </div>
        ) : (
          favorites.map(fav => (
            <div key={fav.id} className="favorite-card">
              <div className="favorite-card-header">
                <div>
                  <h3>{fav.name}</h3>
                  <span className="favorite-status">{fav.status}</span>
                </div>
                <FaHeart className="heart-filled-fav" />
              </div>

              <div className="favorite-notifications">
                {fav.notifications.map(notif => (
                  <div
                    key={notif.id}
                    className="notification-item"
                    style={{ borderLeft: `4px solid ${getStatusColor(notif.type)}` }}
                  >
                    <div className="notification-content">
                      <FaBell className="notification-bell" style={{ color: getStatusColor(notif.type) }} />
                      <div>
                        <p className="notification-message">{notif.message}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
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