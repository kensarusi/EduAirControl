import '../../styles/auth/AuthLayout.css'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronDown } from 'react-icons/fa'
import { LanguageSelector } from '../ui'

function AuthLayout({ children }) {
  const { i18n } = useTranslation()
  const [showLangs, setShowLangs] = useState(false)

  const languages = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' }
  ]

  const currentLang =
    languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('language', code)
    setShowLangs(false)
  }

  return (
    <div className="auth-container">

      <div className="language-selector-fixed">
        <button
          className="lang-btn-premium"
          onClick={() => setShowLangs(!showLangs)}
        >
          <span>{currentLang.flag}</span>
          <span>{currentLang.label}</span>
          <FaChevronDown
            className={`lang-arrow ${showLangs ? 'open' : ''}`}
          />
        </button>

        {showLangs && (
          <div className="lang-dropdown-premium">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-option-premium ${
                  i18n.language === lang.code ? 'active' : ''
                }`}
                onClick={() => changeLanguage(lang.code)}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="auth-overlay"></div>

      <div className="auth-card">
        {children}
      </div>

    </div>
  )
}

export default AuthLayout