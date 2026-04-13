import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGlobe, FaCalendar, FaClock, FaMoon, FaPalette, FaMapMarkerAlt, FaBell, FaShieldAlt, FaQuestionCircle, FaChevronRight, FaLock, FaEye, FaTrash } from 'react-icons/fa'
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
  const [reminders, setReminders] = useState(() =>
    JSON.parse(localStorage.getItem('reminders')) || {
      alertas: true, advertencias: true, resumenDiario: false, sonido: true,
    }
  )
  const [privacy, setPrivacy] = useState(() =>
    JSON.parse(localStorage.getItem('privacy')) || {
      perfilPublico: false, compartirDatos: false,
    }
  )
  const [settings, setSettings] = useState(
    () => JSON.parse(localStorage.getItem('settings')) || { language: 'English', dateFormat: 'DD-MM-YYYY' }
  )
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '')
  const [modalOpen, setModalOpen] = useState(false)
  const [editField, setEditField] = useState('')
  const [editValue, setEditValue] = useState('')
  const [showLangModal, setShowLangModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [helpModal, setHelpModal] = useState({ open: false, type: null })
  const [showPasswordModal, setShowPasswordModal] = useState(false)
const [passwordData, setPasswordData] = useState({
  current: '',
  new: '',
  confirm: ''
})

  useEffect(() => { localStorage.setItem('autoTimezone', JSON.stringify(autoTimezone)) }, [autoTimezone])
  useEffect(() => { localStorage.setItem('settings', JSON.stringify(settings)) }, [settings])
  useEffect(() => { localStorage.setItem('reminders', JSON.stringify(reminders)) }, [reminders])
  useEffect(() => { localStorage.setItem('privacy', JSON.stringify(privacy)) }, [privacy])

  const handleTimezoneToggle = (val) => {
    setAutoTimezone(val)
    const tz = val ? Intl.DateTimeFormat().resolvedOptions().timeZone : manualTimezone
    window.dispatchEvent(new CustomEvent('timezoneChanged', { detail: tz }))
  }
  const handleManualTimezone = (tz) => {
    setManualTimezone(tz)
    localStorage.setItem('manualTimezone', tz)
    window.dispatchEvent(new CustomEvent('timezoneChanged', { detail: tz }))
  }
  const changeTheme = (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyBodyClasses(newTheme, darkMode)
    setTheme(newTheme)
  }
  const handleEdit = (field, value) => { setEditField(field); setEditValue(value); setModalOpen(true) }
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

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ 
      ...prev,
      [field]: value
    }))
  }

  const handleSavePassword = () => {
  if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
    alert('Completa todos los campos')
    return
  }

  if (passwordData.new !== passwordData.confirm) {
    alert('Las contraseñas no coinciden')
    return
  }

  if (passwordData.new.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres')
    return
  }

  // Aquí luego conectas backend
  console.log('Cambio de contraseña:', passwordData)

  alert('Contraseña actualizada correctamente 😎')

  setShowPasswordModal(false)
  setPasswordData({ current: '', new: '', confirm: '' })
}

  const themeLabel = (key) => {
    if (key === '') return t('settings.themeNormal')
    if (key === 'theme-protanopia') return t('settings.themeProtanopia')
    if (key === 'theme-deuteranopia') return t('settings.themeDeuteranopia')
    return t('settings.themeTritanopia')
  }
  const toggleReminder = (key) => setReminders(prev => ({ ...prev, [key]: !prev[key] }))
  const togglePrivacy  = (key) => setPrivacy(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className={`settings-page ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <div className="settings-content">
        <h1><IoSettings /> {t('settings.title')}</h1>

        {/* APARIENCIA */}
        <div className="settings-card">
          <h2><FaPalette /> {t('settings.appearance')}</h2>
          <div className="settings-field">
            <div className="field-icon"><FaMoon /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.darkMode')}</span>
              <span className="field-value">{darkMode ? t('settings.enabled') : t('settings.disabled')}</span>
            </div>
            <div className={`toggle ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(!darkMode)}>
              <div className="toggle-circle" />
            </div>
          </div>
          <div className="settings-field theme-field">
            <div className="field-icon"><FaPalette /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.accessibleThemes')}</span>
              <span className="field-value">{themeLabel(theme)}</span>
            </div>
          </div>
          <div className="theme-picker">
            {THEMES.map(({ key, dot }) => (
              <button key={key} className={`theme-card ${theme === key ? 'theme-card--active' : ''}`} onClick={() => changeTheme(key)}>
                <div className="theme-preview">
                  <div className="preview-bar" style={{ background: darkMode ? dot.dark : dot.light }} />
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
            <button className="btn-update" onClick={() => handleEdit('dateFormat', settings.dateFormat)}>
              <MdEdit /> {t('settings.updateBtn')}
            </button>
          </div>
          <div className="settings-field">
            <div className="field-icon"><FaClock /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.autoTimezone')}</span>
              <span className="field-value">{autoTimezone ? t('settings.enabled') : t('settings.disabled')}</span>
            </div>
            <div className={`toggle ${autoTimezone ? 'active' : ''}`} onClick={() => handleTimezoneToggle(!autoTimezone)}>
              <div className="toggle-circle" />
            </div>
          </div>
          {!autoTimezone && (
            <div className="settings-field">
              <div className="field-icon"><FaMapMarkerAlt /></div>
              <div className="field-info">
                <span className="field-label">{t('settings.selectTimezone')}</span>
                <select className="timezone-select" value={manualTimezone} onChange={(e) => handleManualTimezone(e.target.value)}>
                  {TIMEZONES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* RECORDATORIOS */}
        <div className="settings-card">
          <h2><FaBell /> {t('settings.reminders')}</h2>
          <p className="section-description">{t('settings.remindersDescription')}</p>
          {[
            { key: 'alertas',       label: t('settings.reminderAlerts') },
            { key: 'advertencias',  label: t('settings.reminderWarnings') },
            { key: 'resumenDiario', label: t('settings.reminderDaily') },
            { key: 'sonido',        label: t('settings.reminderSound') },
          ].map(({ key, label }) => (
            <div key={key} className="settings-field">
              <div className="field-icon"><FaBell /></div>
              <div className="field-info">
                <span className="field-label">{label}</span>
                <span className="field-value">{reminders[key] ? t('settings.enabled') : t('settings.disabled')}</span>
              </div>
              <div className={`toggle ${reminders[key] ? 'active' : ''}`} onClick={() => toggleReminder(key)}>
                <div className="toggle-circle" />
              </div>
            </div>
          ))}
        </div>

        {/* PRIVACIDAD */}
        <div className="settings-card">
          <h2><FaShieldAlt /> {t('settings.privacy')}</h2>
          <p className="section-description">{t('settings.privacyDescription')}</p>
          <div className="settings-field">
            <div className="field-icon"><FaEye /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.publicProfile')}</span>
              <span className="field-value">{privacy.perfilPublico ? t('settings.enabled') : t('settings.disabled')}</span>
            </div>
            <div className={`toggle ${privacy.perfilPublico ? 'active' : ''}`} onClick={() => togglePrivacy('perfilPublico')}>
              <div className="toggle-circle" />
            </div>
          </div>
          <div className="settings-field">
            <div className="field-icon"><FaShieldAlt /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.shareData')}</span>
              <span className="field-value">{privacy.compartirDatos ? t('settings.enabled') : t('settings.disabled')}</span>
            </div>
            <div className={`toggle ${privacy.compartirDatos ? 'active' : ''}`} onClick={() => togglePrivacy('compartirDatos')}>
              <div className="toggle-circle" />
            </div>
          </div>
          <div className="settings-field">
            <div className="field-icon"><FaLock /></div>
            <div className="field-info">
              <span className="field-label">{t('settings.changePassword')}</span>
              <span className="field-value">{t('settings.changePasswordSub')}</span>
            </div>
            <button className="btn-update" onClick={() => setShowPasswordModal(true)}>
              <MdEdit /> {t('settings.updateBtn')}
            </button>
          </div>
          <div className="settings-field">
            <div className="field-info">
              <span className="field-label" style={{ color: '#dc3545' }}>{t('settings.deleteAccount')}</span>
              <span className="field-value">{t('settings.deleteAccountSub')}</span>
            </div>
            <button className="btn-delete-icon" onClick={() => setShowDeleteModal(true)}>
              <FaTrash />
            </button>
          </div>
        </div>

        {/* AYUDA */}
        <div className="settings-card">
          <h2><FaQuestionCircle /> {t('settings.help')}</h2>
          <p className="section-description">{t('settings.helpDescription')}</p>
          {[
            { type: 'faq',     label: t('settings.helpFaq'),    sub: t('settings.helpFaqSub') },
            { type: 'contact', label: t('settings.helpContact'), sub: t('settings.helpContactSub') },
            { type: 'terms',   label: t('settings.helpTerms'),   sub: t('settings.helpTermsSub') },
            { type: 'privacy', label: t('settings.helpPrivacy'), sub: t('settings.helpPrivacySub') },
            { type: 'version', label: t('settings.helpVersion'), sub: 'v1.0.0' },
          ].map(({ type, label, sub }) => (
            <div key={type} className="settings-field settings-field--link" onClick={() => setHelpModal({ open: true, type })}>
              <div className="field-icon"><FaQuestionCircle /></div>
              <div className="field-info">
                <span className="field-label">{label}</span>
                <span className="field-value">{sub}</span>
              </div>
              <FaChevronRight className="settings-chevron" />
            </div>
          ))}
        </div>
      </div>

      {showPasswordModal && (
  <div className="lang-modal-overlay" onClick={() => setShowPasswordModal(false)}>
    <div className="lang-modal" onClick={(e) => e.stopPropagation()}>
      <h3>🔐 Cambiar contraseña</h3>

      <input
        className="input-modal"
        type="password"
        placeholder="Contraseña actual"
        value={passwordData.current}
        onChange={(e) => handlePasswordChange('current', e.target.value)}
      />

      <input
        className="input-modal"
        type="password"
        placeholder="Nueva contraseña"
        value={passwordData.new}
        onChange={(e) => handlePasswordChange('new', e.target.value)}
      />

      <input
        className="input-modal"
        type="password"
        placeholder="Confirmar contraseña"
        value={passwordData.confirm}
        onChange={(e) => handlePasswordChange('confirm', e.target.value)}
      />


      <button onClick={handleSavePassword}>
        Guardar
      </button>

      <button onClick={() => setShowPasswordModal(false)}>
        Cancelar
      </button>
    </div>
  </div>
)}

      {/* Modal editar */}
      {modalOpen && (
        <EditModal field={editField} value={editValue} onSave={handleSave} onClose={() => setModalOpen(false)} />
      )}

      {/* Modal idioma */}
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

      {/* Modal eliminar cuenta */}
      {showDeleteModal && (
        <div className="lang-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="lang-modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#dc3545' }}>⚠️ {t('settings.deleteAccount')}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', margin: '0 0 8px' }}>
              {t('settings.deleteAccountConfirm')}
            </p>
            <button onClick={() => setShowDeleteModal(false)} style={{ background: 'var(--bg-subtle)' }}>
              {t('editModal.cancel')}
            </button>
            <button onClick={() => setShowDeleteModal(false)} style={{ background: '#dc3545', color: 'white', border: 'none' }}>
              {t('settings.deleteBtn')}
            </button>
          </div>
        </div>
      )}

      {/* Modal ayuda */}
      {helpModal.open && (
        <div className="lang-modal-overlay" onClick={() => setHelpModal({ open: false, type: null })}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <button className="help-modal-close" onClick={() => setHelpModal({ open: false, type: null })}>✕</button>

            {helpModal.type === 'faq' && (
              <>
                <h3>❓ {t('settings.helpFaq')}</h3>
                <div className="help-modal-body">
                  {[
                    { q: '¿Cómo agrego un ambiente favorito?', a: 'Presiona el ícono de corazón en cualquier tarjeta de ambiente en el Ranking.' },
                    { q: '¿Cómo cambio el idioma?', a: 'Ve a Configuración → Idiomas y Fechas → Actualizar.' },
                    { q: '¿Qué significan los colores de estado?', a: 'Verde = Normal, Amarillo = Advertencia, Rojo = Alerta crítica.' },
                    { q: '¿Puedo agregar nuevos ambientes?', a: 'Sí, ve a Gestión y presiona "Agregar Ambiente".' },
                  ].map(({ q, a }) => (
                    <div key={q} className="faq-item">
                      <strong>{q}</strong>
                      <p>{a}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {helpModal.type === 'contact' && (
              <>
                <h3>📬 {t('settings.helpContact')}</h3>
                <div className="help-modal-body">
                  {[
                    { icon: '✉️', title: 'Correo electrónico', desc: 'soporte@eduaircontrol.com' },
                    { icon: '🕐', title: 'Horario de atención', desc: 'Lunes a Viernes, 8:00 AM – 6:00 PM (UTC-5)' },
                    { icon: '⏱️', title: 'Tiempo de respuesta', desc: 'Respondemos en menos de 24 horas hábiles.' },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="contact-item">
                      <span className="contact-icon">{icon}</span>
                      <div><strong>{title}</strong><p>{desc}</p></div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {helpModal.type === 'terms' && (
              <>
                <h3>📋 {t('settings.helpTerms')}</h3>
                <div className="help-modal-body help-modal-scroll">
                  <p>Al acceder y usar EduAirControl, aceptas cumplir con los siguientes términos:</p>
                  <ul>
                    <li>Proporcionarás información precisa y completa.</li>
                    <li>Eres responsable de mantener la confidencialidad de tus credenciales.</li>
                    <li>La plataforma debe usarse solo para propósitos autorizados y legales.</li>
                    <li>Los datos ambientales son solo para monitoreo e informes.</li>
                  </ul>
                  <p>EduAirControl se reserva el derecho de actualizar estos términos en cualquier momento.</p>
                </div>
              </>
            )}

            {helpModal.type === 'privacy' && (
              <>
                <h3>🔒 {t('settings.helpPrivacy')}</h3>
                <div className="help-modal-body help-modal-scroll">
                  <p>En EduAirControl nos comprometemos a proteger tu información personal:</p>
                  <ul>
                    <li>No vendemos ni compartimos tus datos con terceros sin tu consentimiento.</li>
                    <li>Tus datos se almacenan de forma segura con cifrado.</li>
                    <li>Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento.</li>
                    <li>Solo recopilamos datos necesarios para el funcionamiento de la plataforma.</li>
                  </ul>
                  <p>Para más información escríbenos a soporte@eduaircontrol.com.</p>
                </div>
              </>
            )}

            {helpModal.type === 'version' && (
              <>
                <h3>📱 {t('settings.helpVersion')}</h3>
                <div className="help-modal-body">
                  <div className="version-info">
                    <div className="version-badge">v1.0.0</div>
                    <p>EduAirControl — Sistema de Monitoreo de Calidad del Aire</p>
                    <p className="version-date">Última actualización: Abril 2026</p>
                    <div className="version-tags">
                      <span className="version-tag">React 18</span>
                      <span className="version-tag">i18n</span>
                      <span className="version-tag">Dark Mode</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsScreen