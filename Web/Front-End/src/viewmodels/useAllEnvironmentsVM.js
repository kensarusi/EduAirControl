/**
 * ViewModel: useAllEnvironmentsVM
 * Lógica de filtros, búsqueda y conteos para AllEnvironmentsScreen.
 */

import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useEnvironments } from '../modules/environment/context/EnvironmentsContext'

export function useAllEnvironmentsVM() {
  const { t } = useTranslation()
  const { environments } = useEnvironments()

  const [filters, setFilters] = useState({
    name:  '',
    co2:   null,
    noise: null,
    temp:  null,
  })
  const [activeStatus, setActiveStatus] = useState('')
  const [showFilters,  setShowFilters]  = useState(false)

  const filtered = useMemo(() => {
    return environments.filter((env) => {
      if (activeStatus && env.statusKey !== activeStatus) return false

      const envName = env.nameKey ? t(env.nameKey) : (env.name || '')
      if (filters.name && !envName.toLowerCase().includes(filters.name.toLowerCase()))
        return false

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

  const counts = useMemo(() => ({
    normal:  environments.filter((e) => e.statusKey === 'dashboard.statusNormal').length,
    warning: environments.filter((e) => e.statusKey === 'dashboard.statusWarning').length,
    alert:   environments.filter((e) => e.statusKey === 'dashboard.statusAlert').length,
  }), [environments])

  const nameSuggestions = useMemo(() =>
    environments
      .map((env) => (env.name || (env.nameKey ? t(env.nameKey) : '')))
      .filter(Boolean),
    [environments, t]
  )

  const toggleStatus = (key) =>
    setActiveStatus((prev) => (prev === key ? '' : key))

  return {
    filtered,
    counts,
    filters,
    setFilters,
    activeStatus,
    toggleStatus,
    showFilters,
    setShowFilters,
    nameSuggestions,
  }
}
