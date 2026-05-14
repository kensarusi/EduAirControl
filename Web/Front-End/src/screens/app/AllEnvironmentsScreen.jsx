import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoTrendingUp, IoTrendingDown, IoOptionsOutline } from 'react-icons/io5'
import { TiWarning } from 'react-icons/ti'
import { HiOutlineViewGrid } from 'react-icons/hi'

import Navbar from '../../components/layout/Navbar'
import EnvironmentSummaryCard from '../../components/environment/EnvironmentSummaryCard'
import EnvironmentFilters from '../../components/environment/EnvironmentFilters'
import { useEnvironments } from '../../context/EnvironmentsContext'
import '../../styles/app/AllEnvironments.css'

const STATUS_NORMAL = 'dashboard.statusNormal'
const STATUS_WARNING = 'dashboard.statusWarning'
const STATUS_ALERT = 'dashboard.statusAlert'

function AllEnvironmentsScreen() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const { environments } = useEnvironments()

  const [filters, setFilters] = useState({
    name: '',
    co2: null,
    noise: null,
    temp: null
  })

  const [activeStatus, setActiveStatus] = useState('')

  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return environments.filter((env) => {

      if (activeStatus && env.statusKey !== activeStatus) {
        return false
      }

      const envName = env.nameKey
        ? t(env.nameKey)
        : (env.name || '')

      if (
        filters.name &&
        !envName.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false
      }

      if (filters.co2) {
        if (filters.co2.min !== null && env.co2 < filters.co2.min) return false
        if (filters.co2.max !== null && env.co2 > filters.co2.max) return false
      }

      if (filters.noise) {
        if (filters.noise.min !== null && env.noise < filters.noise.min) return false
        if (filters.noise.max !== null && env.noise > filters.noise.max) return false
      }

      if (filters.temp) {
        if (filters.temp.min !== null && env.temp < filters.temp.min) return false
        if (filters.temp.max !== null && env.temp > filters.temp.max) return false
      }

      return true
    })
  }, [environments, filters, activeStatus, t])

  const counts = {
    normal: environments.filter(e => e.statusKey === STATUS_NORMAL).length,
    warning: environments.filter(e => e.statusKey === STATUS_WARNING).length,
    alert: environments.filter(e => e.statusKey === STATUS_ALERT).length,
  }

  const statusButtons = [
    {
      key: STATUS_NORMAL,
      label: t('dashboard.statusNormal'),
      count: counts.normal,
      color: '#238636',
      icon: <IoTrendingUp />
    },

    {
      key: STATUS_WARNING,
      label: t('dashboard.statusWarning'),
      count: counts.warning,
      color: '#d29922',
      icon: <TiWarning />
    },

    {
      key: STATUS_ALERT,
      label: t('dashboard.statusAlert'),
      count: counts.alert,
      color: '#da3633',
      icon: <IoTrendingDown />
    },
  ]

  return (
    <div className='all-env-page'>

      <Navbar />

      <div className='all-env-container'>

        <div className='all-env-header'>

          <div className='all-env-header-top'>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <HiOutlineViewGrid
                size={28}
                color="#3fb950"
              />

              <h1>
                {t('allEnvironments.title')}
              </h1>
            </div>

            <div className='top-status-row'>

              {statusButtons.map((btn) => (

                <div
                  key={btn.key}
                  className='top-status-badge'
                  style={{
                    borderColor: btn.color,
                    color: btn.color,
                    cursor: 'pointer',
                    opacity: activeStatus === btn.key ? 1 : 0.7
                  }}
                  onClick={() =>
                    setActiveStatus(
                      activeStatus === btn.key
                        ? ''
                        : btn.key
                    )
                  }
                >
                  {btn.icon}

                  <span>
                    {btn.count} {btn.label}
                  </span>

                </div>
              ))}

            </div>
          </div>

          <div className='all-env-header-bottom'>

            <div className='status-chips'>

              <button
                className={!activeStatus ? 'active' : ''}
                onClick={() => setActiveStatus('')}
              >
                {t('filters.all')}
              </button>

              <button
                className={activeStatus === STATUS_NORMAL ? 'active' : ''}
                onClick={() => setActiveStatus(STATUS_NORMAL)}
              >
                {t('dashboard.statusNormal')}
              </button>

              <button
                className={activeStatus === STATUS_WARNING ? 'active' : ''}
                onClick={() => setActiveStatus(STATUS_WARNING)}
              >
                {t('dashboard.statusWarning')}
              </button>

              <button
                className={activeStatus === STATUS_ALERT ? 'active' : ''}
                onClick={() => setActiveStatus(STATUS_ALERT)}
              >
                {t('dashboard.statusAlert')}
              </button>

            </div>

            <button
              className='filter-btn'
              onClick={() => setShowFilters(!showFilters)}
              style={{
                fontWeight: showFilters ? '600' : '500',
                color: showFilters ? '#3fb950' : '#8b949e'
              }}
            >
              <IoOptionsOutline />

              {showFilters
                ? t('allEnvironments.hideFilters')
                : t('allEnvironments.filters')
              }

            </button>
          </div>
        </div>

        {showFilters && (
          <div className='filters-section'>

            <EnvironmentFilters
              filters={filters}
              setFilters={setFilters}
              suggestions={
                environments
                  .map(env => {
                    if (env.name) return env.name
                    if (env.nameKey) return t(env.nameKey)
                    return ''
                  })
                  .filter(Boolean)
              }
            />

          </div>
        )}

        {filtered.length === 0 ? (

          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#8b949e',
              fontSize: '16px'
            }}
          >
            <p>
              {t('allEnvironments.noResults')}
            </p>
          </div>

        ) : (

          <div className='all-env-cards'>

            {filtered.map((env) => (

              <EnvironmentSummaryCard
                key={env.id}
                nameKey={env.nameKey}
                name={env.name}
                statusKey={env.statusKey}
                co2={env.co2 || 0}
                db={env.noise || 0}
                temp={env.temp || 0}
                humidity={env.humidity || 0}
                onClick={() =>
                  navigate('/environment/' + env.id)
                }
              />

            ))}

          </div>

        )}

      </div>
    </div>
  )
}

export default AllEnvironmentsScreen