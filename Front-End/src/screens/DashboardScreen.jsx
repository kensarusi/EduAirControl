import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import FilterBar from '../components/common/FilterBar'
import EnvironmentCard from '../components/common/EnvironmentCard'
import '../styles/Dashboard.css'

function DashboardScreen() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [environments, setEnvironments] = useState([
    {
      id: 1,
      name: 'Ambiente de Formación 1',
      status: 'Advertencia',
      temp: 20.4,
      humidity: 32,
      co2: 1010,
      noise: 62,
      airQuality: 'Regular',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Ambiente de Formación 2',
      status: 'Alerta',
      temp: 20.4,
      humidity: 32,
      co2: 1010,
      noise: 62,
      airQuality: 'Regular',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Ambiente de Formación 3',
      status: 'Advertencia',
      temp: 20.4,
      humidity: 32,
      co2: 1010,
      noise: 62,
      airQuality: 'Regular',
      isFavorite: false
    }
  ])

  const handleToggleFavorite = (id, isFav) => {
    setEnvironments(environments.map(env =>
      env.id === id ? { ...env, isFavorite: isFav } : env
    ))
  }

  const filteredEnvironments = environments.filter(env => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'normal') return env.status === 'Normal'
    if (activeFilter === 'warning') return env.status === 'Advertencia'
    if (activeFilter === 'alert') return env.status === 'Alerta'
    return true
  })

  const counts = {
    normal: environments.filter(e => e.status === 'Normal').length,
    warning: environments.filter(e => e.status === 'Advertencia').length,
    alert: environments.filter(e => e.status === 'Alerta').length
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-page">
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          counts={counts}
        />
        <div className="environment-cards-container">
          {filteredEnvironments.map(env => (
            <EnvironmentCard
              key={env.id}
              environment={env}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen