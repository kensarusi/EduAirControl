import { useState, useEffect } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, TextInput,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'
import {
  STATUS_COLORS, STATUS_DIM, STATUS_LABELS,
  QUALITY_LABELS, QUALITY_COLORS,
} from '../../constants/environments'
import { useEnvironments } from '../../context/EnvironmentsContext'

function MetricChip({ icon, value, color }) {
  return (
    <View style={[styles.chip, { borderColor: color || '#cccccc' }]}>
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={[styles.chipValue, { color: color || '#666666' }]}>{value}</Text>
    </View>
  )
}

function EnvironmentCard({ environment, onPress, onToggleFavorite, currentColors }) {
  const statusColor = STATUS_COLORS[environment.statusKey] || '#00b894'
  const statusDim = STATUS_DIM[environment.statusKey] || 'rgba(0,184,148,0.1)'
  const statusLabel = STATUS_LABELS[environment.statusKey] || environment.statusKey
  const qualityLabel = QUALITY_LABELS[environment.qualityKey] || environment.qualityKey
  const qualityColor = QUALITY_COLORS[environment.qualityKey] || '#00b894'

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: currentColors.bgCard }]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleBlock}>
          <Text style={[styles.cardName, { color: currentColors.textPrimary }]} numberOfLines={1}>{environment.name}</Text>
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
            color={environment.isFavorite ? '#ff6b6b' : currentColors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={13} color={currentColors.textMuted} />
        <Text style={[styles.locationText, { color: currentColors.textMuted }]}>{environment.location}</Text>
        <Ionicons name="people-outline" size={13} color={currentColors.textMuted} style={{ marginLeft: 10 }} />
        <Text style={[styles.locationText, { color: currentColors.textMuted }]}>{environment.capacity} personas</Text>
      </View>

      <View style={styles.metricsRow}>
        <MetricChip icon="💨" value={environment.airQuality || '--'} color={qualityColor} />
        <MetricChip icon="🌡️" value={environment.temperature !== undefined ? `${environment.temperature}°C` : '--'} color="#00b894" />
        <MetricChip icon="💧" value={environment.humidity !== undefined ? `${environment.humidity}%` : '--'} color="#00b894" />
      </View>

      <View style={[styles.qualityRow, { borderTopColor: currentColors.borderColor }]}>
        <Text style={[styles.qualityLabel, { color: currentColors.textSecondary }]}>Calidad del aire</Text>
        <Text style={[styles.qualityValue, { color: qualityColor }]}>{qualityLabel}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function DashboardScreen({ navigation }) {
  const { darkMode, currentColors, loaded } = useTheme()
  const [search, setSearch] = useState('')

  const { environments, toggleFavorite } = useEnvironments()

  const filtered = environments.filter(env =>
    env.name.toLowerCase().includes(search.toLowerCase()) ||
    env.location.toLowerCase().includes(search.toLowerCase())
  )

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
        <Text style={[styles.headerTitle, { color: currentColors.textPrimary }]}>Dashboard</Text>
        <View style={[styles.searchBar, { backgroundColor: currentColors.bgInput, borderColor: currentColors.borderColor }]}>
          <Ionicons name="search-outline" size={16} color={currentColors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: currentColors.textPrimary }]}
            placeholder="Buscar ambiente..."
            placeholderTextColor={currentColors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color={currentColors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={52} color={currentColors.borderColor} />
            <Text style={[styles.emptyTitle, { color: currentColors.textPrimary }]}>Sin ambientes</Text>
            <Text style={[styles.emptyText, { color: currentColors.textMuted }]}>
              {search ? 'No hay resultados para tu búsqueda' : 'No hay ambientes registrados'}
            </Text>
          </View>
        ) : (
          filtered.map((env) => (
            <EnvironmentCard
              key={env.id}
              environment={env}
              onPress={() => navigation.navigate('EnvironmentDetail', { envId: env.id })}
              onToggleFavorite={toggleFavorite}
              currentColors={currentColors}
            />
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0fafa' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    gap: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#00b894',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },

  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 14 },

  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 10 },

  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitleBlock: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '600' },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  locationText: { fontSize: 12, color: '#999999' },

  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipIcon: { fontSize: 12 },
  chipValue: { fontSize: 12, fontWeight: '600' },

  qualityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  qualityLabel: { fontSize: 12, color: '#666666', flex: 1 },
  qualityValue: { fontSize: 13, fontWeight: '600', flexShrink: 0 },

  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 10,
  },
  emptyTitle: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  emptyText: { fontSize: 13, color: '#999999', textAlign: 'center' },
})