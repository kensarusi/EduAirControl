import { createContext, useContext, useState } from 'react'

const EnvironmentsContext = createContext()

const INITIAL_ENVIRONMENTS = [
  { id: 1, nameKey: 'management.env1', statusKey: 'dashboard.statusWarning', temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular', capacity: 30, location: 'Room A', isFavorite: false },
  { id: 2, nameKey: 'management.env2', statusKey: 'dashboard.statusAlert',   temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular', capacity: 25, location: 'Room B', isFavorite: false },
  { id: 3, nameKey: 'management.env3', statusKey: 'dashboard.statusWarning', temp: 20.4, humidity: 32, co2: 1010, noise: 62, qualityKey: 'dashboard.qualityRegular', capacity: 20, location: 'Room C', isFavorite: false },
]

export function EnvironmentsProvider({ children }) {
  const [environments, setEnvironments] = useState(INITIAL_ENVIRONMENTS)

  const toggleFavorite = (id, isFav) => {
    setEnvironments((prev) =>
      prev.map((env) => env.id === id ? { ...env, isFavorite: isFav } : env)
    )
  }

const addEnvironment = (env) => {
  setEnvironments((prev) => [
    ...prev,
    {
      id: Date.now(),
      nameKey: null,
      name: env.name,
      capacity: env.capacity,
      location: env.location,
      isFavorite: false,
      statusKey: 'dashboard.statusNormal',
      temp: 22,           // ← valor estático por defecto
      humidity: 49,       // ← valor estático por defecto
      co2: 1176,          // ← valor estático por defecto
      noise: 39,          // ← valor estático por defecto
      qualityKey: 'dashboard.qualityGood'
    }
  ])
}

  const editEnvironment = (id, data) => {
    setEnvironments((prev) =>
      prev.map((env) => env.id === id ? { ...env, ...data } : env)
    )
  }

  const deleteEnvironment = (id) => {
    setEnvironments((prev) => prev.filter((env) => env.id !== id))
  }

  return (
    <EnvironmentsContext.Provider value={{ environments, toggleFavorite, addEnvironment, editEnvironment, deleteEnvironment }}>
      {children}
    </EnvironmentsContext.Provider>
  )
}

export function useEnvironments() {
  return useContext(EnvironmentsContext)
}