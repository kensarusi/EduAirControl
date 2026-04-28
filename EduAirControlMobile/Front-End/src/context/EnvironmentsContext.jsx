import { createContext, useContext, useState } from 'react'
import { STATUS, QUALITY } from '../constants/environments'

const EnvironmentsContext = createContext()

const INITIAL_ENVIRONMENTS = [
  {
    id: 1,
    name: 'Laboratorio de Computación',
    status: STATUS.WARNING,
    temp: 20.4,
    humidity: 32,
    co2: 1010,
    noise: 62,
    quality: QUALITY.REGULAR,
    capacity: 30,
    location: 'Bloque A - Piso 2',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Aula Magna',
    status: STATUS.ALERT,
    temp: 27.1,
    humidity: 55,
    co2: 1450,
    noise: 78,
    quality: QUALITY.BAD,
    capacity: 200,
    location: 'Bloque B - Piso 1',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Sala de Profesores',
    status: STATUS.NORMAL,
    temp: 22.0,
    humidity: 48,
    co2: 720,
    noise: 35,
    quality: QUALITY.GOOD,
    capacity: 20,
    location: 'Bloque C - Piso 3',
    isFavorite: true,
  },
  {
    id: 4,
    name: 'Biblioteca',
    status: STATUS.NORMAL,
    temp: 21.5,
    humidity: 45,
    co2: 850,
    noise: 28,
    quality: QUALITY.GOOD,
    capacity: 80,
    location: 'Bloque D - Piso 1',
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Salón 101',
    status: STATUS.WARNING,
    temp: 25.3,
    humidity: 38,
    co2: 1100,
    noise: 55,
    quality: QUALITY.REGULAR,
    capacity: 35,
    location: 'Bloque A - Piso 1',
    isFavorite: false,
  },
]

export function EnvironmentsProvider({ children }) {
  const [environments, setEnvironments] = useState(INITIAL_ENVIRONMENTS)

  const toggleFavorite = (id) => {
    setEnvironments((prev) =>
      prev.map((env) => env.id === id ? { ...env, isFavorite: !env.isFavorite } : env)
    )
  }

  const addEnvironment = (env) => {
    setEnvironments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: env.name,
        capacity: env.capacity,
        location: env.location,
        isFavorite: false,
        status: STATUS.NORMAL,
        temp: 22,
        humidity: 49,
        co2: 800,
        noise: 39,
        quality: QUALITY.GOOD,
      },
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
    <EnvironmentsContext.Provider
      value={{ environments, toggleFavorite, addEnvironment, editEnvironment, deleteEnvironment }}
    >
      {children}
    </EnvironmentsContext.Provider>
  )
}

export function useEnvironments() {
  return useContext(EnvironmentsContext)
}