import { useState, useEffect } from 'react'
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

export default function EnvironmentDetailScreen({ route, navigation }) {
  const { envId } = route.params
  const { darkMode, currentColors, loaded } = useTheme()

  const { environments, toggleFavorite } = useEnvironments()
  const env = environments.find((e) => e.id === envId)
  const [rating, setRating] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  if (!env) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: lightColors.bgBody }]}>
        <StatusBar barStyle="dark-content" backgroundColor={lightColors.bgBody} />
        <View style={styles.center}>
          <Text style={[styles.notFound, { color: lightColors.textPrimary }]}>Ambiente no encontrado</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: lightColors.accent }}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  const statusColor = STATUS_COLORS[env.statusKey] || '#00b894'
  const statusDim = STATUS_DIM[env.statusKey] || 'rgba(0,184,148,0.1)'
  const statusLabel = STATUS_LABELS[env.statusKey] || env.statusKey
  const qualityLabel = QUALITY_LABELS[env.qualityKey] || env.qualityKey
  const qualityColor = QUALITY_COLORS[env.qualityKey] || '#00b894'
  const ideal = IDEAL_RANGES[env.qualityKey] || '-'

  const StatusIcon = () => {
    const iconMap = {
      normal: 'checkmark-circle',
      warning: 'warning',
      alert: 'alert-circle',
    }
    return (
      <Ionicons
        name={iconMap[env.statusKey] || 'help-circle'}
        size={28}
        color={statusColor}
      />
    )
  }

  if (!loaded) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: lightColors.bgBody }]}>
        <StatusBar barStyle="dark-content" backgroundColor={lightColors.bgBody} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: lightColors.textMuted }}>Cargando...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: currentColors.bgBody }]}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={currentColors.bgBody} />

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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <View style={[styles.statusCard, { backgroundColor: currentColors.bgCard, borderColor: currentColors.borderColor }]}>
          <View style={styles.statusRow}>
            <StatusIcon />
            <View style={styles.statusInfo}>
              <Text style={[styles.statusLabel, { color: currentColors.textMuted }]}>Estado</Text>
              <Text style={[styles.statusValue, { color: statusColor }]}>{statusLabel}</Text>
            </View>
          </View>
          <View style={[styles.qualityBadge, { backgroundColor: qualityColor + '20', borderColor: qualityColor }]}>
            <Text style={[styles.qualityText, { color: qualityColor }]}>{qualityLabel}</Text>
          </View>
        </View>

        {/* Metrics */}
        <View style={styles.metricsGrid}>
          <MetricCard
            icon="💨"
            label="Calidad del aire"
            value={env.airQuality || '--'}
            unit=""
            ideal={ideal}
            color={qualityColor}
            barValue={env.airQuality || 0}
            barMin={0}
            barMax={100}
            currentColors={currentColors}
          />
          <MetricCard
            icon="🌡️"
            label="Temperatura"
            value={env.temperature !== undefined ? env.temperature : '--'}
            unit="°C"
            ideal="20-24°C"
            color="#00b894"
            barValue={env.temperature || 0}
            barMin={10}
            barMax={40}
            currentColors={currentColors}
          />
          <MetricCard
            icon="💧"
            label="Humedad"
            value={env.humidity !== undefined ? env.humidity : '--'}
            unit="%"
            ideal="40-60%"
            color="#00b894"
            barValue={env.humidity || 0}
            barMin={0}
            barMax={100}
            currentColors={currentColors}
          />
        </View>

        {/* Info extra */}
        <View style={[styles.infoCard, { backgroundColor: currentColors.bgCard, borderColor: currentColors.borderColor }]}>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={18} color={currentColors.textMuted} />
            <Text style={[styles.infoLabel, { color: currentColors.textSecondary }]}>Capacidad</Text>
            <Text style={[styles.infoValue, { color: currentColors.textPrimary }]}>{env.capacity} personas</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={currentColors.textMuted} />
            <Text style={[styles.infoLabel, { color: currentColors.textSecondary }]}>Ubicación</Text>
            <Text style={[styles.infoValue, { color: currentColors.textPrimary }]}>{env.location}</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0fafa' },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFound: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 10 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    gap: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#00b894',
  },
  backBtn: { padding: 4 },
  headerTitleBlock: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerLocation: { fontSize: 13, color: '#999999' },

  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 10 },

  statusCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusInfo: {},
  statusLabel: { fontSize: 12, marginBottom: 2 },
  statusValue: { fontSize: 18, fontWeight: 'bold' },
  qualityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  qualityText: { fontSize: 12, fontWeight: '600' },

  metricsGrid: { gap: 12, marginBottom: 20 },

  metricCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  metricTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  metricIcon: { fontSize: 24 },
  metricInfo: { flex: 1 },
  metricLabel: { fontSize: 13, marginBottom: 2 },
  metricValue: { fontSize: 20, fontWeight: 'bold' },
  metricUnit: { fontSize: 14, fontWeight: 'normal' },
  barTrack: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: { height: '100%' },
  idealText: { fontSize: 11, textAlign: 'right' },

  infoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  infoLabel: { fontSize: 13, flex: 1 },
  infoValue: { fontSize: 14, fontWeight: '600' },
})