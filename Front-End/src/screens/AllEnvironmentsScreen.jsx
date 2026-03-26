import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import BackButton from '../components/common/BackButton'
import EnvironmentSummaryCard from '../components/common/EnvironmentSummaryCard'
import EnvironmentFilters from '../components/common/EnvironmentFilters'
import '../styles/AllEnvironments.css'
import { useState } from 'react'

function AllEnvironmentsScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  //  ESTADO DE FILTROS
  const [filters, setFilters] = useState({
    name: '',
    co2: '',
    db: '',
    temp: ''
  })

  const environments = [
    { nameKey: 'dashboard.env1', statusKey: 'dashboard.statusNormal', co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityGood' },
    { nameKey: 'dashboard.env2', statusKey: 'dashboard.statusAlert', co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityBad' },
    { nameKey: 'dashboard.env3', statusKey: 'dashboard.statusWarning', co2: '1176 ppm', db: '39', temp: '22°', humidity: '49%', qualityKey: 'dashboard.qualityRegular' },
  ]

  //  FILTRADO
  const filteredEnvironments = environments.filter(env =>
    t(env.nameKey).toLowerCase().includes(filters.name.toLowerCase()) &&
    env.co2.toLowerCase().includes(filters.co2.toLowerCase()) &&
    env.db.toLowerCase().includes(filters.db.toLowerCase()) &&
    env.temp.toLowerCase().includes(filters.temp.toLowerCase())
  )

  // (opcional: counts con filtrado o sin filtrado)
  const normalCount = filteredEnvironments.filter(e => e.statusKey === 'dashboard.statusNormal').length
  const warningCount = filteredEnvironments.filter(e => e.statusKey === 'dashboard.statusWarning').length
  const alertCount = filteredEnvironments.filter(e => e.statusKey === 'dashboard.statusAlert').length

  return (
    <div className="all-env-page">
      <Navbar />
      <div className="all-env-container">
        <BackButton onClick={() => navigate('/dashboard')} />
        <h1 className="all-env-title">{t('allEnvironments.title')}</h1>

        {/*FILTROS */}
        <EnvironmentFilters filters={filters} setFilters={setFilters} />

        {/*LISTA FILTRADA */}
        <div className="all-env-cards">
          {filteredEnvironments.map((env) => (
            <EnvironmentSummaryCard key={env.nameKey} {...env} />
          ))}
        </div>

        {/*RESUMEN */}
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