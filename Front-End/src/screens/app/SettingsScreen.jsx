import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGlobe, FaCalendar, FaClock, FaMoon, FaPalette, FaMapMarkerAlt } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import Navbar from '../../components/layout/Navbar'
import { EditModal } from '../../components/ui'
import { useDarkMode } from '../../hooks/useDarkMode'
import { saveDateFormat } from '../../hooks/useDateFormat'
import '../../styles/app/Settings.css'

const TIMEZONES = [
  { value: 'America/Bogota',      label: 'Bogotá (UTC-5)' },
  { value: 'America/Lima',        label: 'Lima (UTC-5)' },
  { value: 'America/Mexico_City', label: 'Ciudad de México (UTC-6)' },
  { value: 'America/New_York',    label: 'Nueva York (UTC-5/-4)' },
  { value: 'America/Los_Angeles', label: 'Los Ángeles (UTC-8/-7)' },
  { value: 'America/Sao_Paulo',   label: 'São Paulo (UTC-3)' },
  { value: 'America/Santiago',    label: 'Santiago (UTC-4/-3)' },
  { value: 'Europe/London',       label: 'Londres (UTC+0/+1)' },
  { value: 'Europe/Madrid',       label: 'Madrid (UTC+1/+2)' },
  { value: 'Europe/Paris',        label: 'París (UTC+1/+2)' },
  { value: 'Asia/Tokyo',          label: 'Tokio (UTC+9)' },
  { value: 'Asia/Dubai',          label: 'Dubái (UTC+4)' },
  { value: 'Australia/Sydney',    label: 'Sídney (UTC+10/+11)' },
]

// Aplica tema + dark-mode al body (misma lógica que useDarkMode y main.jsx)
function applyBodyClasses(theme, dark) {
  const classes = [theme, dark ? 'dark-mode' : ''].filter(Boolean).join(' ')
  document.body.className = classes
}

const THEMES = [
  { key: '',                   dot: { light: '#5de6c8', dark: '#3ab8a0' } },
  { key: 'theme-protanopia',   dot: { light: '#0072b2', dark: '#4aa8d8' } },
  { key: 'theme-deuteranopia', dot: { light: '#E69F00', dark: '#c8880a' } },
  { key: 'theme-tritanopia',   dot: { light: '#D55E00', dark: '#e8743a' } },
]

function SettingsScreen() {
  const { t, i18n } = useTranslation()
  const [darkMode, setDarkMode] = useDarkMode()

  const [autoTimezone, setAutoTimezone] = useState(
    () => JSON.parse(localStorage.getItem('autoTimezone')) ?? true
  )

  const [manualTimezone, setManualTimezone] = useState(
    () => localStorage.getItem('manualTimezone') || Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  const handleTimezoneToggle = (val) => {
    setAutoTimezone(val)
    const tz = val
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : manualTimezone
    window.dispatchEvent(new CustomEvent('timezoneChanged', { detail: tz }))
  }

  const handleManualTimezone = (tz) => {
    setManualTimezone(tz)
    localStorage.setItem('manualTimezone', tz)
    window.dispatchEvent(new CustomEvent('timezoneChanged', { detail: tz }))
  }

  const [settings, setSettings] = useState(
    () => JSON.parse(localStorage.getItem('settings')) || {
      language: 'English',
      dateFormat: 'DD-MM-YYYY'
    }
  )

  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || ''
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [editField, setEditField] = useState('')
  const [editValue, setEditValue] = useState('')
  const [showLangModal, setShowLangModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('autoTimezone', JSON.stringify(autoTimezone))
  }, [autoTimezone])

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  const changeTheme = (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyBodyClasses(newTheme, darkMode)
    setTheme(newTheme)
  }

  const handleEdit = (field, value) => {
    setEditField(field)
    setEditValue(value)
    setModalOpen(true)
  }

  const handleSave = (field, newValue) => {
    setSettings((prev) => ({ ...prev, [field]: newValue }))
    if (field === 'dateFormat') saveDateFormat(newValue)
  }

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)

    const names = { es: 'Español', en: 'English', fr: 'Français', pt: 'Português' }
    setSettings((prev) => ({ ...prev, language: names[lang] || 'English' }))
    setShowLangModal(false)
  }

  const themeLabel = (key) => {
    if (key === '')                   return t('settings.themeNormal')
    if (key === 'theme-protanopia')   return t('settings.themeProtanopia')
    if (key === 'theme-deuteranopia') return t('settings.themeDeuteranopia')
    return t('settings.themeTritanopia')
  }

  return (
    <div className={`settings-page ${darkMode ? 'dark' : ''}`}>
      <Navbar />

      <div className="settings-content">
        <h1><IoSettings /> {t('settings.title')}</h1>

        {/* APARIENCIA */}
        <div className="settings-card">
          <h2><FaPalette /> {t('settings.appearance')}</h2>

          {/* DARK MODE */}
          <div className="settings-field">
            <div className="field-icon"><FaMoon /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.darkMode')}</span>
              <span className="field-value">
                {darkMode ? t('settings.enabled') : t('settings.disabled')}
              </span>
            </div>
            <div
              className={`toggle ${darkMode ? 'active' : ''}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div className="toggle-circle" />
            </div>
          </div>

          {/* TEMAS ACCESIBLES */}
          <div className="settings-field theme-field">
            <div className="field-icon"><FaPalette /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.accessibleThemes')}</span>
              <span className="field-value">{themeLabel(theme)}</span>
            </div>
          </div>

          <div className="theme-picker">
            {THEMES.map(({ key, dot }) => (
              <button
                key={key}
                className={`theme-card ${theme === key ? 'theme-card--active' : ''}`}
                onClick={() => changeTheme(key)}
              >
                <div className="theme-preview">
                  <div
                    className="preview-bar"
                    style={{ background: darkMode ? dot.dark : dot.light }}
                  />
                  <div className="preview-text">
                    <span className="preview-line" />
                    <span className="preview-line short" />
                  </div>
                </div>
                <span className="theme-label">{themeLabel(key)}</span>
                {theme === key && <span className="theme-check">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* IDIOMA Y FECHAS */}
        <div className="settings-card">
          <h2><FaGlobe /> {t('settings.langAndDates')}</h2>
          <p className="section-description">{t('settings.langDescription')}</p>

          <div className="settings-field">
            <div className="field-icon"><FaGlobe /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.language')}</span>
              <span className="field-value">{settings.language}</span>
            </div>
            <button className="btn-update" onClick={() => setShowLangModal(true)}>
              <MdEdit /> {t('settings.updateBtn')}
            </button>
          </div>

          <div className="settings-field">
            <div className="field-icon"><FaCalendar /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.dateFormat')}</span>
              <span className="field-value">{settings.dateFormat}</span>
            </div>
            <button
              className="btn-update"
              onClick={() => handleEdit('dateFormat', settings.dateFormat)}
            >
              <MdEdit /> {t('settings.updateBtn')}
            </button>
          </div>

          <div className="settings-field">
            <div className="field-icon"><FaClock /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.autoTimezone')}</span>
              <span className="field-value">
                {autoTimezone ? t('settings.enabled') : t('settings.disabled')}
              </span>
            </div>
            <div
              className={`toggle ${autoTimezone ? 'active' : ''}`}
              onClick={() => handleTimezoneToggle(!autoTimezone)}
            >
              <div className="toggle-circle" />
            </div>
          </div>

          {!autoTimezone && (
            <div className="settings-field">
              <div className="field-icon"><FaMapMarkerAlt /></div>
              <div className="field-info">
                <span className="field-label">{t('Selecciona la Hora de tu preferencia')}</span>
                <select
                  className="timezone-select"
                  value={manualTimezone}
                  onChange={(e) => handleManualTimezone(e.target.value)}
                >
                  {TIMEZONES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <EditModal
          field={editField}
          value={editValue}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      {showLangModal && (
        <div className="lang-modal-overlay" onClick={() => setShowLangModal(false)}>
          <div className="lang-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{t('settings.language')}</h3>
            <button onClick={() => handleChangeLanguage('es')}>🇨🇴 Español</button>
            <button onClick={() => handleChangeLanguage('en')}>🇺🇸 English</button>
            <button onClick={() => handleChangeLanguage('fr')}>🇫🇷 Français</button>
            <button onClick={() => handleChangeLanguage('pt')}>🇧🇷 Português</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsScreen