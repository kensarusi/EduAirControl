import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput, StatusBar,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/colors'
import { useEnvironments } from '../../context/EnvironmentsContext'
import { STATUS, STATUS_COLORS, STATUS_LABELS } from '../../constants/environments'
import EnvironmentCard from '../../components/environment/EnvironmentCard'

export default function AllEnvironmentsScreen({ navigation }) {
  const { environments } = useEnvironments()
  const [search, setSearch] = useState('')
  const [activeStatus, setActiveStatus] = useState('')

  const counts = {
    [STATUS.NORMAL]: environments.filter((e) => e.statusKey === STATUS.NORMAL).length,
    [STATUS.WARNING]: environments.filter((e) => e.statusKey === STATUS.WARNING).length,
    [STATUS.ALERT]: environments.filter((e) => e.statusKey === STATUS.ALERT).length,
  }

  const filtered = environments.filter((env) => {
    const matchSearch = env.name.toLowerCase().includes(search.toLowerCase()) ||
      env.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !activeStatus || env.statusKey === activeStatus
    return matchSearch && matchStatus
  })

  const statusButtons = [
    { key: STATUS.NORMAL, icon: '✅' },
    { key: STATUS.WARNING, icon: '⚠️' },
    { key: STATUS.ALERT, icon: '🚨' },
  ]

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBody} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.accent} />
        </TouchableOpacity>
        <Text style={styles.title}>Todos los ambientes</Text>
        <Text style={styles.count}>{environments.length} total</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o ubicación..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Status filter chips */}
      <View style={styles.statusRow}>
        {statusButtons.map((btn) => (
          <TouchableOpacity
            key={btn.key}
            style={[
              styles.statusChip,
              activeStatus === btn.key && {
                backgroundColor: `${STATUS_COLORS[btn.key]}20`,
                borderColor: STATUS_COLORS[btn.key],
              },
            ]}
            onPress={() => setActiveStatus((prev) => prev === btn.key ? '' : btn.key)}
          >
            <Text style={styles.statusChipIcon}>{btn.icon}</Text>
            <Text style={[
              styles.statusChipLabel,
              activeStatus === btn.key && { color: STATUS_COLORS[btn.key] },
            ]}>
              {STATUS_LABELS[btn.key]}
            </Text>
            <Text style={[
              styles.statusChipCount,
              { color: STATUS_COLORS[btn.key] },
            ]}>
              {counts[btn.key]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptyText}>Intenta con otro término de búsqueda</Text>
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => { setSearch(''); setActiveStatus('') }}
            >
              <Text style={styles.clearBtnText}>Limpiar filtros</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filtered.map((env) => (
            <EnvironmentCard
              key={env.id}
              environment={env}
              onPress={() => navigation.navigate('EnvironmentDetail', { envId: env.id })}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBody },
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
  title: { flex: 1, fontSize: 1, fontWeight: 'bold', color: colors.textPrimary },
  count: { fontSize: 12, color: colors.textMuted },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {},
  searchInput: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  statusChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  statusChipIcon: { fontSize: 12 },
  statusChipLabel: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  statusChipCount: { fontSize: 12, fontWeight: 'bold' },
  list: { flex: 1 },
  listContent: { padding: 16, paddingTop: 0, gap: 12 },
  emptyState: { alignItems: 'center', paddingTop: 50, gap: 8 },
  emptyIcon: { fontSize: 44 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  emptyText: { fontSize: 14, color: colors.textMuted },
  clearBtn: {
    marginTop: 8,
    backgroundColor: `${colors.accent}20`,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  clearBtnText: { color: colors.accent, fontWeight: '600' },
})