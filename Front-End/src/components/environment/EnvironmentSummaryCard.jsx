import { useTranslation } from 'react-i18next'
import { STATUS_COLORS, QUALITY_COLORS } from '../../constants/environments'
import '../../styles/components/AllEnvironments.css'

function EnvironmentSummaryCard({ nameKey, statusKey, co2, db, temp, humidity, qualityKey }) {
  const { t } = useTranslation()

  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <h3>{t(nameKey)}</h3>
        <span style={{ color: STATUS_COLORS[statusKey] }}>{t(statusKey)}</span>
      </div>

      <div className="summary-card-grid">
        <div className="summary-item">
          <span className="summary-label">{t('allEnvironments.co2')}</span>
          <span className="summary-value">{co2}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">{t('allEnvironments.db')}</span>
          <span className="summary-value">{db}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">{t('allEnvironments.temp')}</span>
          <span className="summary-value">{temp}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">{t('allEnvironments.humidity')}</span>
          <span className="summary-value">{humidity}</span>
        </div>
      </div>

      <div className="summary-card-footer">
        <span>{t('allEnvironments.airQuality')}</span>
        <span style={{ color: QUALITY_COLORS[qualityKey] }}>{t(qualityKey)}</span>
      </div>
    </div>
  )
}

export default EnvironmentSummaryCard
