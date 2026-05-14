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

  return Math.round(
    (tempScore + humidityScore + co2Score + noiseScore) / 4
  )
}

// ── Status icon ────────────────────────────────────────────────
function StatusIcon({ statusKey, size = 16 }) {
  const s = { fontSize: size }

  if (statusKey === 'dashboard.statusNormal') {
    return <IoCheckmarkCircle style={{ ...s, color: '#4caf50' }} />
  }

  if (statusKey === 'dashboard.statusWarning') {
    return <IoWarning style={{ ...s, color: '#FFC107' }} />
  }

  return <IoAlertCircle style={{ ...s, color: '#f44336' }} />
}

// ── Score ring ─────────────────────────────────────────────────
function ScoreRing({ score, size = 56 }) {
  const r = size * 0.39
  const circ = 2 * Math.PI * r
  const cx = size / 2

  const color =
    score >= 75
      ? 'var(--accent)'
      : score >= 50
      ? '#FFC107'
      : '#f44336'

  const dash = (score / 100) * circ

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="lb-score-ring"
    >
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke="var(--border-card)"
        strokeWidth="4"
      />

      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />

      <text
        x={cx}
        y={cx + 4}
        textAnchor="middle"
        fontSize={size * 0.2}
        fontWeight="700"
        fill={color}
      >
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
  const { t } = useTranslation()

  if (!days || days < 2) return null

  return (
    <span className="lb-streak-badge">
      <IoFlame /> {days} {t('leaderboard.days')}
    </span>
  )
}

// ── Podium card ────────────────────────────────────────────────
const MEDAL = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
}

function PodiumCard({ env, rank, score, onClick, onToggleFav }) {
  const { t } = useTranslation()

      const name = env.nameKey
        ? t(env.nameKey)
        : env.name

      const location = env.locationKey
        ? t(env.locationKey)
        : env.location

  return (
    <div
      className={`lb-podium-card lb-podium-card--${rank} lb-podium-card--clickable`}
      onClick={() => onClick(env.id)}
    >
      {rank === 1 && <div className="lb-crown">👑</div>}

      <div
        className="lb-avatar-bubble"
        style={{ borderColor: MEDAL[rank] }}
      >
        <StatusIcon
          statusKey={env.statusKey}
          size={rank === 1 ? 28 : 22}
        />
      </div>

      <p className="lb-podium-username">{name}</p>

      {location && (
        <p className="lb-podium-location">
          <FaMapMarkerAlt /> {location}
        </p>
      )}

      <div className="lb-podium-score-row">
        <ScoreRing score={score} size={rank === 1 ? 56 : 48} />
      </div>

      {env.streakDays >= 2 && (
        <StreakBadge days={env.streakDays} />
      )}

      <button
        className={`lb-fav-btn ${env.isFavorite ? 'lb-fav-btn--active' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onToggleFav(env.id, !env.isFavorite)
        }}
        title={
          env.isFavorite
            ? t('leaderboard.removeFavorite')
            : t('leaderboard.addFavorite')
        }
      >
        {env.isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div
        className="lb-podium-stand"
        style={{ background: MEDAL[rank] }}
      >
        <span className="lb-podium-rank">{rank}</span>
      </div>
    </div>
  )
}

// ── Row (rank 4+) ──────────────────────────────────────────────
function RankRow({ env, rank, score, onClick, onToggleFav }) {
  const { t } = useTranslation()

      const name = env.nameKey
        ? t(env.nameKey)
        : env.name

      const location = env.locationKey
        ? t(env.locationKey)
        : env.location

  const up = score > 50

  const pills = [
    {
      icon: <WiThermometer />,
      value: `${env.temp}°C`,
      warning: env.temp < 18 || env.temp > 24,
    },
    {
      icon: <MdCo2 />,
      value: `${env.co2} ppm`,
      warning: env.co2 > 1000,
    },
    {
      icon: <WiHumidity />,
      value: `${env.humidity}%`,
      warning: env.humidity < 40 || env.humidity > 60,
    },
    {
      icon: <HiSpeakerWave />,
      value: `${env.noise} dB`,
      warning: env.noise > 50,
    },
  ]

  const alertPills = pills.filter((p) => p.warning)
  const normalPills = pills.filter((p) => !p.warning)

  const visiblePills =
    alertPills.length > 0
      ? alertPills
      : normalPills.slice(0, 2)

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

        {location && (
        <span className="lb-row-location">
          <FaMapMarkerAlt /> {location}
        </span>
      )}

        {env.streakDays >= 2 && (
          <StreakBadge days={env.streakDays} />
        )}
      </div>

      <div className="lb-row-pills">
        {visiblePills.map((p, i) => (
          <MetricPill
            key={i}
            icon={p.icon}
            value={p.value}
            warning={p.warning}
          />
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
        onClick={(e) => {
          e.stopPropagation()
          onToggleFav(env.id, !env.isFavorite)
        }}
        title={
          env.isFavorite
            ? t('leaderboard.removeFavorite')
            : t('leaderboard.addFavorite')
        }
      >
        {env.isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  )
}

// ── Stats bar ──────────────────────────────────────────────────
function StatsBar({ environments }) {
  const { t } = useTranslation()

  const normal = environments.filter(
    (e) => e.statusKey === 'dashboard.statusNormal'
  ).length

  const warning = environments.filter(
    (e) => e.statusKey === 'dashboard.statusWarning'
  ).length

  const alert = environments.filter(
    (e) => e.statusKey === 'dashboard.statusAlert'
  ).length

  return (
    <div className="lb-stats-bar">
      <div className="lb-stat lb-stat--normal">
        <IoCheckmarkCircle />
        <span className="lb-stat-count">{normal}</span>
        <span className="lb-stat-label">
          {t('dashboard.statusNormal')}
        </span>
      </div>

      <div className="lb-stat lb-stat--warning">
        <IoWarning />
        <span className="lb-stat-count">{warning}</span>
        <span className="lb-stat-label">
          {t('dashboard.statusWarning')}
        </span>
      </div>

      <div className="lb-stat lb-stat--alert">
        <IoAlertCircle />
        <span className="lb-stat-count">{alert}</span>
        <span className="lb-stat-label">
          {t('dashboard.statusAlert')}
        </span>
      </div>

      <div className="lb-stat lb-stat--total">
        <FaTrophy />
        <span className="lb-stat-count">{environments.length}</span>
        <span className="lb-stat-label">
          {t('leaderboard.total')}
        </span>
      </div>
    </div>
  )
}

// ── Filter config ──────────────────────────────────────────────
const FILTERS = [
  { key: 'all', labelKey: 'leaderboard.filters.all' },
  { key: 'normal', labelKey: 'leaderboard.filters.normal' },
  { key: 'warning', labelKey: 'leaderboard.filters.warning' },
  { key: 'alert', labelKey: 'leaderboard.filters.alert' },
]

const STATUS_KEY_MAP = {
  normal: 'dashboard.statusNormal',
  warning: 'dashboard.statusWarning',
  alert: 'dashboard.statusAlert',
}

// ── Main ───────────────────────────────────────────────────────
function DashboardScreen() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { environments, toggleFavorite } = useEnvironments()

  const [filter, setFilter] = useState('all')

  const ranked = useMemo(
    () =>
      environments
        .map((env) => ({
          env,
          score: calcScore(env),
        }))
        .sort((a, b) => b.score - a.score),
    [environments]
  )

  const filtered = useMemo(() => {
    if (filter === 'all') return ranked

    return ranked.filter(
      ({ env }) => env.statusKey === STATUS_KEY_MAP[filter]
    )
  }, [ranked, filter])

  const top3 = filtered.slice(0, 3)
  const rest = filtered.slice(3)

  const PODIUM_ORDER = [2, 1, 3]

  const handleClick = (id) => {
    navigate(`/environment/${id}`)
  }

  return (
    <div>
      <Navbar />

      <div className="lb-page">

        <div className="lb-header">
          <div className="lb-header-icon">
            <FaTrophy />
          </div>

          <h1 className="lb-title">
            {t('leaderboard.title')}
          </h1>

          <p className="lb-subtitle">
            {t('leaderboard.subtitle')}
          </p>
        </div>

        <StatsBar environments={environments} />

        <div className="lb-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`lb-filter-btn ${
                filter === f.key
                  ? 'lb-filter-btn--active'
                  : ''
              }`}
              onClick={() => setFilter(f.key)}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="lb-empty">
            <span>🏜️</span>
            <p>{t('leaderboard.empty')}</p>
          </div>
        )}

        {top3.length > 0 && (
          <div className="lb-podium">
            {PODIUM_ORDER.map((rank) => {
              const item = top3[rank - 1]

              return item ? (
                <PodiumCard
                  key={rank}
                  env={item.env}
                  rank={rank}
                  score={item.score}
                  onClick={handleClick}
                  onToggleFav={toggleFavorite}
                />
              ) : null
            })}
          </div>
        )}

        {rest.length > 0 && (
          <div className="lb-list">
            <p className="lb-list-title">
              {t('leaderboard.positions')} {top3.length + 1} – {filtered.length}
            </p>

            {rest.map(({ env, score }, idx) => (
              <RankRow
                key={env.id}
                env={env}
                rank={top3.length + idx + 1}
                score={score}
                onClick={handleClick}
                onToggleFav={toggleFavorite}
              />
            ))}
          </div>
        )}

        <div className="lb-legend">
          <p className="lb-legend-title">
            💡 {t('leaderboard.scoreCalculation')}
          </p>

          <div className="lb-legend-items">
            <span>
              <WiThermometer />
              {t('leaderboard.tempIdeal')}
            </span>

            <span>
              <WiHumidity />
              {t('leaderboard.humidityIdeal')}
            </span>

            <span>
              <MdCo2 />
              {t('leaderboard.co2Ideal')}
            </span>

            <span>
              <HiSpeakerWave />
              {t('leaderboard.noiseIdeal')}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardScreen