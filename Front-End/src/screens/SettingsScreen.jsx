import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMoon, IoSunny, IoGlobe, IoCalendar, IoTime } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import Navbar from '../components/layout/Navbar'
import '../styles/Settings.css'

function SettingsScreen() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [autoTimezone, setAutoTimezone] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Navbar />
      <div className="settings-page">
        <h1>⚙️ Configuración</h1>

        {/* Apariencia */}
        <div className="settings-card">
          <h3>🎨 Apariencia</h3>

          <div className="settings-field">
            <div className="settings-field-icon">
              {darkMode ? <IoMoon /> : <IoSunny />}
            </div>
            <div className="settings-field-info">
              <span className="settings-field-label">Modo Oscuro</span>
              <span className="settings-field-value">
                {darkMode ? 'Activado' : 'Desactivado'}
              </span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Idioma y Fechas */}
        <div className="settings-card">
          <h3>🌐 Languages and Dates</h3>
          <p className="settings-card-description">
            Choose what language and date format to use throughout your account.
          </p>

          <div className="settings-field">
            <div className="settings-field-icon"><IoGlobe /></div>
            <div className="settings-field-info">
              <span className="settings-field-label">Language</span>
              <span className="settings-field-value">English</span>
            </div>
            <button className="btn-update"><MdEdit /> Update</button>
          </div>

          <div className="settings-field">
            <div className="settings-field-icon"><IoCalendar /></div>
            <div className="settings-field-info">
              <span className="settings-field-label">Date format</span>
              <span className="settings-field-value">DD-MM-YYYY</span>
            </div>
            <button className="btn-update"><MdEdit /> Update</button>
          </div>

          <div className="settings-field">
            <div className="settings-field-icon"><IoTime /></div>
            <div className="settings-field-info">
              <span className="settings-field-label">Automatic timezone</span>
              <span className="settings-field-value">
                {autoTimezone ? 'Activado' : 'Desactivado'}
              </span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={autoTimezone}
                onChange={() => setAutoTimezone(!autoTimezone)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsScreen