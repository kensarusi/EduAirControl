import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './styles/design-system.css'
import './i18n/i18n.js'
import { EnvironmentsProvider } from './context/EnvironmentsContext'

// Restaurar tema daltónico + dark mode al cargar
const savedTheme = localStorage.getItem('theme') || ''
const darkMode   = JSON.parse(localStorage.getItem('darkMode')) || false
const classes    = [savedTheme, darkMode ? 'dark-mode' : ''].filter(Boolean).join(' ')
if (classes) document.body.className = classes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EnvironmentsProvider>
        <App />
      </EnvironmentsProvider>
    </BrowserRouter>
  </React.StrictMode>
)