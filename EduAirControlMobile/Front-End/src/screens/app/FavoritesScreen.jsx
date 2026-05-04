import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/colors'
import {
  STATUS_COLORS, STATUS_DIM, STATUS_LABELS,
  QUALITY_LABELS, QUALITY_COLORS,
} from '../../constants/environments'
import { useEnvironments } from '../../context/EnvironmentsContext'

export default function FavoritesScreen({ navigation }) {
  const { environments, toggleFavorite } = useEnvironments()
  const favorites = environments.filter((e) => e.isFavorite)

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBody} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Ionicons name="heart" size={35} color="#ff6b6b" />
          <Text style={styles.headerText}>Favoritos</Text>
        </View>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          {favorites.length === 0
            ? 'No tienes ambientes favoritos aún'
            : `${favorites.length} ambiente${favorites.length > 1 ? 's' : ''} guardado${favorites.length > 1 ? 's' : ''}`}
        </Text>

        {favorites.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={64} color={colors.borderColor} />
            <Text style={styles.emptyTitle}>Sin favoritos</Text>
            <Text style={styles.emptyText}>
              Toca el ❤️ en cualquier ambiente del dashboard para guardarlo aquí
            </Text>
            <TouchableOpacity
              style={styles.goBackBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.goBackText}>Ir al Dashboard</Text>
            </TouchableOpacity>
          </View>
        ) : (
          favorites.map((fav) => {
            const statusColor = STATUS_COLORS[fav.statusKey] || colors.accent
            const statusDim = STATUS_DIM[fav.statusKey] || colors.accentDim
            const statusLabel = STATUS_LABELS[fav.statusKey] || fav.statusKey
            const qualityColor = QUALITY_COLORS[fav.qualityKey] || colors.accent
            const qualityLabel = QUALITY_LABELS[fav.qualityKey] || fav.qualityKey

            return (
              <TouchableOpacity
                key={fav.id}
                style={styles.favCard}
                onPress={() => navigation.navigate('EnvironmentDetail', { envId: fav.id })}
                activeOpacity={0.85}
              >
                {/* Card header */}
                <View style={styles.favHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.favName}>{fav.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusDim, borderColor: statusColor }]}>
                      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                      <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(fav.id, false)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="heart" size={30} color="#ff6b6b" />
                  </TouchableOpacity>
                </View>

                {/* Location */}
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.locationText}>{fav.location}</Text>
                </View>

                {/* Metrics grid */}
                <View style={styles.metricsGrid}>
                  {[
                    { icon: '🌡️', label: 'Temperatura', value: `${fav.temp}°C`, color: '#ff8a65' },
                    { icon: '💧', label: 'Humedad', value: `${fav.humidity}%`, color: '#4fc3f7' },
                    { icon: '🌫️', label: 'CO₂', value: `${fav.co2} ppm`, color: '#ce93d8' },
                    { icon: '🔊', label: 'Ruido', value: `${fav.noise} dB`, color: '#ffcc02' },
                  ].map((m) => (
                    <View key={m.label} style={styles.metricItem}>
                      <Text style={styles.metricIcon}>{m.icon}</Text>
                      <Text style={styles.metricLabel}>{m.label}</Text>
                      <Text style={[styles.metricValue, { color: m.color }]}>{m.value}</Text>
                    </View>
                  ))}
                </View>

                {/* Footer */}
                <View style={[styles.favFooter, { borderTopColor: colors.borderColor }]}>
                  <Text style={styles.footerLabel}>Calidad del aire</Text>
                  <Text style={[styles.footerValue, { color: qualityColor }]}>{qualityLabel}</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={styles.tapHint}>Ver detalle →</Text>
                </View>
              </TouchableOpacity>
            )
          })
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBody },

  header: {
    flexDirection: 'column', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 55, marginBottom: -30,
  },

  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerText: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  subtitle: {
    fontSize: 13, color: colors.textMuted,
    marginBottom: 16, marginTop: 2,
  },

  empty: { alignItems: 'center', marginTop: 60, paddingHorizontal: 20 },
  emptyTitle: {
    fontSize: 20, fontWeight: 'bold',
    color: colors.textPrimary, marginTop: 16, marginBottom: 8,
  },
  emptyText: {
    fontSize: 14, color: colors.textMuted,
    textAlign: 'center', lineHeight: 22, marginBottom: 28,
  },
  
  goBackText: { color: colors.bgBody, fontWeight: 'bold', fontSize: 15 },

  favCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 16, borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 16, marginBottom: 14,
  },
  favHeader: {
    flexDirection: 'row', alignItems: 'flex-start',
    marginBottom: 6,
  },
  favName: {
    fontSize: 16, fontWeight: 'bold',
    color: colors.textPrimary, marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    alignSelf: 'flex-start', borderRadius: 20, borderWidth: 1,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },

  locationRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12,
  },
  locationText: { fontSize: 12, color: colors.textMuted },

  metricsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12,
  },
  metricItem: {
    width: '47%', backgroundColor: colors.bgInput,
    borderRadius: 10, borderWidth: 1, borderColor: colors.borderColor,
    padding: 10, alignItems: 'flex-start',
  },
  metricIcon: { fontSize: 16, marginBottom: 4 },
  metricLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 2 },
  metricValue: { fontSize: 15, fontWeight: 'bold' },

  favFooter: {
    flexDirection: 'row', alignItems: 'center',
    borderTopWidth: 1, paddingTop: 10, gap: 6,
  },
  footerLabel: { fontSize: 13, color: colors.textMuted },
  footerValue: { fontSize: 13, fontWeight: 'bold' },
  tapHint: { fontSize: 12, color: colors.accent },
})