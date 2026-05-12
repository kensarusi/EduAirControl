import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const RANGES = {
  co2: [
    { label: 'Todos',           min: null, max: null },
    { label: '< 600 ppm',       min: 0,    max: 600  },
    { label: '600 – 800 ppm',   min: 600,  max: 800  },
    { label: '800 – 1000 ppm',  min: 800,  max: 1000 },
    { label: '1000 – 1500 ppm', min: 1000, max: 1500 },
    { label: '> 1500 ppm',      min: 1500, max: null },
  ],
  noise: [
    { label: 'Todos',       min: null, max: null },
    { label: '< 30 dB',    min: 0,    max: 30   },
    { label: '30 – 50 dB', min: 30,   max: 50   },
    { label: '50 – 70 dB', min: 50,   max: 70   },
    { label: '> 70 dB',    min: 70,   max: null },
  ],
  temp: [
    { label: 'Todos',       min: null, max: null },
    { label: '< 18 °C',    min: null, max: 18   },
    { label: '18 – 21 °C', min: 18,   max: 21   },
    { label: '21 – 24 °C', min: 21,   max: 24   },
    { label: '24 – 28 °C', min: 24,   max: 28   },
    { label: '> 28 °C',    min: 28,   max: null },
  ],
}

function FloatingInput({ label, value, onChange, suggestions = [] }) {
  const [open, setOpen]       = useState(false)
  const [focused, setFocused] = useState(false)
  const wrapperRef            = useRef(null)

  const filtered = value.length === 0
    ? suggestions
    : suggestions.filter(
        (s) => s.toLowerCase().includes(value.toLowerCase()) && s.toLowerCase() !== value.toLowerCase()
      )
  const showDropdown = focused && filtered.length > 0

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
    <div className={`floating-field ${value ? 'has-value' : ''}`} ref={wrapperRef} style={{ position: 'relative' }}>
      <input type="text" value={value} onChange={onChange} placeholder=" "
        onFocus={() => { setFocused(true); setOpen(true) }}
        onBlur={() => setTimeout(() => setFocused(false), 150)} autoComplete="off" />
      <label>{label}</label>
      {showDropdown && open && (
        <ul className="suggestions-dropdown">
          {filtered.map((s) => (
            <li key={s} className="suggestion-item"
              onMouseDown={(e) => { e.preventDefault(); onChange({ target: { value: s } }); setOpen(false) }}>
              <span className="suggestion-icon">🏫</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RangeDropdownInput({ label, rangeKey, selectedRange, onSelect }) {
  const [open, setOpen] = useState(false)
  const wrapperRef      = useRef(null)
  const ranges          = RANGES[rangeKey]
  const active          = selectedRange || ranges[0]
  const hasValue        = active && (active.min !== null || active.max !== null)

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const ICON = { co2: '🌫️', noise: '🔊', temp: '🌡️' }

  return (
    <div className={`floating-field ${hasValue ? 'has-value' : ''}`}
      ref={wrapperRef} style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => setOpen((o) => !o)}>
      <input type="text" readOnly value={hasValue ? active.label : ''} placeholder=" "
        style={{ cursor: 'pointer', caretColor: 'transparent' }} />
      <label>{label}</label>
      <span style={{
        position: 'absolute', right: 12, top: '50%',
        transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
        transition: 'transform 0.2s', fontSize: 11,
        color: 'var(--accent)', pointerEvents: 'none',
      }}>▾</span>
      {open && (
        <ul className="suggestions-dropdown" style={{ top: 'calc(100% + 6px)' }}>
          {ranges.map((r) => {
            const isActive = active && r.label === active.label
            return (
              <li key={r.label} className="suggestion-item"
                style={{ fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--accent)' : undefined }}
                onMouseDown={(e) => { e.preventDefault(); onSelect(r); setOpen(false) }}>
                <span className="suggestion-icon">{ICON[rangeKey]}</span>
                <span>{r.label}</span>
                {isActive && <span style={{ marginLeft: 'auto', color: 'var(--accent)' }}>✓</span>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function EnvironmentFilters({ filters, setFilters, suggestions = [] }) {
  const { t } = useTranslation()
  const update = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })
  const handleRange = (key) => (range) =>
    setFilters({ ...filters, [key]: (range.min === null && range.max === null) ? null : range })

  return (
    <div className="all-env-headers">
      <FloatingInput label={t('allEnvironments.ambiente')} value={filters.name} onChange={update('name')} suggestions={suggestions} />
      <RangeDropdownInput label="CO₂" rangeKey="co2" selectedRange={filters.co2} onSelect={handleRange('co2')} />
      <RangeDropdownInput label="Ruido" rangeKey="noise" selectedRange={filters.noise} onSelect={handleRange('noise')} />
      <RangeDropdownInput label="Temp" rangeKey="temp" selectedRange={filters.temp} onSelect={handleRange('temp')} />
    </div>
  )
}

export default EnvironmentFilters
