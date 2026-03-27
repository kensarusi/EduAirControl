import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGlobe, FaCalendar, FaClock, FaMoon, FaPalette } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import Navbar from '../../components/layout/Navbar'
import { EditModal } from '../../components/ui'
import { useDarkMode } from '../../hooks/useDarkMode'
import '../../styles/app/Settings.css'

function SettingsScreen() {
  const { t, i18n } = useTranslation()
  const [darkMode, setDarkMode] = useDarkMode()

  const [autoTimezone, setAutoTimezone] = useState(
    () => JSON.parse(localStorage.getItem('autoTimezone')) ?? true
  )

  const [settings, setSettings] = useState(
    () => JSON.parse(localStorage.getItem('settings')) || {
      language: 'English',
      dateFormat: 'DD-MM-YYYY'
    }
  )

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || ''
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [editField, setEditField] = useState('')
  const [editValue, setEditValue] = useState('')
  const [showLangModal, setShowLangModal] = useState(false)

  //  GUARDADOS
  useEffect(() => {
    localStorage.setItem('autoTimezone', JSON.stringify(autoTimezone))
  }, [autoTimezone])

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  //  APLICAR TEMA AL CARGAR
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.body.className = savedTheme
      setTheme(savedTheme)
    }
  }, [])

  //  EDITAR
  const handleEdit = (field, value) => {
    setEditField(field)
    setEditValue(value)
    setModalOpen(true)
  }

  const handleSave = (field, newValue) => {
    setSettings((prev) => ({ ...prev, [field]: newValue }))
  }

  //  IDIOMA
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)

    let languageName = 'English'
    if (lang === 'es') languageName = 'Español'
    if (lang === 'fr') languageName = 'Français'
    if (lang === 'pt') languageName = 'Português'

    setSettings((prev) => ({ ...prev, language: languageName }))
    setShowLangModal(false)
  }

  //  CAMBIAR TEMA
  const changeTheme = (newTheme) => {
    document.body.className = newTheme
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  return (
    <div className={`settings-page ${darkMode ? 'dark' : ''}`}>
      <Navbar />

      <div className="settings-content">
        <h1><IoSettings /> {t('settings.title')}</h1>

        {/*  APARIENCIA */}
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

          {/*  TEMAS DALTONISMO */}
          <div className="settings-field">
            <div className="field-icon"><FaPalette /></div>
            <div className="field-info">
              <span className="field-label">Temas accesibles</span>
              <span className="field-value">{theme || 'Default'}</span>
            </div>
          </div>

          <div className="theme-buttons">
            <button onClick={() => changeTheme('')}>
              Normal
            </button>

            <button onClick={() => changeTheme('theme-protanopia')}>
              Protanopia
            </button>

            <button onClick={() => changeTheme('theme-deuteranopia')}>
              Deuteranopia
            </button>

            <button onClick={() => changeTheme('theme-tritanopia')}>
              Tritanopia
            </button>
          </div>
        </div>

        {/*  IDIOMA Y FECHAS */}
        <div className="settings-card">
          <h2><FaGlobe /> {t('settings.langAndDates')}</h2>
          <p className="section-description">{t('settings.langDescription')}</p>

          {/* IDIOMA */}
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

          {/* FECHA */}
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

          {/* ZONA HORARIA */}
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
              onClick={() => setAutoTimezone(!autoTimezone)}
            >
              <div className="toggle-circle" />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EDIT */}
      {modalOpen && (
        <EditModal
          field={editField}
          value={editValue}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/*  MODAL IDIOMA */}
      {showLangModal && (
        <div className="lang-modal-overlay" onClick={() => setShowLangModal(false)}>
          <div className="lang-modal" onClick={(e) => e.stopPropagation()}>
            <h3> {t('settings.language')}</h3>

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