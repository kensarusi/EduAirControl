import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import "./shared/styles/design-system.css";
import './shared/i18n/i18n.js'
import { EnvironmentProvider } from "./context/EnvironmentContext";
import GlobalAccessibilityProvider from "./shared/components/GlobalAccessibilityProvider/GlobalAccessibilityProvider";


// Restaurar tema daltónico + dark mode al cargar
const savedTheme = localStorage.getItem('theme') || ''
const darkMode   = JSON.parse(localStorage.getItem('darkMode')) || false
const classes    = [savedTheme, darkMode ? 'dark-mode' : ''].filter(Boolean).join(' ')
if (classes) document.body.className = classes

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EnvironmentProvider>
        <GlobalAccessibilityProvider>
          <App />
        </GlobalAccessibilityProvider>
      </EnvironmentProvider>
    </BrowserRouter>
  </React.StrictMode>
);