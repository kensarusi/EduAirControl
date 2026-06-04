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
} from '../../constants/environments'
import { useEnvironments } from '../../context/EnvironmentsContext'

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
        <View style={[styles.metricChip, { borderColor: qualityColor }]}>
          <Text style={styles.metricIcon}>💨</Text>
          <Text style={[styles.metricValue, { color: qualityColor }]}>{environment.airQuality || '--'}</Text>
        </View>
        <View style={[styles.metricChip, { borderColor: '#00b894' }]}>
          <Text style={styles.metricIcon}>🌡️</Text>
          <Text style={[styles.metricValue, { color: '#00b894' }]}>
            {environment.temperature !== undefined ? `${environment.temperature}°C` : '--'}
          </Text>
        </View>
        <View style={[styles.metricChip, { borderColor: '#00b894' }]}>
          <Text style={styles.metricIcon}>💧</Text>
          <Text style={[styles.metricValue, { color: '#00b894' }]}>
            {environment.humidity !== undefined ? `${environment.humidity}%` : '--'}
          </Text>
        </View>
      </View>

      <View style={[styles.qualityRow, { borderTopColor: currentColors.borderColor }]}>
        <Text style={[styles.qualityLabel, { color: currentColors.textSecondary }]}>Calidad del aire</Text>
        <Text style={[styles.qualityValue, { color: qualityColor }]}>{qualityLabel}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function FavoritesScreen({ navigation }) {
  const { darkMode, currentColors, loaded } = useTheme()

  const { environments, toggleFavorite } = useEnvironments()

  const favorites = environments.filter((e) => e.isFavorite)

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
        <View style={styles.headerTitle}>
          <Ionicons name="heart" size={35} color="#ff6b6b" />
          <Text style={[styles.headerText, { color: currentColors.textPrimary }]}>Favoritos</Text>
        </View>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: currentColors.textMuted }]}>
          {favorites.length === 0
            ? 'No tienes ambientes favoritos aún'
            : `${favorites.length} ambiente${favorites.length > 1 ? 's' : ''} guardado${favorites.length > 1 ? 's' : ''}`}
        </Text>

        {favorites.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={64} color={currentColors.borderColor} />
            <Text style={[styles.emptyTitle, { color: currentColors.textPrimary }]}>Sin favoritos</Text>
            <Text style={[styles.emptyText, { color: currentColors.textMuted }]}>
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
          favorites.map((fav) => (
            <EnvironmentCard
              key={fav.id}
              environment={fav}
              onPress={() => navigation.navigate('EnvironmentDetail', { envId: fav.id })}
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
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerText: { fontSize: 24, fontWeight: 'bold' },

  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 10 },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

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
  locationText: { fontSize: 12 },

  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  metricChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  metricIcon: { fontSize: 12 },
  metricValue: { fontSize: 12, fontWeight: '600' },

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

  goBackBtn: {
    marginTop: 12,
    backgroundColor: 'rgba(0,184,148,0.1)',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#00b894',
  },
  goBackText: { color: '#00b894', fontWeight: '600' },
})