import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { WiThermometer, WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import { HiSpeakerWave } from 'react-icons/hi2'
import '../../styles/EnvironmentCard.css'

function EnvironmentCard({ environment, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(environment.isFavorite || false)
  const { t } = useTranslation()

  const handleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    if (onToggleFavorite) onToggleFavorite(environment.id, !isFavorite)
  }

  const getStatusColor = () => {
    if (environment.statusKey === 'dashboard.statusNormal') return '#4CAF50'
    if (environment.statusKey === 'dashboard.statusWarning') return '#FFC107'
    return '#F44336'
  }

  return (
    <div className="env-card">
      <div className="env-card-header">
        <div className="env-card-title">
          <h3>{t(environment.nameKey)}</h3>
          <p className="click-text">{t('dashboard.clickDetails')}</p>
          <span className="env-status" style={{ color: getStatusColor() }}>
            {t(environment.statusKey)}
          </span>
        </div>
        <button
          className={`btn-favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="env-card-body">
        <div className="env-metric">
          <WiThermometer className="metric-icon temp" />
          <div>
            <strong>{t('dashboard.temperature')}</strong>
            <p>{environment.temp}°C</p>
          </div>
          <div className="metric-ideal">
            <span>{t('dashboard.idealRange')}</span>
            <p>18-24°C</p>
          </div>
        </div>

        <div className="env-metric">
          <WiHumidity className="metric-icon humidity" />
          <div>
            <strong>{t('dashboard.humidity')}</strong>
            <p>{environment.humidity}%</p>
          </div>
          <div className="metric-ideal">
            <span>{t('dashboard.idealRange')}</span>
            <p>40-60%</p>
          </div>
        </div>

        <div className="env-metric">
          <MdCo2 className="metric-icon co2" />
          <div>
            <strong>CO₂</strong>
            <p>{environment.co2} ppm</p>
          </div>
          <div className="metric-ideal">
            <span>{t('dashboard.idealRange')}</span>
            <p>{'< 1000 ppm'}</p>
          </div>
        </div>

        <div className="env-metric">
          <HiSpeakerWave className="metric-icon noise" />
          <div>
            <strong>{t('dashboard.noise')}</strong>
            <p>{environment.noise} dB</p>
          </div>
          <div className="metric-ideal">
            <span>{t('dashboard.idealRange')}</span>
            <p>{'< 50 dB'}</p>
          </div>
        </div>
      </div>

      <div className="env-card-footer">
        <span>{t('dashboard.airQuality')}</span>
        <strong>{t(environment.qualityKey)}</strong>
      </div>
    </div>
  )
}

export default EnvironmentCard