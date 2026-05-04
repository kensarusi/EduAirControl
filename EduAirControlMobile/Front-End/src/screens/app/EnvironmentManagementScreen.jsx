import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  TextInput, Modal, Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/colors'
import { useEnvironments } from '../../context/EnvironmentsContext'
import { STATUS_COLORS, STATUS_LABELS } from '../../constants/environments'

const EMPTY_FORM = { name: '', capacity: '', location: '' }

function FormField({ label, value, onChangeText, placeholder, keyboardType = 'default' }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  )
}

export default function EnvironmentManagementScreen() {
  const { environments, addEnvironment, editEnvironment, deleteEnvironment } = useEnvironments()
  const [modal, setModal] = useState({ open: false, mode: 'add', env: null })
  const [form, setForm] = useState(EMPTY_FORM)
  const [search, setSearch] = useState('')

  const filtered = environments.filter((env) =>
    env.name.toLowerCase().includes(search.toLowerCase()) ||
    env.location.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setModal({ open: true, mode: 'add', env: null })
  }

  const openEdit = (env) => {
    setForm({ name: env.name, capacity: String(env.capacity), location: env.location })
    setModal({ open: true, mode: 'edit', env })
  }

  const closeModal = () => setModal({ open: false, mode: 'add', env: null })

  const handleSave = () => {
    if (!form.name.trim()) {
      Alert.alert('Campo requerido', 'El nombre del ambiente es obligatorio.')
      return
    }
    if (modal.mode === 'add') {
      addEnvironment({
        name: form.name.trim(),
        capacity: Number(form.capacity) || 0,
        location: form.location.trim() || 'Sin ubicación',
      })
    } else {
      editEnvironment(modal.env.id, {
        name: form.name.trim(),
        capacity: Number(form.capacity) || 0,
        location: form.location.trim(),
      })
    }
    closeModal()
  }

  const confirmDelete = (env) => {
    Alert.alert(
      'Eliminar ambiente',
      `¿Estás seguro de que quieres eliminar "${env.name}"? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteEnvironment(env.id),
        },
      ]
    )
  }

  const statusColor = (key) => STATUS_COLORS[key] || colors.accent
  const statusLabel = (key) => STATUS_LABELS[key] || key

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBody} />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons style={styles.headerIcon} name="settings-outline" size={30} color={colors.accent} />
        <Text style={styles.headerTitle}>Gestión de Ambientes</Text>
      </View>

      {/* Botón agregar ambiente */}
      <TouchableOpacity style={styles.addBtn} onPress={openAdd} activeOpacity={0.85}>
        <Ionicons name="add-circle-outline" size={20} color={colors.bgBody} />
        <Text style={styles.addBtnText}>Agregar ambiente</Text>
      </TouchableOpacity>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o ubicación..."
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

      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={52} color={colors.borderColor} />
            <Text style={styles.emptyTitle}>
              {search ? 'Sin resultados' : 'Sin ambientes'}
            </Text>
            <Text style={styles.emptyText}>
              {search ? 'Intenta con otro término' : 'Toca "Agregar ambiente" para comenzar'}
            </Text>
          </View>
        ) : (
          filtered.map((env) => (
            <View key={env.id} style={styles.envCard}>
              {/* Card top */}
              <View style={styles.cardTop}>
                <View style={styles.cardIcon}>
                  <Ionicons name="business-outline" size={18} color={colors.accent} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName} numberOfLines={1}>{env.name}</Text>
                  <View style={styles.cardMeta}>
                    <Ionicons name="location-outline" size={12} color={colors.textMuted} />
                    <Text style={styles.cardMetaText}>{env.location}</Text>
                    <Ionicons name="people-outline" size={12} color={colors.textMuted} style={{ marginLeft: 8 }} />
                    <Text style={styles.cardMetaText}>{env.capacity} personas</Text>
                  </View>
                </View>
                <View style={[
                  styles.statusPill,
                  { backgroundColor: `${statusColor(env.statusKey)}15`, borderColor: statusColor(env.statusKey) }
                ]}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor(env.statusKey) }]} />
                  <Text style={[styles.statusTxt, { color: statusColor(env.statusKey) }]}>
                    {statusLabel(env.statusKey)}
                  </Text>
                </View>
              </View>

              {/* Card actions */}
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => openEdit(env)}>
                  <Ionicons name="create-outline" size={15} color={colors.accent} />
                  <Text style={styles.editBtnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => confirmDelete(env)}>
                  <Ionicons name="trash-outline" size={15} color={colors.error} />
                  <Text style={styles.deleteBtnText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Modal */}
      <Modal visible={modal.open} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Ionicons
                name={modal.mode === 'add' ? 'add-circle-outline' : 'create-outline'}
                size={22}
                color={colors.accent}
              />
              <Text style={styles.modalTitle}>
                {modal.mode === 'add' ? 'Nuevo ambiente' : 'Editar ambiente'}
              </Text>
              <TouchableOpacity onPress={closeModal} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled">
              <FormField
                label="Nombre *"
                value={form.name}
                onChangeText={(v) => setForm((p) => ({ ...p, name: v }))}
                placeholder="Ej: Aula 301"
              />
              <FormField
                label="Capacidad"
                value={form.capacity}
                onChangeText={(v) => setForm((p) => ({ ...p, capacity: v }))}
                placeholder="Ej: 30"
                keyboardType="numeric"
              />
              <FormField
                label="Ubicación"
                value={form.location}
                onChangeText={(v) => setForm((p) => ({ ...p, location: v }))}
                placeholder="Ej: Bloque A"
              />
            </ScrollView>

            {/* Modal actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>
                  {modal.mode === 'add' ? 'Agregar' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBody },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 20, paddingTop: 55, paddingBottom: 20,
  },
  headerTitle: {paddingLeft: 20, fontSize: 24, fontWeight: 'bold', color: colors.textPrimary },
  headerIcon: {paddingLeft: 20},
  
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginHorizontal: 80, marginBottom: 20,
    backgroundColor: colors.accent, borderRadius: 12,
    paddingVertical: 13,
  },
  addBtnText: { fontSize: 15, fontWeight: 'bold', color: colors.bgBody },

  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 20, marginBottom: 12,
    backgroundColor: colors.bgCard, borderRadius: 10, borderWidth: 1,
    borderColor: colors.borderColor, paddingHorizontal: 12, paddingVertical: 10,
  },
  searchInput: { flex: 1, color: colors.textPrimary, fontSize: 14 },

  list: { flex: 1 },
  listContent: { paddingHorizontal: 20 },

  empty: { alignItems: 'center', paddingTop: 60, gap: 10 },
  emptyTitle: { fontSize: 17, fontWeight: 'bold', color: colors.textPrimary },
  emptyText: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },

  envCard: {
    backgroundColor: colors.bgCard, borderRadius: 14, borderWidth: 1,
    borderColor: colors.borderColor, marginBottom: 12, overflow: 'hidden',
  },
  cardTop: {
    flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12,
  },
  cardIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: colors.accentDim, alignItems: 'center', justifyContent: 'center',
  },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  cardMetaText: { fontSize: 12, color: colors.textMuted },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 20, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusTxt: { fontSize: 11, fontWeight: '600' },

  cardActions: {
    flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.borderColor,
  },
  editBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 5, paddingVertical: 11,
    borderRightWidth: 1, borderRightColor: colors.borderColor,
  },
  editBtnText: { fontSize: 13, color: colors.accent, fontWeight: '600' },
  deleteBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 5, paddingVertical: 11,
  },
  deleteBtnText: { fontSize: 13, color: colors.error, fontWeight: '600' },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.bgCard, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20,
  },
  modalTitle: { flex: 1, fontSize: 17, fontWeight: 'bold', color: colors.textPrimary },

  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, color: colors.textSecondary, fontWeight: '600', marginBottom: 6 },
  fieldInput: {
    backgroundColor: colors.bgInput, borderRadius: 10, borderWidth: 1,
    borderColor: colors.borderColor, paddingHorizontal: 14, paddingVertical: 11,
    color: colors.textPrimary, fontSize: 15,
  },

  modalActions: {
    flexDirection: 'row', gap: 12, marginTop: 8,
  },
  cancelBtn: {
    flex: 1, borderRadius: 12, borderWidth: 1, borderColor: colors.borderColor,
    paddingVertical: 13, alignItems: 'center',
  },
  cancelBtnText: { color: colors.textSecondary, fontWeight: '600', fontSize: 15 },
  saveBtn: {
    flex: 1, borderRadius: 12, backgroundColor: colors.accent,
    paddingVertical: 13, alignItems: 'center',
  },
  saveBtnText: { color: colors.bgBody, fontWeight: 'bold', fontSize: 15 },
})