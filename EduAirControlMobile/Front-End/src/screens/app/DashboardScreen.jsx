import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, TextInput,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../styles/colors'
import {
  STATUS_COLORS, STATUS_DIM, STATUS_LABELS,
  QUALITY_LABELS, QUALITY_COLORS,
} from '../../constants/environments'
import { useEnvironments } from '../../context/EnvironmentsContext'

function MetricChip({ icon, value, color }) {
  return (
    <View style={[styles.chip, { borderColor: color || colors.borderColor }]}>
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={[styles.chipValue, { color: color || colors.textSecondary }]}>{value}</Text>
    </View>
  )
}

function EnvironmentCard({ environment, onPress, onToggleFavorite }) {
  const statusColor = STATUS_COLORS[environment.statusKey] || colors.accent
  const statusDim = STATUS_DIM[environment.statusKey] || colors.accentDim
  const statusLabel = STATUS_LABELS[environment.statusKey] || environment.statusKey
  const qualityLabel = QUALITY_LABELS[environment.qualityKey] || environment.qualityKey
  const qualityColor = QUALITY_COLORS[environment.qualityKey] || colors.accent

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleBlock}>
          <Text style={styles.cardName} numberOfLines={1}>{environment.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusDim, borderColor: statusColor }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onToggleFavorite(environment.id, !environment.isFavorite)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={environment.isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={environment.isFavorite ? '#ff6b6b' : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Location */}
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={13} color={colors.textMuted} />
        <Text style={styles.locationText}>{environment.location}</Text>
        <Ionicons name="people-outline" size={13} color={colors.textMuted} style={{ marginLeft: 10 }} />
        <Text style={styles.locationText}>{environment.capacity} personas</Text>
      </View>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        <MetricChip icon="🌡️" value={`${environment.temp}°C`} color="#ff8a65" />
        <MetricChip icon="💧" value={`${environment.humidity}%`} color="#4fc3f7" />
        <MetricChip icon="🌫️" value={`${environment.co2}ppm`} color="#ce93d8" />
        <MetricChip icon="🔊" value={`${environment.noise}dB`} color="#ffcc02" />
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <Text style={styles.footerLabel}>Calidad del aire</Text>
        <Text style={[styles.footerValue, { color: qualityColor }]}>{qualityLabel}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function DashboardScreen({ navigation }) {
  const { environments, toggleFavorite } = useEnvironments()
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  const counts = {
    all: environments.length,
    normal: environments.filter((e) => e.statusKey === 'normal').length,
    warning: environments.filter((e) => e.statusKey === 'warning').length,
    alert: environments.filter((e) => e.statusKey === 'alert').length,
  }

  const filtered = environments.filter((env) => {
    const matchStatus = activeFilter === 'all' || env.statusKey === activeFilter
    const matchSearch = env.name.toLowerCase().includes(search.toLowerCase()) ||
      env.location.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const statCards = [
    { key: 'all',     label: 'Todos',       count: counts.all,     color: colors.accent, icon: '🏫' },
    { key: 'normal',  label: 'Normal',      count: counts.normal,  color: '#4CAF50',     icon: '✅' },
    { key: 'warning', label: 'Advertencia', count: counts.warning, color: '#FFC107',     icon: '⚠️' },
    { key: 'alert',   label: 'Alerta',      count: counts.alert,   color: '#F44336',     icon: '🚨' },
  ]

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBody} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Bienvenido Administrador</Text>
          <Text style={styles.subtitle}>Monitoreo de ambientes</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={16} color={colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ambiente..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Stat Cards — también son filtros */}
      <View style={styles.statsRow}>
        {statCards.map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[
              styles.statCard,
              { borderColor: s.color, backgroundColor: `${s.color}10` },
              activeFilter === s.key && { backgroundColor: `${s.color}30`, borderWidth: 2 },
            ]}
            onPress={() => setActiveFilter(s.key)}
            activeOpacity={0.75}
          >
            <Text style={styles.statEmoji}>{s.icon}</Text>
            <Text style={[styles.statCount, { color: s.color }]}>{s.count}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cards */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptyText}>Intenta con otro filtro o término</Text>
          </View>
        ) : (
          filtered.map((env) => (
            <EnvironmentCard
              key={env.id}
              environment={env}
              onPress={() => navigation.navigate('EnvironmentDetail', { envId: env.id })}
              onToggleFavorite={toggleFavorite}
            />
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBody },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 6,
  },
  greeting: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2, textAlign: 'center' },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: 12, marginHorizontal: 20, marginVertical: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: colors.borderColor,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: colors.textPrimary, fontSize: 14 },

  statsRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 20, marginBottom: 12,
  },
  statCard: {
    flex: 1, borderRadius: 12, borderWidth: 1,
    padding: 10, alignItems: 'center',
  },
  statEmoji: { fontSize: 16, marginBottom: 2 },
  statCount: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 10, color: colors.textMuted, marginTop: 2, textAlign: 'center' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 4 },

  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 16, borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 16, marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 6,
  },
  cardTitleBlock: { flex: 1, marginRight: 10 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 4 },
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

  metricsRow: { flexDirection: 'row', gap: 6, marginBottom: 12, flexWrap: 'wrap' },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 8, borderWidth: 1,
    paddingHorizontal: 8, paddingVertical: 5,
    backgroundColor: colors.bgInput,
  },
  chipIcon: { fontSize: 12 },
  chipValue: { fontSize: 12, fontWeight: '600' },

  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', borderTopWidth: 1,
    borderTopColor: colors.borderColor, paddingTop: 10,
  },
  footerLabel: { fontSize: 13, color: colors.textMuted },
  footerValue: { fontSize: 13, fontWeight: 'bold' },

  empty: { alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  emptyText: { fontSize: 14, color: colors.textMuted, marginTop: 6 },
})