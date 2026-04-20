import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoTrendingUp, IoTrendingDown } from 'react-icons/io5'
import { TiWarning } from 'react-icons/ti'
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
  const [activeStatus, setActiveStatus] = useState('')

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
    const matchesText =
      envName.toLowerCase().includes(filters.name.toLowerCase()) &&
      env.co2.toLowerCase().includes(filters.co2.toLowerCase()) &&
      env.db.toLowerCase().includes(filters.db.toLowerCase()) &&
      env.temp.toLowerCase().includes(filters.temp.toLowerCase())
    const matchesStatus = !activeStatus || env.statusKey === activeStatus
    return matchesText && matchesStatus
  })

  const hasActiveFilter = filters.name || filters.co2 || filters.db || filters.temp
  const isEmpty = filtered.length === 0

  const normalCount  = mapped.filter((e) => e.statusKey === STATUS_NORMAL).length
  const warningCount = mapped.filter((e) => e.statusKey === STATUS_WARNING).length
  const alertCount   = mapped.filter((e) => e.statusKey === STATUS_ALERT).length

  const statusButtons = [
    { key: STATUS_NORMAL,  label: t('allEnvironments.statusNormal'),  count: normalCount,  color: '#4CAF50', icon: <IoTrendingUp /> },
    { key: STATUS_WARNING, label: t('allEnvironments.statusWarning'), count: warningCount, color: '#FFC107', icon: <TiWarning /> },
    { key: STATUS_ALERT,   label: t('allEnvironments.statusAlert'),   count: alertCount,   color: '#F44336', icon: <IoTrendingDown /> },
  ]

  const handleStatusClick = (key) => {
    setActiveStatus((prev) => prev === key ? '' : key)
  }

  return (
    <div className="all-env-page">
      <Navbar />
      <div className="all-env-container">
        <BackButton onClick={() => navigate('/dashboard')} />
        <h1 className="all-env-title">{t('allEnvironments.title')}</h1>

        <div className="all-env-status-bar">
          {statusButtons.map((btn) => (
            <button
              key={btn.key}
              className={`all-env-status-btn ${activeStatus === btn.key ? 'active' : ''}`}
              onClick={() => handleStatusClick(btn.key)}
              style={{
                borderColor: activeStatus === btn.key ? btn.color : undefined,
                backgroundColor: activeStatus === btn.key ? `${btn.color}15` : undefined,
              }}
            >
              <div className="all-env-status-info">
                <span className="all-env-status-label">{btn.label}</span>
                <span className="all-env-status-count" style={{ color: btn.color }}>
                  {btn.count}
                </span>
              </div>
              <div className="all-env-status-icon" style={{ color: btn.color }}>
                {btn.icon}
              </div>
            </button>
          ))}
        </div>

        <EnvironmentFilters
          filters={filters}
          setFilters={setFilters}
          suggestions={suggestions}
        />

        {isEmpty && (hasActiveFilter || activeStatus) ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <p className="no-results-title">No se encontraron resultados</p>
            <p className="no-results-sub">Intenta con otro término de búsqueda</p>
            <button
              className="no-results-clear"
              onClick={() => { setFilters({ name: '', co2: '', db: '', temp: '' }); setActiveStatus('') }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="all-env-cards">
            {filtered.map((env) => (
              <EnvironmentSummaryCard
                key={env.id}
                {...env}
                onClick={() => navigate(`/environment/${env.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllEnvironmentsScreen