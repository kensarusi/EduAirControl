import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function FloatingInput({ label, value, onChange, suggestions = [] }) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const wrapperRef = useRef(null)

  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(value.toLowerCase()) && s.toLowerCase() !== value.toLowerCase()
  )

  const showDropdown = focused && value.length > 0 && filtered.length > 0

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div
      className={`floating-field ${value ? 'has-value' : ''}`}
      ref={wrapperRef}
      style={{ position: 'relative' }}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder=" "
        onFocus={() => { setFocused(true); setOpen(true) }}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        autoComplete="off"
      />
      <label>{label}</label>

      {showDropdown && open && (
        <ul className="suggestions-dropdown">
          {filtered.map((s) => (
            <li
              key={s}
              className="suggestion-item"
              onMouseDown={(e) => {
                e.preventDefault()
                onChange({ target: { value: s } })
                setOpen(false)
              }}
            >
              <span className="suggestion-icon">🏫</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SimpleFloatingInput({ label, value, onChange }) {
  return (
    <div className={`floating-field ${value ? 'has-value' : ''}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder=" "
        autoComplete="off"
      />
      <label>{label}</label>
    </div>
  )
}

function EnvironmentFilters({ filters, setFilters, suggestions = [] }) {
  const { t } = useTranslation()

  const update = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })

  return (
    <div className="all-env-headers">
      <FloatingInput
        label={t('allEnvironments.ambiente')}
        value={filters.name}
        onChange={update('name')}
        suggestions={suggestions}
      />
      <SimpleFloatingInput label="CO₂" value={filters.co2} onChange={update('co2')} />
      <SimpleFloatingInput label="dB"  value={filters.db}  onChange={update('db')}  />
      <SimpleFloatingInput label="Temp" value={filters.temp} onChange={update('temp')} />
    </div>
  )
}

export default EnvironmentFilters