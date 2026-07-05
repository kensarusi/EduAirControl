import { createContext, useContext, useState } from 'react'

const EnvironmentsContext = createContext()

const INITIAL_ENVIRONMENTS = [
  {
    id: 1,
    nameKey: 'management.env1',
    locationKey: 'locations.roomA',
    statusKey: 'dashboard.statusWarning',
    temp: 20.4, humidity: 32, co2: 1010, noise: 62,
    qualityKey: 'dashboard.qualityRegular',
    capacity: 30, isFavorite: false,
    floor: 'Piso 2', envType: 'Aula',
    tempMin: 18, tempMax: 24,
  },
  {
    id: 2,
    nameKey: 'management.env2',
    locationKey: 'locations.roomB',
    statusKey: 'dashboard.statusAlert',
    temp: 20.4, humidity: 32, co2: 1010, noise: 62,
    qualityKey: 'dashboard.qualityRegular',
    capacity: 25, isFavorite: false,
    floor: 'Piso 1', envType: 'Laboratorio',
    tempMin: 18, tempMax: 28,
  },
  {
    id: 3,
    nameKey: 'management.env3',
    locationKey: 'locations.roomC',
    statusKey: 'dashboard.statusWarning',
    temp: 20.4, humidity: 32, co2: 1010, noise: 62,
    qualityKey: 'dashboard.qualityRegular',
    capacity: 20, isFavorite: false,
    floor: 'Piso 1', envType: 'Aula',
    tempMin: 18, tempMax: 28,
  },
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
        name:        env.name,
        capacity:    env.capacity,
        location:    env.location,
        locationKey: null,
        floor:       env.floor   || '',
        envType:     env.envType || '',
        tempMin:     env.tempMin ?? 18,
        tempMax:     env.tempMax ?? 28,
        isFavorite: false,
        statusKey: 'dashboard.statusNormal',
        temp: 22, humidity: 49, co2: 1176, noise: 39,
        qualityKey: 'dashboard.qualityGood',
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