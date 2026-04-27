import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/colors'
import { useEnvironments } from '../../context/EnvironmentsContext'
import { STATUS, STATUS_COLORS, STATUS_LABELS, QUALITY_LABELS } from '../../constants/environments'
import EnvironmentCard from '../../components/EnvironmentCard'

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: STATUS.NORMAL, label: 'Normal' },
  { key: STATUS.WARNING, label: 'Advertencia' },
  { key: STATUS.ALERT, label: 'Alerta' },
]

export default function DashboardScreen({ navigation }) {
  const { environments } = useEnvironments()
  const [activeFilter, setActiveFilter] = useState('all')

  const counts = {
    [STATUS.NORMAL]: environments.filter((e) => e.status === STATUS.NORMAL).length,
    [STATUS.WARNING]: environments.filter((e) => e.status === STATUS.WARNING).length,
    [STATUS.ALERT]: environments.filter((e) => e.status === STATUS.ALERT).length,
  }

  const filtered = environments.filter((env) => {
    if (activeFilter === 'all') return true
    return env.status === activeFilter
  })

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBody} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Bienvenido! 👋</Text>
          <Text style={styles.subtitle}>Monitoreo de ambientes</Text>
        </View>
        <TouchableOpacity
          style={styles.allBtn}
          onPress={() => navigation.navigate('AllEnvironments')}
        >
          <Text style={styles.allBtnText}>Ver todos</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {/* Status summary */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { borderColor: STATUS_COLORS[STATUS.NORMAL] }]}>
          <Text style={[styles.summaryCount, { color: STATUS_COLORS[STATUS.NORMAL] }]}>
            {counts[STATUS.NORMAL]}
          </Text>
          <Text style={styles.summaryLabel}>Normal</Text>
        </View>
        <View style={[styles.summaryCard, { borderColor: STATUS_COLORS[STATUS.WARNING] }]}>
          <Text style={[styles.summaryCount, { color: STATUS_COLORS[STATUS.WARNING] }]}>
            {counts[STATUS.WARNING]}
          </Text>
          <Text style={styles.summaryLabel}>Advertencia</Text>
        </View>
        <View style={[styles.summaryCard, { borderColor: STATUS_COLORS[STATUS.ALERT] }]}>
          <Text style={[styles.summaryCount, { color: STATUS_COLORS[STATUS.ALERT] }]}>
            {counts[STATUS.ALERT]}
          </Text>
          <Text style={styles.summaryLabel}>Alerta</Text>
        </View>
      </View>

      {/* Filter bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterBtn, activeFilter === f.key && styles.filterBtnActive]}
            onPress={() => setActiveFilter(f.key)}
          >
            <Text style={[styles.filterText, activeFilter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Environment cards */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((env) => (
          <EnvironmentCard
            key={env.id}
            environment={env}
            onPress={() => navigation.navigate('EnvironmentDetail', { envId: env.id })}
          />
        ))}
        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>Sin ambientes</Text>
            <Text style={styles.emptyText}>No hay ambientes con este estado</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBody },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  greeting: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  allBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: `${colors.accent}18`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  allBtnText: { color: colors.accent, fontSize: 13, fontWeight: '600' },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  summaryCount: { fontSize: 22, fontWeight: 'bold' },
  summaryLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  filterScroll: { maxHeight: 44 },
  filterContent: { paddingHorizontal: 20, gap: 8, alignItems: 'center' },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  filterBtnActive: {
    backgroundColor: `${colors.accent}20`,
    borderColor: colors.accent,
  },
  filterText: { color: colors.textMuted, fontSize: 13, fontWeight: '500' },
  filterTextActive: { color: colors.accent },
  list: { flex: 1 },
  listContent: { padding: 20, paddingTop: 14, gap: 14 },
  emptyState: { alignItems: 'center', paddingTop: 40 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  emptyText: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
})