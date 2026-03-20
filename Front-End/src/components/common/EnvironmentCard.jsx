import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { WiThermometer, WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import { HiSpeakerWave } from 'react-icons/hi2'
import '../../styles/EnvironmentCard.css'

function EnvironmentCard({ environment, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(environment.isFavorite || false)

  const handleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    if (onToggleFavorite) {
      onToggleFavorite(environment.id, !isFavorite)
    }
  }

  const getStatusColor = () => {
    if (environment.status === 'Normal') return '#4CAF50'
    if (environment.status === 'Advertencia') return '#FFC107'
    return '#F44336'
  }

  return (
    <div className="env-card">
      <div className="env-card-header">
        <div>
          <h3>{environment.name}</h3>
          <p className="env-card-subtitle">Click Para Ver Detalles</p>
          <span className="env-status" style={{ color: getStatusColor() }}>
            {environment.status}
          </span>
        </div>
        <button className="favorite-btn" onClick={handleFavorite}>
          {isFavorite ? <FaHeart className="heart-filled" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="env-card-body">
        <div className="env-variable">
          <div className="env-var-left">
            <WiThermometer className="env-icon temp" />
            <div>
              <strong>Temperatura</strong>
              <p>{environment.temp}°C</p>
            </div>
          </div>
          <div className="env-var-right">
            <span>Rango ideal</span>
            <p>18-24°C</p>
          </div>
        </div>

        <div className="env-variable">
          <div className="env-var-left">
            <WiHumidity className="env-icon humidity" />
            <div>
              <strong>Humedad</strong>
              <p>{environment.humidity}%</p>
            </div>
          </div>
          <div className="env-var-right">
            <span>Rango ideal</span>
            <p>40-60%</p>
          </div>
        </div>

        <div className="env-variable">
          <div className="env-var-left">
            <MdCo2 className="env-icon co2" />
            <div>
              <strong>CO₂</strong>
              <p>{environment.co2} ppm</p>
            </div>
          </div>
          <div className="env-var-right">
            <span>Rango ideal</span>
            <p>{"< 1000 ppm"}</p>
          </div>
        </div>

        <div className="env-variable">
          <div className="env-var-left">
            <HiSpeakerWave className="env-icon noise" />
            <div>
              <strong>Nivel de Ruido</strong>
              <p>{environment.noise} dB</p>
            </div>
          </div>
          <div className="env-var-right">
            <span>Rango ideal</span>
            <p>{"< 50 dB"}</p>
          </div>
        </div>
      </div>

      <div className="env-card-footer">
        <span>Calidad del Aire</span>
        <strong>{environment.airQuality}</strong>
      </div>
    </div>
  )
}

export default EnvironmentCard