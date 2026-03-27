import { useState, useEffect } from 'react'

/**
 * Aplica las clases al body combinando tema daltónico + dark mode.
 * El orden importa: primero el tema, luego dark-mode.
 */
function applyBodyClasses(theme, dark) {
  const classes = [theme, dark ? 'dark-mode' : ''].filter(Boolean).join(' ')
  document.body.className = classes
}

/**
 * Hook para gestionar el modo oscuro con persistencia en localStorage.
 * Preserva el tema daltónico activo al cambiar el modo.
 */
export function useDarkMode() {
  const [darkMode, setDarkModeState] = useState(
    () => JSON.parse(localStorage.getItem('darkMode')) || false
  )

  const setDarkMode = (val) => {
    const savedTheme = localStorage.getItem('theme') || ''
    localStorage.setItem('darkMode', JSON.stringify(val))
    applyBodyClasses(savedTheme, val)
    setDarkModeState(val)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || ''
    applyBodyClasses(savedTheme, darkMode)
  }, [])

  return [darkMode, setDarkMode]
}