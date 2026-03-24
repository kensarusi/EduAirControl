import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/layout/Navbar'
import { FilterBar, EnvironmentCard } from '../../components/environment'
import { useFavorites } from '../../hooks/useFavorites'
import { STATUS } from '../../constants/environments'
import '../../styles/app/Dashboard.css'

const INITIAL_ENVIRONMENTS = [
  { id: 1, nameKey: 'dashboard.env1', statusKey: STATUS.WARNING,  temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular' },
  { id: 2, nameKey: 'dashboard.env2', statusKey: STATUS.ALERT,    temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular' },
  { id: 3, nameKey: 'dashboard.env3', statusKey: STATUS.WARNING,  temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular' },
]

function DashboardScreen() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('')
  const { environments, toggleFavorite } = useFavorites(INITIAL_ENVIRONMENTS)

  const filtered = environments.filter((env) => {
    if (!activeFilter || activeFilter === 'all') return true
    if (activeFilter === 'normal')  return env.statusKey === STATUS.NORMAL
    if (activeFilter === 'warning') return env.statusKey === STATUS.WARNING
    if (activeFilter === 'alert')   return env.statusKey === STATUS.ALERT
    return true
  })

  const counts = {
    normal:  environments.filter((e) => e.statusKey === STATUS.NORMAL).length,
    warning: environments.filter((e) => e.statusKey === STATUS.WARNING).length,
    alert:   environments.filter((e) => e.statusKey === STATUS.ALERT).length,
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-page">
        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} counts={counts} />
        <div className="environment-cards-container">
          {filtered.map((env) => (
            <EnvironmentCard key={env.id} environment={env} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen
