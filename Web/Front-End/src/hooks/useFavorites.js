import { useState } from 'react'

/**
 * Hook para gestionar ambientes favoritos en localStorage.
 * @param {Array} initialEnvironments - Lista inicial de ambientes
 */
export function useFavorites(initialEnvironments) {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []

  const [environments, setEnvironments] = useState(
    initialEnvironments.map((env) => ({
      ...env,
      isFavorite: savedFavorites.some((f) => f.id === env.id),
    }))
  )

  const toggleFavorite = (id, isFav) => {
    const updated = environments.map((env) =>
      env.id === id ? { ...env, isFavorite: isFav } : env
    )
    setEnvironments(updated)
    localStorage.setItem('favorites', JSON.stringify(updated.filter((e) => e.isFavorite)))
  }

  return { environments, toggleFavorite }
}
