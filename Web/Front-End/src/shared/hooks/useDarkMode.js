import { useState, useEffect } from "react";

/**
 * Aplica las clases al body preservando otras clases existentes.
 */
function applyBodyClasses(theme, dark) {
  // Elimina solo las clases que controla accesibilidad
  document.body.classList.remove(
    "theme-protanopia",
    "theme-deuteranopia",
    "theme-tritanopia",
    "dark-mode"
  );

  // Agrega nuevamente las necesarias
  if (theme) {
    document.body.classList.add(theme);
  }

  if (dark) {
    document.body.classList.add("dark-mode");
  }

  // Mantener sincronizado el atributo data-theme
  document.documentElement.setAttribute(
    "data-theme",
    dark ? "dark" : "light"
  );

  // Notificar cambios
  window.dispatchEvent(new CustomEvent("a11y-change"));
}

export function useDarkMode() {
  const [darkMode, setDarkModeState] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const setDarkMode = (val) => {
    const savedTheme = localStorage.getItem("theme") || "";

    localStorage.setItem("darkMode", JSON.stringify(val));

    applyBodyClasses(savedTheme, val);

    setDarkModeState(val);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "";

    applyBodyClasses(savedTheme, darkMode);
  }, []);

  return [darkMode, setDarkMode];
}