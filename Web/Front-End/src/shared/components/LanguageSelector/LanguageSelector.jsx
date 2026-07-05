import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n/i18n'

const LANGUAGES = [
  { code: 'es', label: 'Español',   flag: '🇪🇸' },
  { code: 'en', label: 'English',   flag: '🇬🇧' },
  { code: 'fr', label: 'Français',  flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
]

function LanguageSelector() {
  const { i18n: i18nInstance } = useTranslation()
  const currentLang = i18nInstance.language
  const current = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0]

  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('language', code)
    setOpen(false)
  }

  return (
    <div className="language-selector" ref={ref}>
      <button
        type="button"
        className="lang-trigger"
        onClick={() => setOpen(v => !v)}
      >
        <span className="lang-flag">{current.flag}</span>
        <span className="lang-code">{current.label}</span>
        <span className={`lang-arrow ${open ? 'open' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="lang-dropdown">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              type="button"
              className={`lang-option ${lang.code === currentLang ? 'active' : ''}`}
              onClick={() => handleChange(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-label">{lang.label}</span>
              {lang.code === currentLang && <span className="lang-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector