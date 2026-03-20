import { useTranslation } from 'react-i18next'
import '../../styles/AllEnvironments.css'

function EnvironmentSummaryCard({ nameKey, statusKey, co2, db, temp, humidity, qualityKey }) {
  const { t } = useTranslation()

  const statusColor = () => {
    if (statusKey === 'dashboard.statusNormal') return '#4CAF50'
    if (statusKey === 'dashboard.statusAlert') return '#F44336'
    return '#FFC107'
  }

  const qualityColor = () => {
    if (qualityKey === 'dashboard.qualityGood') return '#4CAF50'
    if (qualityKey === 'dashboard.qualityBad') return '#F44336'
    return '#FFC107'
  }

  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <h3>{t(nameKey)}</h3>
        <span style={{ color: statusColor() }}>{t(statusKey)}</span>
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
        <span style={{ color: qualityColor() }}>{t(qualityKey)}</span>
      </div>
    </div>
  )
}

export default EnvironmentSummaryCard