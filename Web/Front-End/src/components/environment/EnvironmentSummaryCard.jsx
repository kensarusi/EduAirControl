import '../../styles/app/AllEnvironments.css'
import { useTranslation } from 'react-i18next'

function EnvironmentSummaryCard({
  name,
  nameKey,
  statusKey,
  co2,
  db,
  temp,
  humidity,
  onClick
}) {
  const { t } = useTranslation()

  const getStatusStyle = () => {
    switch (statusKey) {
      case 'dashboard.statusNormal':
        return {
          color: '#3fb950',
          text: t('dashboard.statusNormal'),
          bg: '#3fb9501a'
        }

      case 'dashboard.statusWarning':
        return {
          color: '#d29922',
          text: t('dashboard.statusWarning'),
          bg: '#d299221a'
        }

      case 'dashboard.statusAlert':
        return {
          color: '#f85149',
          text: t('dashboard.statusAlert'),
          bg: '#f851491a'
        }

      default:
        return {
          color: '#8b949e',
          text: t('common.unknown'),
          bg: '#8b949e1a'
        }
    }
  }

  const status = getStatusStyle()

  const displayName = nameKey
    ? t(nameKey)
    : (name || t('common.noName'))

  return (
    <div className='summary-card' onClick={onClick}>

      <div
        className='summary-card-status-bar'
        style={{ backgroundColor: status.color }}
      />

      <div className='summary-card-header'>
        <div className='summary-card-header-left'>

          <h3>{displayName}</h3>

          <span
            className='summary-status'
            style={{
              color: status.color,
              backgroundColor: status.bg
            }}
          >
            {status.text}
          </span>

        </div>
      </div>

      <div className='summary-card-grid'>

        <div className='summary-item'>
          <span className='summary-label'>
            {t('allEnvironments.co2')}
          </span>

          <span className='summary-value'>
            {co2} ppm
          </span>
        </div>

        <div className='summary-item'>
          <span className='summary-label'>
            {t('allEnvironments.db')}
          </span>

          <span className='summary-value'>
            {db}
          </span>
        </div>

        <div className='summary-item'>
          <span className='summary-label'>
            {t('allEnvironments.temp')}
          </span>

          <span className='summary-value'>
            {temp}°
          </span>
        </div>

        <div className='summary-item'>
          <span className='summary-label'>
            {t('allEnvironments.humidity')}
          </span>

          <span className='summary-value'>
            {humidity}%
          </span>
        </div>

      </div>
    </div>
  )
}

export default EnvironmentSummaryCard