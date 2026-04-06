import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/layout/Navbar'
import { BackButton } from '../../components/ui'
import { EnvironmentSummaryCard, EnvironmentFilters } from '../../components/environment'
import { useEnvironments } from '../../context/EnvironmentsContext'
import '../../styles/components/AllEnvironments.css'

const STATUS_NORMAL  = 'dashboard.statusNormal'
const STATUS_WARNING = 'dashboard.statusWarning'
const STATUS_ALERT   = 'dashboard.statusAlert'

function AllEnvironmentsScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { environments } = useEnvironments()

  const [filters, setFilters] = useState({ name: '', co2: '', db: '', temp: '' })

  // Mapear ambientes del contexto al formato que necesita esta pantalla
  const mapped = environments.map((env) => ({
    id: env.id,
    nameKey: env.nameKey,
    name: env.name,
    statusKey: env.statusKey,
    co2: env.co2 ? `${env.co2} ppm` : '0 ppm',
    db: env.noise ? `${env.noise}` : '0',
    temp: env.temp ? `${env.temp}°` : '0°',
    humidity: env.humidity ? `${env.humidity}%` : '0%',
    qualityKey: env.qualityKey,
  }))

  const suggestions = mapped.map((env) => env.nameKey ? t(env.nameKey) : env.name)

  const filtered = mapped.filter((env) => {
    const envName = env.nameKey ? t(env.nameKey) : env.name
    return (
      envName.toLowerCase().includes(filters.name.toLowerCase()) &&
      env.co2.toLowerCase().includes(filters.co2.toLowerCase()) &&
      env.db.toLowerCase().includes(filters.db.toLowerCase()) &&
      env.temp.toLowerCase().includes(filters.temp.toLowerCase())
    )
  })

  const hasActiveFilter = filters.name || filters.co2 || filters.db || filters.temp
  const isEmpty = filtered.length === 0

  const normalCount  = filtered.filter((e) => e.statusKey === STATUS_NORMAL).length
  const warningCount = filtered.filter((e) => e.statusKey === STATUS_WARNING).length
  const alertCount   = filtered.filter((e) => e.statusKey === STATUS_ALERT).length

  return (
    <div className="all-env-page">
      <Navbar />
      <div className="all-env-container">
        <BackButton onClick={() => navigate('/dashboard')} />
        <h1 className="all-env-title">{t('allEnvironments.title')}</h1>

        <EnvironmentFilters
          filters={filters}
          setFilters={setFilters}
          suggestions={suggestions}
        />

        {isEmpty && hasActiveFilter ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <p className="no-results-title">No se encontraron resultados</p>
            <p className="no-results-sub">Intenta con otro término de búsqueda</p>
            <button className="no-results-clear" onClick={() => setFilters({ name: '', co2: '', db: '', temp: '' })}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="all-env-cards">
              {filtered.map((env) => (
                <EnvironmentSummaryCard key={env.id} {...env} />
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
          </>
        )}
      </div>
    </div>
  )
}

export default AllEnvironmentsScreen