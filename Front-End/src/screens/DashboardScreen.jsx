import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import FilterBar from '../components/common/FilterBar'
import EnvironmentCard from '../components/common/EnvironmentCard'
import '../styles/Dashboard.css'

function DashboardScreen() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('')
  const [environments, setEnvironments] = useState([
    { id: 1, nameKey: 'dashboard.env1', statusKey: 'dashboard.statusWarning', temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular', isFavorite: false },
    { id: 2, nameKey: 'dashboard.env2', statusKey: 'dashboard.statusAlert', temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular', isFavorite: false },
    { id: 3, nameKey: 'dashboard.env3', statusKey: 'dashboard.statusWarning', temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular', isFavorite: false },
  ])

  const handleToggleFavorite = (id, isFav) => {
    setEnvironments(environments.map(env => env.id === id ? { ...env, isFavorite: isFav } : env))
  }

  const filteredEnvironments = environments.filter(env => {
    if (!activeFilter || activeFilter === 'all') return true
    if (activeFilter === 'normal') return env.statusKey === 'dashboard.statusNormal'
    if (activeFilter === 'warning') return env.statusKey === 'dashboard.statusWarning'
    if (activeFilter === 'alert') return env.statusKey === 'dashboard.statusAlert'
    return true
  })

  const counts = {
    normal: environments.filter(e => e.statusKey === 'dashboard.statusNormal').length,
    warning: environments.filter(e => e.statusKey === 'dashboard.statusWarning').length,
    alert: environments.filter(e => e.statusKey === 'dashboard.statusAlert').length,
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-page">
        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} counts={counts} />
        <div className="environment-cards-container">
          {filteredEnvironments.map(env => (
            <EnvironmentCard key={env.id} environment={env} onToggleFavorite={handleToggleFavorite} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen