import '../../styles/components/EnvironmentFilters.css'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next' 


function FloatingInput({
  label,
  value,
  onChange,
  suggestions = []
}) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  const wrapperRef = useRef(null)

  const filtered = value.length === 0
    ? suggestions
    : suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().includes(value.toLowerCase()) &&
          suggestion.toLowerCase() !== value.toLowerCase()
      )

  const showDropdown = focused && filtered.length > 0

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false)
        setFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
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
        autoComplete="off"
        onFocus={() => {
          setFocused(true)
          setOpen(true)
        }}
        onBlur={() =>
          setTimeout(() => setFocused(false), 150)
        }
      />

      <label>{label}</label>

      {showDropdown && open && (
        <ul className="suggestions-dropdown">
          {filtered.map((suggestion) => (
            <li
              key={suggestion}
              className="suggestion-item"
              onMouseDown={(e) => {
                e.preventDefault()

                onChange({
                  target: {
                    value: suggestion
                  }
                })

                setOpen(false)
              }}
            >
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const RANGE_ICONS = {
  co2: '🌫️',
  noise: '🔊',
  temp: '🌡️'
}

function RangeDropdownInput({
  label,
  rangeKey,
  selectedRange,
  onSelect,
  ranges
}) {
  const [open, setOpen] = useState(false)

  const wrapperRef = useRef(null)

  const active = selectedRange || ranges[0]

  const hasValue =
    active &&
    (active.min !== null || active.max !== null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  return (
    <div className={`floating-field ${hasValue ? 'has-value' : ''}`}
      ref={wrapperRef} style={{ position: 'relative', cursor: 'pointer' }}
      onClick = {() => setOpen((o) => !o)}>
      <input type="text" readOnly value={hasValue ? active.label : ''} placeholder=" "
        style={{ cursor: 'pointer', caretColor: 'transparent' }} />
      <label>{label}</label>

      <span
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: `translateY(-50%) rotate(${
            open ? 180 : 0
          }deg)`,
          transition: 'transform .2s',
          fontSize: '11px',
          color: 'var(--accent)',
          pointerEvents: 'none'
        }}
      >
        ▾
      </span>

      {open && (
        <ul
          className="suggestions-dropdown"
          style={{
            top: 'calc(100% + 6px)'
          }}
        >
          {ranges.map((range) => {
            const isActive =
              active?.label === range.label

            return (
              <li key={r.label} className="suggestion-item"
                style={{ fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--accent)' : undefined }}
                onMouseDown = {(e) => { e.preventDefault(); onSelect(r); setOpen(false) }}>
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

function EnvironmentFilters({
  filters,
  setFilters,
  suggestions = []
}) {
  const { t } = useTranslation()

  const ranges = {
    co2: [
      { label: t('filters.all'), min: null, max: null },
      { label: '< 600 ppm', min: 0, max: 600 },
      { label: '600 – 800 ppm', min: 600, max: 800 },
      { label: '800 – 1000 ppm', min: 800, max: 1000 },
      { label: '1000 – 1500 ppm', min: 1000, max: 1500 },
      { label: '> 1500 ppm', min: 1500, max: null }
    ],

    noise: [
      { label: t('filters.all'), min: null, max: null },
      { label: '< 30 dB', min: 0, max: 30 },
      { label: '30 – 50 dB', min: 30, max: 50 },
      { label: '50 – 70 dB', min: 50, max: 70 },
      { label: '> 70 dB', min: 70, max: null }
    ],

    temp: [
      { label: t('filters.all'), min: null, max: null },
      { label: '< 18 °C', min: null, max: 18 },
      { label: '18 – 21 °C', min: 18, max: 21 },
      { label: '21 – 24 °C', min: 21, max: 24 },
      { label: '24 – 28 °C', min: 24, max: 28 },
      { label: '> 28 °C', min: 28, max: null }
    ]
  }

  const update = (key) => (e) => {
    setFilters(prev => ({
      ...prev,
      [key]: e.target.value
    }))
  }

  const handleRange = (key) => (range) => {
    setFilters(prev => ({
      ...prev,
      [key]:
        range.min === null &&
        range.max === null
          ? null
          : range
    }))
  }

  return (
    <div className="all-env-headers">
      <FloatingInput
        label={t('allEnvironments.ambiente')}
        value={filters.name}
        onChange={update('name')}
        suggestions={suggestions}
      />

      <RangeDropdownInput
        label={t('filters.co2')}
        rangeKey="co2"
        selectedRange={filters.co2}
        onSelect={handleRange('co2')}
        ranges={ranges.co2}
      />

      <RangeDropdownInput
        label={t('filters.noise')}
        rangeKey="noise"
        selectedRange={filters.noise}
        onSelect={handleRange('noise')}
        ranges={ranges.noise}
      />

      <RangeDropdownInput
        label={t('filters.temp')}
        rangeKey="temp"
        selectedRange={filters.temp}
        onSelect={handleRange('temp')}
        ranges={ranges.temp}
      />
    </div>
  )
}

export default EnvironmentFilters