import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './i18n/i18n.js'

// Restaurar dark mode al cargar
const darkMode = JSON.parse(localStorage.getItem('darkMode'))
if (darkMode) {
  document.body.classList.add('dark-mode')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)