import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/colors'
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

function MetricCard({ icon, label, value, unit, ideal, color, barValue, barMin, barMax }) {
  return (
    <View style={[styles.metricCard, { borderLeftColor: color, borderLeftWidth: 3 }]}>
      <View style={styles.metricTop}>
        <Text style={styles.metricIcon}>{icon}</Text>
        <View style={styles.metricInfo}>
          <Text style={styles.metricLabel}>{label}</Text>
          <Text style={[styles.metricValue, { color }]}>
            {value}<Text style={styles.metricUnit}>{unit}</Text>
          </Text>
        </View>
      </View>
      <MetricBar value={barValue} min={barMin} max={barMax} color={color} />
      <Text style={styles.idealText}>Ideal: {ideal}</Text>
    </View>
  )
}

export default function EnvironmentDetailScreen({ route, navigation }) {
  const { envId } = route.params
  const { environments, toggleFavorite } = useEnvironments()
  const env = environments.find((e) => e.id === envId)
  const [rating, setRating] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  if (!env) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.notFound}>Ambiente no encontrado</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.accent }}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  const statusColor = STATUS_COLORS[env.statusKey] || colors.accent
  const statusDim = STATUS_DIM[env.statusKey] || colors.accentDim
  const statusLabel = STATUS_LABELS[env.statusKey] || env.statusKey
  const qualityLabel = QUALITY_LABELS[env.qualityKey] || env.qualityKey
  const qualityColor = QUALITY_COLORS[env.qualityKey] || colors.accent

  const StatusIcon = () => {
    const icons = { normal: 'checkmark-circle', warning: 'warning', alert: 'alert-circle' }
    return (
      <Ionicons
        name={icons[env.statusKey] || 'information-circle'}
        size={20}
        color={statusColor}
      />
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBody} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.accent} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Detalle</Text>
        <TouchableOpacity
          onPress={() => toggleFavorite(env.id, !env.isFavorite)}
        >
          <Ionicons
            name={env.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={env.isFavorite ? '#ff6b6b' : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Environment hero card */}
        <View style={[styles.heroCard, { borderColor: statusColor }]}>
          <View style={styles.heroTop}>
            <Text style={styles.heroName}>{env.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusDim, borderColor: statusColor }]}>
              <StatusIcon />
              <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
            </View>
          </View>
          <View style={styles.heroMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>{env.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>{env.capacity} personas</Text>
            </View>
          </View>
          <View style={[styles.qualityRow, { backgroundColor: `${qualityColor}15`, borderColor: qualityColor }]}>
            <Text style={styles.qualityLabel}>Calidad del aire:</Text>
            <Text style={[styles.qualityValue, { color: qualityColor }]}>{qualityLabel}</Text>
          </View>
        </View>

        {/* Metrics */}
        <Text style={styles.sectionTitle}>Métricas en tiempo real</Text>

        <MetricCard
          icon="🌡️"
          label="Temperatura"
          value={env.temp}
          unit="°C"
          ideal={IDEAL_RANGES.temperature}
          color="#ff8a65"
          barValue={env.temp}
          barMin={10}
          barMax={40}
        />
        <MetricCard
          icon="💧"
          label="Humedad"
          value={env.humidity}
          unit="%"
          ideal={IDEAL_RANGES.humidity}
          color="#4fc3f7"
          barValue={env.humidity}
          barMin={0}
          barMax={100}
        />
        <MetricCard
          icon="🌫️"
          label="CO₂"
          value={env.co2}
          unit=" ppm"
          ideal={IDEAL_RANGES.co2}
          color="#ce93d8"
          barValue={env.co2}
          barMin={300}
          barMax={2000}
        />
        <MetricCard
          icon="🔊"
          label="Ruido"
          value={env.noise}
          unit=" dB"
          ideal={IDEAL_RANGES.noise}
          color="#ffcc02"
          barValue={env.noise}
          barMin={20}
          barMax={100}
        />

        {/* Rating */}
        <Text style={styles.sectionTitle}>Tu experiencia</Text>
        <View style={styles.ratingCard}>
          <Text style={styles.ratingQuestion}>
            ¿Cómo percibes el confort de este ambiente?
          </Text>
          {ratingSubmitted ? (
            <View style={styles.ratingThanks}>
              <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
              <Text style={styles.thanksText}>¡Gracias por tu calificación!</Text>
              <TouchableOpacity onPress={() => { setRatingSubmitted(false); setRating(0) }}>
                <Text style={{ color: colors.accent, fontSize: 13, marginTop: 6 }}>Calificar de nuevo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
                  >
                    <Text style={[styles.star, rating >= star && styles.starActive]}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={[styles.submitBtn, rating === 0 && styles.submitBtnDisabled]}
                onPress={() => rating > 0 && setRatingSubmitted(true)}
                disabled={rating === 0}
              >
                <Text style={styles.submitBtnText}>Enviar calificación</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBody },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { color: colors.textPrimary, fontSize: 16, marginBottom: 12 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    borderWidth: 1, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18, fontWeight: 'bold',
    color: colors.textPrimary, flex: 1,
    textAlign: 'center', marginHorizontal: 10,
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  heroCard: {
    backgroundColor: colors.bgCard, borderRadius: 16,
    borderWidth: 2, padding: 18, marginBottom: 20,
  },
  heroTop: { marginBottom: 10 },
  heroName: {
    fontSize: 22, fontWeight: 'bold',
    color: colors.textPrimary, marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-start', borderRadius: 20,
    borderWidth: 1, paddingHorizontal: 12, paddingVertical: 5,
  },
  statusText: { fontSize: 13, fontWeight: '600' },
  heroMeta: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 13, color: colors.textMuted },
  qualityRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8,
  },
  qualityLabel: { fontSize: 14, color: colors.textSecondary },
  qualityValue: { fontSize: 14, fontWeight: 'bold' },

  sectionTitle: {
    fontSize: 16, fontWeight: 'bold',
    color: colors.textPrimary, marginBottom: 12, marginTop: 4,
  },

  metricCard: {
    backgroundColor: colors.bgCard, borderRadius: 12,
    borderWidth: 1, borderColor: colors.borderColor,
    padding: 14, marginBottom: 10,
  },
  metricTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  metricIcon: { fontSize: 26 },
  metricInfo: { flex: 1 },
  metricLabel: { fontSize: 12, color: colors.textMuted, marginBottom: 2 },
  metricValue: { fontSize: 22, fontWeight: 'bold' },
  metricUnit: { fontSize: 14, fontWeight: 'normal' },
  barTrack: {
    height: 6, backgroundColor: colors.bgInput,
    borderRadius: 3, overflow: 'hidden', marginBottom: 6,
    flexDirection: 'row',
  },
  barFill: { height: 6, borderRadius: 3 },
  idealText: { fontSize: 11, color: colors.textMuted },

  ratingCard: {
    backgroundColor: colors.bgCard, borderRadius: 16,
    borderWidth: 1, borderColor: colors.borderColor,
    padding: 20, marginBottom: 10,
  },
  ratingQuestion: {
    fontSize: 15, color: colors.textSecondary,
    textAlign: 'center', marginBottom: 16, lineHeight: 22,
  },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 18 },
  star: { fontSize: 36, color: colors.borderColor },
  starActive: { color: '#FFC107' },
  submitBtn: {
    backgroundColor: colors.accent, borderRadius: 10,
    padding: 14, alignItems: 'center',
  },
  submitBtnDisabled: { opacity: 0.4 },
  submitBtnText: { color: colors.bgBody, fontWeight: 'bold', fontSize: 15 },
  ratingThanks: { alignItems: 'center', paddingVertical: 10 },
  thanksText: { fontSize: 15, color: colors.textPrimary, marginTop: 8 },
})