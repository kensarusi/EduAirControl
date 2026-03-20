import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import BackButton from '../components/common/BackButton'
import EnvironmentSummaryCard from '../components/common/EnvironmentSummaryCard'
import '../styles/AllEnvironments.css'

function AllEnvironmentsScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const environments = [
    { nameKey: 'dashboard.env1', statusKey: 'dashboard.statusNormal', co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityGood' },
    { nameKey: 'dashboard.env2', statusKey: 'dashboard.statusAlert', co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityBad' },
    { nameKey: 'dashboard.env3', statusKey: 'dashboard.statusWarning', co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityRegular' },
  ]

  const normalCount = environments.filter(e => e.statusKey === 'dashboard.statusNormal').length
  const warningCount = environments.filter(e => e.statusKey === 'dashboard.statusWarning').length
  const alertCount = environments.filter(e => e.statusKey === 'dashboard.statusAlert').length

  return (
    <div className="all-env-page">
      <Navbar />
      <div className="all-env-container">
        <BackButton onClick={() => navigate('/dashboard')} />
        <h1 className="all-env-title">{t('allEnvironments.title')}</h1>

        <div className="all-env-headers">
          <span>{t('allEnvironments.ambiente')}</span>
          <span>CO2</span>
          <span>dB</span>
          <span>Temp</span>
        </div>

        <div className="all-env-cards">
          {environments.map((env, index) => (
            <EnvironmentSummaryCard key={index} {...env} />
          ))}
        </div>

        <div className="all-env-summary">
          <div className="summary-badge normal">
            <span>{t('allEnvironments.statusNormal')}</span>
            <strong>{normalCount}</strong>
          </div>
          <div className="summary-badge warning">
            <span>{t('allEnvironments.statusWarning')}</span>
            <strong>{warningCount}</strong>
          </div>
          <div className="summary-badge alert">
            <span>{t('allEnvironments.statusAlert')}</span>
            <strong>{alertCount}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllEnvironmentsScreen