import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Modal,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/colors'
import { useEnvironments } from '../../context/EnvironmentsContext'
import {
  STATUS_COLORS, STATUS_LABELS,
  QUALITY_LABELS, IDEAL_RANGES,
} from '../../constants/environments'

function MetricBar({ value, min, max }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const barColor = pct < 60 ? '#4CAF50' : pct < 80 ? '#FFC107' : '#F44336'
  return (
    <View style={barStyles.track}>
      <View style={[barStyles.fill, { width: `${pct}%`, backgroundColor: barColor }]} />
    </View>
  )
}

const barStyles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: colors.bgInput,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 6,
  },
  fill: { height: '100%', borderRadius: 3 },
})

export default function EnvironmentDetailScreen({ navigation, route }) {
  const { envId } = route.params
  const { environments, toggleFavorite } = useEnvironments()
  const [rating, setRating] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const env = environments.find((e) => e.id === envId)

  if (!env) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Ambiente no encontrado</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.accent }}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  const statusColor = STATUS_COLORS[env.status]

  const metrics = [
    {
      icon: '🌡️',
      label: 'Temperatura',
      value: `${env.temp}°C`,
      ideal: IDEAL_RANGES.temperature,
      numericValue: env.temp,
      min: 0,
      max: 40,
    },
    {
      icon: '💧',
      label: 'Humedad',
      value: `${env.humidity}%`,
      ideal: IDEAL_RANGES.humidity,
      numericValue: env.humidity,
      min: 0,
      max: 100,
    },
    {
      icon: '🌫️',
      label: 'CO₂',
      value: `${env.co2} ppm`,
      ideal: IDEAL_RANGES.co2,
      numericValue: env.co2,
      min: 300,
      max: 2000,
    },
    {
      icon: '🔊',
      label: 'Ruido',
      value: `${env.noise} dB`,
      ideal: IDEAL_RANGES.noise,
      numericValue: env.noise,
      min: 0,
      max: 100,
    },
  ]

  const handleRatingSubmit = () => {
    setRatingSubmitted(true)
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBody} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.accent} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Detalle del ambiente</Text>
        <TouchableOpacity onPress={() => toggleFavorite(env.id)} style={styles.favBtn}>
          <Ionicons
            name={env.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={env.isFavorite ? '#ff6b6b' : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Environment info card */}
        <View style={[styles.infoCard, { borderColor: statusColor }]}>
          <View style={styles.infoRow}>
            <View style={styles.infoMain}>
              <Text style={styles.envName}>{env.name}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                <Text style={styles.locationText}>{env.location}</Text>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="people-outline" size={13} color={colors.textMuted} />
                <Text style={styles.locationText}>Capacidad: {env.capacity}</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { borderColor: statusColor, backgroundColor: `${statusColor}15` }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {STATUS_LABELS[env.status]}
              </Text>
            </View>
          </View>
          <View style={styles.qualityRow}>
            <Text style={styles.qualityLabel}>Calidad del aire: </Text>
            <Text style={[styles.qualityValue, { color: statusColor }]}>
              {QUALITY_LABELS[env.quality]}
            </Text>
          </View>
        </View>

        {/* Metrics */}
        <Text style={styles.sectionTitle}>Métricas actuales</Text>
        <View style={styles.metricsContainer}>
          {metrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricIcon}>{metric.icon}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
              </View>
              <MetricBar
                value={metric.numericValue}
                min={metric.min}
                max={metric.max}
              />
              <View style={styles.idealRow}>
                <Text style={styles.idealLabel}>Rango ideal: </Text>
                <Text style={styles.idealValue}>{metric.ideal}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Rating card */}
        <Text style={styles.sectionTitle}>Calificación del ambiente</Text>
        <View style={styles.ratingCard}>
          {ratingSubmitted ? (
            <View style={styles.ratingSuccess}>
              <Text style={styles.ratingSuccessIcon}>✅</Text>
              <Text style={styles.ratingSuccessText}>¡Gracias por tu calificación!</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Text key={s} style={[styles.star, s <= rating && styles.starActive]}>★</Text>
                ))}
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.ratingQuestion}>
                ¿Cómo percibes el confort de este ambiente?
              </Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <TouchableOpacity key={s} onPress={() => setRating(s)}>
                    <Text style={[styles.star, s <= rating && styles.starActive]}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={[styles.ratingBtn, rating === 0 && styles.ratingBtnDisabled]}
                onPress={() => rating > 0 && setModalVisible(true)}
              >
                <Text style={styles.ratingBtnText}>⭐ Enviar calificación</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Confirm modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Confirmar calificación</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Text key={s} style={[styles.star, s <= rating && styles.starActive]}>★</Text>
              ))}
            </View>
            <Text style={styles.modalText}>
              Estás a punto de enviar {rating} estrella{rating !== 1 ? 's' : ''} para este ambiente.
            </Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleRatingSubmit}
              >
                <Text style={styles.modalConfirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBody },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { color: colors.textPrimary, fontSize: 18 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  favBtn: { padding: 4 },
  content: { padding: 16, gap: 14, paddingBottom: 30 },
  infoCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 2,
    padding: 16,
    gap: 10,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  infoMain: { flex: 1, gap: 4 },
  envName: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 12, color: colors.textMuted },
  statusBadge: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  qualityRow: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.borderColor, paddingTop: 10 },
  qualityLabel: { color: colors.textMuted, fontSize: 13 },
  qualityValue: { fontSize: 13, fontWeight: 'bold' },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: colors.textPrimary },
  metricsContainer: { gap: 10 },
  metricCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 14,
    gap: 2,
  },
  metricHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metricIcon: { fontSize: 18 },
  metricLabel: { flex: 1, fontSize: 14, color: colors.textSecondary },
  metricValue: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary },
  idealRow: { flexDirection: 'row', marginTop: 4 },
  idealLabel: { fontSize: 11, color: colors.textMuted },
  idealValue: { fontSize: 11, color: colors.accent },
  ratingCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 20,
    alignItems: 'center',
    gap: 14,
  },
  ratingQuestion: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  starsRow: { flexDirection: 'row', gap: 8 },
  star: { fontSize: 36, color: colors.borderColor },
  starActive: { color: '#FFC107' },
  ratingBtn: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  ratingBtnDisabled: { opacity: 0.4 },
  ratingBtnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 14 },
  ratingSuccess: { alignItems: 'center', gap: 10 },
  ratingSuccessIcon: { fontSize: 36 },
  ratingSuccessText: { fontSize: 14, color: colors.textSecondary },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary },
  modalText: { fontSize: 13, color: colors.textSecondary, textAlign: 'center' },
  modalBtns: { flexDirection: 'row', gap: 12, marginTop: 4 },
  modalCancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: { color: colors.textSecondary, fontWeight: '600' },
  modalConfirmBtn: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalConfirmText: { color: '#0f172a', fontWeight: 'bold' },
})