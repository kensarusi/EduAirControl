import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { WiThermometer, WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import { HiSpeakerWave } from 'react-icons/hi2'
import { STATUS_COLORS, IDEAL_RANGES } from '../../constants/environments'
import '../../styles/components/EnvironmentCard.css'

function EnvironmentCard({ environment, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(environment.isFavorite || false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    if (onToggleFavorite) onToggleFavorite(environment.id, !isFavorite)
  }

  return (
    <div className="env-card" onClick={() => navigate(`/environment/${environment.id}`)}>
      <div className="env-card-header">
        <div className="env-card-title">
          <h3>{environment.nameKey ? t(environment.nameKey) : environment.name}</h3>
          <p className="click-text">{t('dashboard.clickDetails')}</p>
          <span
            className="env-status"
            style={{ color: STATUS_COLORS[environment.statusKey] }}
          >
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
            <p>{IDEAL_RANGES.temperature}</p>
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
            <p>{IDEAL_RANGES.humidity}</p>
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
            <p>{IDEAL_RANGES.co2}</p>
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
            <p>{IDEAL_RANGES.noise}</p>
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
