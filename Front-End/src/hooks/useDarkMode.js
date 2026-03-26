import { useState, useEffect } from 'react'

/**
 * Hook para gestionar el modo oscuro con persistencia en localStorage.
 */
export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem('darkMode')) || false
  )

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  return [darkMode, setDarkMode]
}
