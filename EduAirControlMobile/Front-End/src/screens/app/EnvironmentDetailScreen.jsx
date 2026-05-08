import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'
import {
  STATUS_COLORS, STATUS_DIM, STATUS_LABELS,
  QUALITY_LABELS, QUALITY_COLORS,
  IDEAL_RANGES,
} from '../../constants/environments'
import { useEnvironments } from '../../context/EnvironmentsContext'

function MetricBar({ value, min, max, color }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  return (
    <View style={styles.barTrack}>
      <View style={[styles.barFill, { flex: pct, backgroundColor: color }]} />
      <View style={{ flex: 100 - pct }} />
    </View>
  )
}

function MetricCard({ icon, label, value, unit, ideal, color, barValue, barMin, barMax, currentColors }) {
  return (
    <View style={[styles.metricCard, { borderLeftColor: color, borderLeftWidth: 3, backgroundColor: currentColors.bgCard }]}>
      <View style={styles.metricTop}>
        <Text style={styles.metricIcon}>{icon}</Text>
        <View style={styles.metricInfo}>
          <Text style={[styles.metricLabel, { color: currentColors.textSecondary }]}>{label}</Text>
          <Text style={[styles.metricValue, { color }]}>
            {value}<Text style={[styles.metricUnit, { color: currentColors.textMuted }]}>{unit}</Text>
          </Text>
        </View>
      </View>
      <MetricBar value={barValue} min={barMin} max={barMax} color={color} />
      <Text style={[styles.idealText, { color: currentColors.textMuted }]}>Ideal: {ideal}</Text>
    </View>
  )
}

// ── Star Rating (igual que web) ────────────────────────────────
function RatingCard({ rating, setRating, onSubmit, submitted, currentColors }) {
  if (submitted) {
    return (
      <View style={[styles.ratingCard, { backgroundColor: currentColors.bgCard, borderColor: currentColors.borderColor }]}>
        <View style={styles.ratingSubmittedRow}>
          <Ionicons name="checkmark-circle" size={28} color={currentColors.accent} />
          <Text style={[styles.ratingSubmittedTxt, { color: currentColors.textPrimary }]}>
            ¡Calificación enviada! Gracias por tu opinión.
          </Text>
        </View>
      </View>
    )
  }
  return (
    <View style={[styles.ratingCard, { backgroundColor: currentColors.bgCard, borderColor: currentColors.borderColor }]}>
      <Text style={[styles.ratingQuestion, { color: currentColors.textPrimary }]}>
        ¿Cómo percibes el confort de este ambiente?
      </Text>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
            <Text style={[styles.star, { color: rating >= star ? '#FFD700' : currentColors.borderColor }]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.ratingBtn, { backgroundColor: rating > 0 ? currentColors.accent : currentColors.borderColor }]}
        onPress={() => rating > 0 && onSubmit(rating)}
        disabled={rating === 0}
      >
        <Text style={[styles.ratingBtnTxt, { color: currentColors.bgBody }]}>⭐ Enviar calificación</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function EnvironmentDetailScreen({ route, navigation }) {
  const { envId } = route.params
  const { darkMode, currentColors, loaded } = useTheme()
  const { environments, toggleFavorite } = useEnvironments()
  const env = environments.find((e) => e.id === envId)

  const [rating, setRating] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  const handleSubmitRating = (r) => setRatingSubmitted(true)

  if (!env) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: '#f0fafa' }]}>
        <View style={styles.center}>
          <Text style={{ color: '#0f172a', fontSize: 16 }}>Ambiente no encontrado</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#00b894', marginTop: 10 }}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  if (!loaded) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: '#f0fafa' }]}>
        <View style={styles.center}>
          <Text style={{ color: '#999' }}>Cargando...</Text>
        </View>
      </SafeAreaView>
    )
  }

  const statusColor = STATUS_COLORS[env.statusKey] || '#00b894'
  const statusDim   = STATUS_DIM[env.statusKey]   || 'rgba(0,184,148,0.1)'
  const statusLabel = STATUS_LABELS[env.statusKey] || env.statusKey
  const qualityLabel = QUALITY_LABELS[env.qualityKey] || env.qualityKey
  const qualityColor = QUALITY_COLORS[env.qualityKey] || '#00b894'

  const temp     = env.temp ?? env.temperature ?? 0
  const humidity = env.humidity ?? 0
  const co2      = env.co2 ?? 0
  const noise    = env.noise ?? 0

  const metrics = [
    { icon: '🌡️', label: 'Temperatura',     value: temp,     unit: '°C',  ideal: IDEAL_RANGES.temperature || '18–24°C', color: temp < 18 || temp > 24 ? '#FFC107' : '#00b894', barMin: 10, barMax: 40 },
    { icon: '💧', label: 'Humedad',          value: humidity, unit: '%',   ideal: IDEAL_RANGES.humidity    || '40–60%',  color: humidity < 40 || humidity > 60 ? '#FFC107' : '#00b894', barMin: 0, barMax: 100 },
    { icon: '💨', label: 'CO₂',              value: co2,      unit: ' ppm',ideal: IDEAL_RANGES.co2         || '< 1000 ppm', color: co2 > 1000 ? '#F44336' : '#00b894', barMin: 400, barMax: 2000 },
    { icon: '🔊', label: 'Ruido',            value: noise,    unit: ' dB', ideal: IDEAL_RANGES.noise       || '< 50 dB',   color: noise > 50 ? '#FFC107' : '#00b894', barMin: 0, barMax: 120 },
  ]

  const StatusIconComp = () => {
    const iconMap = { normal: 'checkmark-circle', warning: 'warning', alert: 'alert-circle', 'dashboard.statusNormal': 'checkmark-circle', 'dashboard.statusWarning': 'warning', 'dashboard.statusAlert': 'alert-circle' }
    return <Ionicons name={iconMap[env.statusKey] || 'help-circle'} size={28} color={statusColor} />
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: currentColors.bgBody }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} backgroundColor={currentColors.bgBody} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: currentColors.bgCard, borderBottomColor: currentColors.borderColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={currentColors.accent} />
        </TouchableOpacity>
        <View style={styles.headerTitleBlock}>
          <Text style={[styles.headerTitle, { color: currentColors.textPrimary }]} numberOfLines={1}>{env.name}</Text>
          <Text style={[styles.headerLocation, { color: currentColors.textMuted }]}>{env.location}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(env.id, !env.isFavorite)}>
          <Ionicons
            name={env.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={env.isFavorite ? '#ff6b6b' : currentColors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Status Card */}
        <View style={[styles.statusCard, { backgroundColor: currentColors.bgCard, borderColor: currentColors.borderColor }]}>
          <View style={styles.statusRow}>
            <StatusIconComp />
            <View style={styles.statusInfo}>
              <Text style={[styles.statusLabel, { color: currentColors.textMuted }]}>Estado</Text>
              <Text style={[styles.statusValue, { color: statusColor }]}>{statusLabel}</Text>
            </View>
          </View>
          <View style={[styles.qualityBadge, { backgroundColor: qualityColor + '20', borderColor: qualityColor }]}>
            <Text style={[styles.qualityText, { color: qualityColor }]}>{qualityLabel}</Text>
          </View>
        </View>

        {/* Air Quality banner */}
        <View style={[styles.qualityBanner, { borderLeftColor: qualityColor, backgroundColor: currentColors.bgCard }]}>
          <View>
            <Text style={[styles.qualityBannerLabel, { color: currentColors.textSecondary }]}>Calidad del aire</Text>
            <Text style={[styles.qualityBannerValue, { color: qualityColor }]}>{qualityLabel}</Text>
          </View>
          <Text style={[styles.qualityBannerDesc, { color: currentColors.textMuted }]}>
            Basado en niveles de CO₂, temperatura, humedad y ruido.
          </Text>
        </View>

        {/* Metrics — todas 4 igual que web */}
        <Text style={[styles.sectionTitle, { color: currentColors.textPrimary }]}>Métricas en tiempo real</Text>
        <View style={styles.metricsGrid}>
          {metrics.map((m) => (
            <MetricCard
              key={m.label}
              icon={m.icon}
              label={m.label}
              value={m.value !== undefined ? m.value : '--'}
              unit={m.unit}
              ideal={m.ideal}
              color={m.color}
              barValue={m.value || 0}
              barMin={m.barMin}
              barMax={m.barMax}
              currentColors={currentColors}
            />
          ))}
        </View>

        {/* Info extra */}
        <View style={[styles.infoCard, { backgroundColor: currentColors.bgCard, borderColor: currentColors.borderColor }]}>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={18} color={currentColors.textMuted} />
            <Text style={[styles.infoLabel, { color: currentColors.textSecondary }]}>Capacidad</Text>
            <Text style={[styles.infoValue, { color: currentColors.textPrimary }]}>{env.capacity} personas</Text>
          </View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: currentColors.borderColor, paddingTop: 12 }]}>
            <Ionicons name="location-outline" size={18} color={currentColors.textMuted} />
            <Text style={[styles.infoLabel, { color: currentColors.textSecondary }]}>Ubicación</Text>
            <Text style={[styles.infoValue, { color: currentColors.textPrimary }]}>{env.location}</Text>
          </View>
        </View>

        {/* Calificación del aula — igual que web */}
        <Text style={[styles.sectionTitle, { color: currentColors.textPrimary }]}>Calificación del aula</Text>
        <RatingCard
          rating={rating}
          setRating={setRating}
          onSubmit={handleSubmitRating}
          submitted={ratingSubmitted}
          currentColors={currentColors}
        />

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 55, paddingBottom: 20,
    gap: 12, borderBottomWidth: 2,
  },
  backBtn:           { padding: 4 },
  headerTitleBlock:  { flex: 1 },
  headerTitle:       { fontSize: 20, fontWeight: 'bold' },
  headerLocation:    { fontSize: 13 },

  scroll:        { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 10 },

  statusCard: {
    borderRadius: 15, padding: 20, marginBottom: 12, borderWidth: 1,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  statusRow:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusInfo: {},
  statusLabel:{ fontSize: 12, marginBottom: 2 },
  statusValue:{ fontSize: 18, fontWeight: 'bold' },
  qualityBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  qualityText:  { fontSize: 12, fontWeight: '600' },

  qualityBanner: {
    borderLeftWidth: 4, borderRadius: 10, padding: 14,
    marginBottom: 16, flexDirection: 'row', gap: 12, alignItems: 'center',
  },
  qualityBannerLabel: { fontSize: 12 },
  qualityBannerValue: { fontSize: 16, fontWeight: 'bold' },
  qualityBannerDesc:  { fontSize: 12, flex: 1 },

  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10, marginTop: 4 },

  metricsGrid: { gap: 10, marginBottom: 16 },
  metricCard:  { borderRadius: 12, padding: 14, marginBottom: 4 },
  metricTop:   { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  metricIcon:  { fontSize: 22 },
  metricInfo:  { flex: 1 },
  metricLabel: { fontSize: 13, marginBottom: 2 },
  metricValue: { fontSize: 20, fontWeight: 'bold' },
  metricUnit:  { fontSize: 14, fontWeight: 'normal' },
  barTrack:    { height: 6, backgroundColor: '#f0f0f0', borderRadius: 3, flexDirection: 'row', overflow: 'hidden', marginBottom: 4 },
  barFill:     { height: '100%' },
  idealText:   { fontSize: 11, textAlign: 'right' },

  infoCard: { borderRadius: 12, padding: 16, borderWidth: 1, marginBottom: 16 },
  infoRow:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoLabel:{ fontSize: 13, flex: 1 },
  infoValue:{ fontSize: 14, fontWeight: '600' },

  // Rating
  ratingCard: { borderRadius: 14, borderWidth: 1, padding: 18, alignItems: 'center', gap: 14 },
  ratingQuestion: { fontSize: 15, fontWeight: '600', textAlign: 'center' },
  starsRow:   { flexDirection: 'row', gap: 10 },
  star:       { fontSize: 38 },
  ratingBtn:  { borderRadius: 12, paddingHorizontal: 24, paddingVertical: 13, alignItems: 'center' },
  ratingBtnTxt:{ fontSize: 15, fontWeight: 'bold' },
  ratingSubmittedRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ratingSubmittedTxt: { fontSize: 14, fontWeight: '500', flex: 1 },
})