import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaTrophy, FaHeart, FaRegHeart, FaMapMarkerAlt, FaBell } from 'react-icons/fa'
import { IoCheckmarkCircle, IoWarning, IoAlertCircle, IoTrendingUp, IoTrendingDown, IoFlame } from 'react-icons/io5'
import { WiThermometer, WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import { HiSpeakerWave } from 'react-icons/hi2'
import Navbar from '../../components/layout/Navbar'
import { useEnvironments } from '../../context/EnvironmentsContext'
import '../../styles/app/Leaderboard.css'

// ── Score formula ──────────────────────────────────────────────
function calcScore(env) {
  const tempScore     = Math.max(0, 100 - Math.abs(env.temp - 21) * 8)
  const humidityScore = Math.max(0, 100 - Math.abs(env.humidity - 50) * 3)
  const co2Score      = Math.max(0, 100 - Math.max(0, env.co2 - 600) * 0.08)
  const noiseScore    = Math.max(0, 100 - Math.max(0, env.noise - 30) * 2)
  return Math.round((tempScore + humidityScore + co2Score + noiseScore) / 4)
}

// ── Status icon ────────────────────────────────────────────────
function StatusIcon({ statusKey, size = 16 }) {
  const s = { fontSize: size }
  if (statusKey === 'dashboard.statusNormal')  return <IoCheckmarkCircle style={{ ...s, color: '#4caf50' }} />
  if (statusKey === 'dashboard.statusWarning') return <IoWarning          style={{ ...s, color: '#FFC107' }} />
  return                                               <IoAlertCircle     style={{ ...s, color: '#f44336' }} />
}

// ── Score ring ─────────────────────────────────────────────────
function ScoreRing({ score, size = 56 }) {
  const r    = size * 0.39
  const circ = 2 * Math.PI * r
  const cx   = size / 2
  const color = score >= 75 ? 'var(--accent)' : score >= 50 ? '#FFC107' : '#f44336'
  const dash  = (score / 100) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="lb-score-ring">
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--border-card)" strokeWidth="4" />
      <circle
        cx={cx} cy={cx} r={r} fill="none"
        stroke={color} strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
      <text x={cx} y={cx + 4} textAnchor="middle" fontSize={size * 0.2} fontWeight="700" fill={color}>
        {score}
      </text>
    </svg>
  )
}

// ── Metric pill ────────────────────────────────────────────────
function MetricPill({ icon, value, warning }) {
  return (
    <span className={`lb-metric-pill ${warning ? 'lb-metric-pill--warn' : ''}`}>
      {icon} {value}
    </span>
  )
}

// ── Streak badge ───────────────────────────────────────────────
function StreakBadge({ days }) {
  if (!days || days < 2) return null
  return (
    <span className="lb-streak-badge">
      <IoFlame /> {days} días
    </span>
  )
}

// ── Podium card ────────────────────────────────────────────────
const MEDAL = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' }

function PodiumCard({ env, rank, score, onClick, onToggleFav }) {
  const { t } = useTranslation()
  const name = env.nameKey ? t(env.nameKey) : env.name

  return (
    <div
      className={`lb-podium-card lb-podium-card--${rank} lb-podium-card--clickable`}
      onClick={() => onClick(env.id)}
    >
      {rank === 1 && <div className="lb-crown">👑</div>}

      <div className="lb-avatar-bubble" style={{ borderColor: MEDAL[rank] }}>
        <StatusIcon statusKey={env.statusKey} size={rank === 1 ? 28 : 22} />
      </div>

      <p className="lb-podium-username">{name}</p>

      {env.location && (
        <p className="lb-podium-location">
          <FaMapMarkerAlt /> {env.location}
        </p>
      )}

      <div className="lb-podium-score-row">
        <ScoreRing score={score} size={rank === 1 ? 56 : 48} />
      </div>

      {env.streakDays >= 2 && <StreakBadge days={env.streakDays} />}

      <button
        className={`lb-fav-btn ${env.isFavorite ? 'lb-fav-btn--active' : ''}`}
        onClick={(e) => { e.stopPropagation(); onToggleFav(env.id, !env.isFavorite) }}
        title={env.isFavorite ? 'Quitar favorito' : 'Agregar favorito'}
      >
        {env.isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="lb-podium-stand" style={{ background: MEDAL[rank] }}>
        <span className="lb-podium-rank">{rank}</span>
      </div>
    </div>
  )
}

// ── Row (rank 4+) ──────────────────────────────────────────────
function RankRow({ env, rank, score, onClick, onToggleFav }) {
  const { t } = useTranslation()
  const name = env.nameKey ? t(env.nameKey) : env.name
  const up   = score > 50

  // Only show pills that are in warning/alert state to reduce noise
  const pills = [
    { icon: <WiThermometer />, value: `${env.temp}°C`,     warning: env.temp < 18 || env.temp > 24 },
    { icon: <MdCo2 />,         value: `${env.co2} ppm`,    warning: env.co2 > 1000 },
    { icon: <WiHumidity />,    value: `${env.humidity}%`,  warning: env.humidity < 40 || env.humidity > 60 },
    { icon: <HiSpeakerWave />, value: `${env.noise} dB`,   warning: env.noise > 50 },
  ]
  const alertPills  = pills.filter(p => p.warning)
  const normalPills = pills.filter(p => !p.warning)
  // Show warn pills first, then up to 2 normal ones if no warns
  const visiblePills = alertPills.length > 0 ? alertPills : normalPills.slice(0, 2)

  return (
    <div
      className="lb-row lb-row--clickable"
      onClick={() => onClick(env.id)}
    >
      <span className="lb-row-rank">#{rank}</span>

      <div className="lb-row-avatar">
        <StatusIcon statusKey={env.statusKey} size={18} />
      </div>

      <div className="lb-row-info">
        <span className="lb-row-username">{name}</span>
        {env.location && (
          <span className="lb-row-location">
            <FaMapMarkerAlt /> {env.location}
          </span>
        )}
        {env.streakDays >= 2 && <StreakBadge days={env.streakDays} />}
      </div>

      <div className="lb-row-pills">
        {visiblePills.map((p, i) => (
          <MetricPill key={i} icon={p.icon} value={p.value} warning={p.warning} />
        ))}
      </div>

      <span className={`lb-trend lb-trend--${up ? 'up' : 'down'}`}>
        {up ? <IoTrendingUp /> : <IoTrendingDown />}
      </span>

      <div className="lb-row-score-wrap">
        <ScoreRing score={score} size={44} />
      </div>

      <button
        className={`lb-fav-btn ${env.isFavorite ? 'lb-fav-btn--active' : ''}`}
        onClick={(e) => { e.stopPropagation(); onToggleFav(env.id, !env.isFavorite) }}
        title={env.isFavorite ? 'Quitar favorito' : 'Agregar favorito'}
      >
        {env.isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  )
}

// ── Stats bar ──────────────────────────────────────────────────
function StatsBar({ environments }) {
  const { t } = useTranslation()
  const normal  = environments.filter(e => e.statusKey === 'dashboard.statusNormal').length
  const warning = environments.filter(e => e.statusKey === 'dashboard.statusWarning').length
  const alert   = environments.filter(e => e.statusKey === 'dashboard.statusAlert').length

  return (
    <div className="lb-stats-bar">
      <div className="lb-stat lb-stat--normal">
        <IoCheckmarkCircle />
        <span className="lb-stat-count">{normal}</span>
        <span className="lb-stat-label">{t('dashboard.statusNormal', 'Normal')}</span>
      </div>
      <div className="lb-stat lb-stat--warning">
        <IoWarning />
        <span className="lb-stat-count">{warning}</span>
        <span className="lb-stat-label">{t('dashboard.statusWarning', 'Advertencia')}</span>
      </div>
      <div className="lb-stat lb-stat--alert">
        <IoAlertCircle />
        <span className="lb-stat-count">{alert}</span>
        <span className="lb-stat-label">{t('dashboard.statusAlert', 'Alerta')}</span>
      </div>
      <div className="lb-stat lb-stat--total">
        <FaTrophy />
        <span className="lb-stat-count">{environments.length}</span>
        <span className="lb-stat-label">Total</span>
      </div>
    </div>
  )
}

// ── Global Health Card ─────────────────────────────────────────
function GlobalHealthCard({ environments }) {
  const total = environments.length
  if (total === 0) return null
  const normal  = environments.filter(e => e.statusKey === 'dashboard.statusNormal').length
  const warning = environments.filter(e => e.statusKey === 'dashboard.statusWarning').length
  const alert   = environments.filter(e => e.statusKey === 'dashboard.statusAlert').length
  const healthPct = Math.round((normal / total) * 100)

  let label, color, emoji
  if (healthPct >= 70)      { label = 'Estado general bueno';   color = '#4caf50'; emoji = '🟢' }
  else if (healthPct >= 40) { label = 'Atención recomendada';   color = '#FFC107'; emoji = '🟡' }
  else                      { label = 'Intervención necesaria'; color = '#f44336'; emoji = '🔴' }

  const normalW  = (normal  / total) * 100
  const warningW = (warning / total) * 100
  const alertW   = (alert   / total) * 100

  return (
    <div className="lb-health-card">
      <div className="lb-health-header">
        <span className="lb-health-emoji">{emoji}</span>
        <div>
          <p className="lb-health-label">{label}</p>
          <p className="lb-health-sub">{total} ambientes monitoreados</p>
        </div>
        <span className="lb-health-pct" style={{ color }}>{healthPct}%</span>
      </div>
      <div className="lb-health-bar-track">
        <div className="lb-health-bar-seg lb-health-bar-seg--normal"  style={{ width: `${normalW}%`  }} title={`${normal} normales`} />
        <div className="lb-health-bar-seg lb-health-bar-seg--warning" style={{ width: `${warningW}%` }} title={`${warning} advertencias`} />
        <div className="lb-health-bar-seg lb-health-bar-seg--alert"   style={{ width: `${alertW}%`   }} title={`${alert} alertas`} />
      </div>
      <div className="lb-health-legend">
        <span><span className="lb-dot lb-dot--normal" />{normal} Normal</span>
        <span><span className="lb-dot lb-dot--warning" />{warning} Advertencia</span>
        <span><span className="lb-dot lb-dot--alert" />{alert} Alerta</span>
      </div>
    </div>
  )
}

// ── Top 1 vs. Average comparison bar ──────────────────────────
function TopVsAvgCard({ topEnv, environments, onClick }) {
  const { t } = useTranslation()
  if (!topEnv || environments.length < 2) return null

  const avg = (key) => environments.reduce((s, e) => s + e[key], 0) / environments.length

  const metrics = [
    {
      label: 'Temp',
      icon: <WiThermometer />,
      topVal: topEnv.temp,
      avgVal: avg('temp'),
      min: 10, max: 35,
      format: v => `${Math.round(v)}°C`,
      warn: v => v < 18 || v > 24,
    },
    {
      label: 'Humedad',
      icon: <WiHumidity />,
      topVal: topEnv.humidity,
      avgVal: avg('humidity'),
      min: 0, max: 100,
      format: v => `${Math.round(v)}%`,
      warn: v => v < 40 || v > 60,
    },
    {
      label: 'CO₂',
      icon: <MdCo2 />,
      topVal: topEnv.co2,
      avgVal: avg('co2'),
      min: 400, max: 2000,
      format: v => `${Math.round(v)} ppm`,
      warn: v => v > 1000,
    },
    {
      label: 'Ruido',
      icon: <HiSpeakerWave />,
      topVal: topEnv.noise,
      avgVal: avg('noise'),
      min: 20, max: 90,
      format: v => `${Math.round(v)} dB`,
      warn: v => v > 50,
    },
  ]

  const name = topEnv.nameKey ? t(topEnv.nameKey) : topEnv.name

  const pct = (val, min, max) => Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100))

  return (
    <div className="lb-vsavg-card" onClick={() => onClick(topEnv.id)}>
      <p className="lb-vsavg-title">
        🏅 <strong>{name}</strong> vs. promedio general
      </p>
      <div className="lb-vsavg-rows">
        {metrics.map((m) => {
          const topPct = pct(m.topVal, m.min, m.max)
          const avgPct = pct(m.avgVal, m.min, m.max)
          const isWarn = m.warn(m.topVal)
          const barColor = isWarn ? '#FFC107' : 'var(--accent)'
          return (
            <div key={m.label} className="lb-vsavg-row">
              <span className="lb-vsavg-label">{m.icon} {m.label}</span>
              <div className="lb-vsavg-track">
                <div className="lb-vsavg-fill-avg" style={{ width: `${avgPct}%` }} title={`Promedio: ${m.format(m.avgVal)}`} />
                <div className="lb-vsavg-fill" style={{ width: `${topPct}%`, background: barColor }} />
              </div>
              <span className="lb-vsavg-val" style={{ color: barColor }}>{m.format(m.topVal)}</span>
            </div>
          )
        })}
      </div>
      <p className="lb-vsavg-legend">
        <span className="lb-vsavg-legend-avg" /> Promedio &nbsp;
        <span className="lb-vsavg-legend-top" /> #{1}
      </p>
    </div>
  )
}

// ── Alerts Panel ───────────────────────────────────────────────
function AlertsPanel({ environments, onClick }) {
  const { t } = useTranslation()
  const problematic = environments.filter(
    e => e.statusKey === 'dashboard.statusAlert' || e.statusKey === 'dashboard.statusWarning'
  )
  if (problematic.length === 0) return (
    <div className="lb-alerts-empty">
      <IoCheckmarkCircle style={{ color: '#4caf50', fontSize: 22 }} />
      <span>Sin alertas activas — todos los ambientes están bien</span>
    </div>
  )
  return (
    <div className="lb-alerts-panel">
      <p className="lb-alerts-title">
        <FaBell /> Alertas activas <span className="lb-alerts-badge">{problematic.length}</span>
      </p>
      <div className="lb-alerts-list">
        {problematic.map(env => {
          const name    = env.nameKey ? t(env.nameKey) : env.name
          const isAlert = env.statusKey === 'dashboard.statusAlert'
          const issues  = []
          if (env.temp < 18 || env.temp > 24)         issues.push(`Temp ${env.temp}°C`)
          if (env.humidity < 40 || env.humidity > 60) issues.push(`Hum ${env.humidity}%`)
          if (env.co2 > 1000)                         issues.push(`CO₂ ${env.co2} ppm`)
          if (env.noise > 50)                         issues.push(`Ruido ${env.noise} dB`)
          return (
            <div
              key={env.id}
              className={`lb-alert-item lb-alert-item--${isAlert ? 'alert' : 'warning'}`}
              onClick={() => onClick(env.id)}
            >
              <span className="lb-alert-icon">
                {isAlert ? <IoAlertCircle /> : <IoWarning />}
              </span>
              <div className="lb-alert-text">
                <span className="lb-alert-name">{name}</span>
                {issues.length > 0 && (
                  <span className="lb-alert-issues">{issues.join(' · ')}</span>
                )}
              </div>
              <span className="lb-alert-arrow">→</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Filter config ──────────────────────────────────────────────
const FILTERS = [
  { key: 'all',     label: 'Todos'           },
  { key: 'normal',  label: '✅ Normales'     },
  { key: 'warning', label: '⚠️ Advertencia' },
  { key: 'alert',   label: '🔴 Alertas'     },
]

const STATUS_KEY_MAP = {
  normal:  'dashboard.statusNormal',
  warning: 'dashboard.statusWarning',
  alert:   'dashboard.statusAlert',
}

// ── Main ───────────────────────────────────────────────────────
function DashboardScreen() {
  const { t }      = useTranslation()
  const navigate   = useNavigate()
  const { environments, toggleFavorite } = useEnvironments()
  const [filter, setFilter] = useState('all')

  const ranked = useMemo(() =>
    environments
      .map(env => ({ env, score: calcScore(env) }))
      .sort((a, b) => b.score - a.score),
    [environments]
  )

  const filtered = useMemo(() => {
    if (filter === 'all') return ranked
    return ranked.filter(({ env }) => env.statusKey === STATUS_KEY_MAP[filter])
  }, [ranked, filter])

  const top3 = filtered.slice(0, 3)
  const rest = filtered.slice(3)
  const PODIUM_ORDER = [2, 1, 3]

  const handleClick = (id) => navigate(`/environment/${id}`)

  return (
    <div>
      <Navbar />
      <div className="dashboard-page">
        </div>
        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} counts={counts} />
        <div className="environment-cards-container">
          {filtered.map((env) => (
            <EnvironmentCard key={env.id} environment={env} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      </div>
  )
}

export default DashboardScreen