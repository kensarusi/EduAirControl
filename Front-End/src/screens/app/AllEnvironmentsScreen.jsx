import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/layout/Navbar'
import { BackButton } from '../../components/ui'
import { EnvironmentSummaryCard, EnvironmentFilters } from '../../components/environment'
import { STATUS } from '../../constants/environments'
import '../../styles/components/AllEnvironments.css'

const ENVIRONMENTS = [
  { nameKey: 'dashboard.env1', statusKey: STATUS.NORMAL,  co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityGood' },
  { nameKey: 'dashboard.env2', statusKey: STATUS.ALERT,   co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityBad' },
  { nameKey: 'dashboard.env3', statusKey: STATUS.WARNING, co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityRegular' },
]

function AllEnvironmentsScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [filters, setFilters] = useState({ name: '', co2: '', db: '', temp: '' })

  const filtered = ENVIRONMENTS.filter((env) =>
    t(env.nameKey).toLowerCase().includes(filters.name.toLowerCase()) &&
    env.co2.toLowerCase().includes(filters.co2.toLowerCase()) &&
    env.db.toLowerCase().includes(filters.db.toLowerCase()) &&
    env.temp.toLowerCase().includes(filters.temp.toLowerCase())
  )

  const normalCount  = filtered.filter((e) => e.statusKey === STATUS.NORMAL).length
  const warningCount = filtered.filter((e) => e.statusKey === STATUS.WARNING).length
  const alertCount   = filtered.filter((e) => e.statusKey === STATUS.ALERT).length

  return (
    <div className="all-env-page">
      <Navbar />
      <div className="all-env-container">
        <BackButton onClick={() => navigate('/dashboard')} />
        <h1 className="all-env-title">{t('allEnvironments.title')}</h1>

        <EnvironmentFilters filters={filters} setFilters={setFilters} />

        <div className="all-env-cards">
          {filtered.map((env) => (
            <EnvironmentSummaryCard key={env.nameKey} {...env} />
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
