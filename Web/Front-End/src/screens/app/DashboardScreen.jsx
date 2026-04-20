import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/layout/Navbar'
import { FilterBar, EnvironmentCard } from '../../components/environment'
import { useEnvironments } from '../../context/EnvironmentsContext'
import { STATUS } from '../../constants/environments'
import '../../styles/app/Dashboard.css'

function DashboardScreen() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('')
  const { environments, toggleFavorite } = useEnvironments()

  const filtered = environments.filter((env) => {
    if (!activeFilter || activeFilter === 'all') return true
    if (activeFilter === 'normal')  return env.statusKey === 'dashboard.statusNormal'
    if (activeFilter === 'warning') return env.statusKey === 'dashboard.statusWarning'
    if (activeFilter === 'alert')   return env.statusKey === 'dashboard.statusAlert'
    return true
  })

  const counts = {
    normal:  environments.filter((e) => e.statusKey === 'dashboard.statusNormal').length,
    warning: environments.filter((e) => e.statusKey === 'dashboard.statusWarning').length,
    alert:   environments.filter((e) => e.statusKey === 'dashboard.statusAlert').length,
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