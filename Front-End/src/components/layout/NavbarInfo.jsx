import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

function NavbarInfo({ role }) {
  const [time, setTime] = useState(new Date())
  const { t } = useTranslation()

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="navbar-info">
      <span className="navbar-info-greeting">
        {t('nav.greeting')} {role === "admin" ? t('nav.admin') : t('nav.user')}
      </span>
      <span className="navbar-info-time">
        {time.toLocaleDateString()} {time.toLocaleTimeString()}
      </span>
    </div>
  )
}

export default NavbarInfo