import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { formatDate, getDateFormat } from "../../hooks/useDateFormat"

function getActiveTimezone() {
  const auto = JSON.parse(localStorage.getItem('autoTimezone')) ?? true
  if (auto) return Intl.DateTimeFormat().resolvedOptions().timeZone
  return localStorage.getItem('manualTimezone') || Intl.DateTimeFormat().resolvedOptions().timeZone
}

function NavbarInfo({ role }) {
  const [time, setTime]             = useState(new Date())
  const [dateFormat, setDateFormat] = useState(getDateFormat)
  const [timezone, setTimezone]     = useState(getActiveTimezone)
  const { t } = useTranslation()

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onFormat = (e) => setDateFormat(e.detail)
    const onTz     = (e) => setTimezone(e.detail)
    window.addEventListener('dateFormatChanged', onFormat)
    window.addEventListener('timezoneChanged',   onTz)
    return () => {
      window.removeEventListener('dateFormatChanged', onFormat)
      window.removeEventListener('timezoneChanged',   onTz)
    }
  }, [])

  const fecha = formatDate(time, dateFormat)
  const hora  = time.toLocaleTimeString('default', { timeZone: timezone })

  return (
    <div className="navbar-info">
      <span className="navbar-info-greeting">
        {t('nav.greeting')} {role === "admin" ? t('nav.admin') : t('nav.user')}
      </span>
      <span className="navbar-info-time">
        {fecha} {hora}
      </span>
    </div>
  )
}

export default NavbarInfo