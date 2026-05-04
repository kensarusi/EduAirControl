import { useState, useEffect } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  TextInput, Modal,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'
import {
  STATUS_COLORS, STATUS_LABELS,
} from '../../constants/environments'
import { useEnvironments } from '../../context/EnvironmentsContext'

const EMPTY_FORM = { name: '', capacity: '', location: '' }

function FormField({ label, value, onChangeText, placeholder, keyboardType = 'default', currentColors }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.fieldLabel, { color: currentColors.textMuted }]}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, { backgroundColor: currentColors.bgInput, borderColor: currentColors.borderColor, color: currentColors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={currentColors.textMuted}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  )
}

export default function EnvironmentManagementScreen() {
  const { darkMode, currentColors, loaded } = useTheme()

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
      <View style={styles.header}>
        <Ionicons style={styles.headerIcon} name="settings-outline" size={30} color={currentColors.accent} />
        <Text style={[styles.headerTitle, { color: currentColors.textPrimary }]}>Gestión de Ambientes</Text>
      </View>

      {/* Botón agregar ambiente */}
      <TouchableOpacity style={[styles.addBtn, { backgroundColor: currentColors.accent }]} onPress={openAdd} activeOpacity={0.85}>
        <Ionicons name="add-circle-outline" size={20} color={currentColors.bgBody} />
        <Text style={[styles.addBtnText, { color: currentColors.bgBody }]}>Agregar ambiente</Text>
      </TouchableOpacity>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: currentColors.bgCard, borderColor: currentColors.borderColor }]}>
        <Ionicons name="search-outline" size={16} color={currentColors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: currentColors.textPrimary }]}
          placeholder="Buscar por nombre o ubicación..."
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

      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={52} color={currentColors.borderColor} />
            <Text style={[styles.emptyTitle, { color: currentColors.textPrimary }]}>
              {search ? 'Sin resultados' : 'Sin ambientes'}
            </Text>
            <Text style={[styles.emptyText, { color: currentColors.textMuted }]}>
              {search ? 'Intenta con otro término' : 'Toca "Agregar ambiente" para comenzar'}
            </Text>
          </View>
        ) : (
          filtered.map((env) => (
            <View key={env.id} style={[styles.envCard, { backgroundColor: currentColors.bgCard, borderColor: currentColors.borderColor }]}>
              <View style={styles.cardTop}>
                <View style={[styles.cardIcon, { backgroundColor: currentColors.accentDim }]}>
                  <Ionicons name="business-outline" size={18} color={currentColors.accent} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardName, { color: currentColors.textPrimary }]} numberOfLines={1}>{env.name}</Text>
                  <View style={styles.cardMeta}>
                    <Ionicons name="location-outline" size={12} color={currentColors.textMuted} />
                    <Text style={[styles.cardMetaText, { color: currentColors.textMuted }]}>{env.location}</Text>
                    <Ionicons name="people-outline" size={12} color={currentColors.textMuted} style={{ marginLeft: 8 }} />
                    <Text style={[styles.cardMetaText, { color: currentColors.textMuted }]}>{env.capacity} personas</Text>
                  </View>
                </View>
                <View style={[
                  styles.statusPill,
                  { backgroundColor: `${STATUS_COLORS[env.statusKey] || currentColors.accent}15`, borderColor: STATUS_COLORS[env.statusKey] || currentColors.accent }
                ]}>
                  <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[env.statusKey] || currentColors.accent }]} />
                  <Text style={[styles.statusTxt, { color: STATUS_COLORS[env.statusKey] || currentColors.accent }]}>
                    {STATUS_LABELS[env.statusKey] || env.statusKey}
                  </Text>
                </View>
              </View>

              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => openEdit(env)}>
                  <Ionicons name="create-outline" size={15} color={currentColors.accent} />
                  <Text style={[styles.editBtnText, { color: currentColors.accent }]}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => confirmDelete(env)}>
                  <Ionicons name="trash-outline" size={15} color={currentColors.error} />
                  <Text style={[styles.deleteBtnText, { color: currentColors.error }]}>Eliminar</Text>
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
          <View style={[styles.modalCard, { backgroundColor: currentColors.bgCard }]}>
            <View style={styles.modalHeader}>
              <Ionicons
                name={modal.mode === 'add' ? 'add-circle-outline' : 'create-outline'}
                size={22}
                color={currentColors.accent}
              />
              <Text style={[styles.modalTitle, { color: currentColors.textPrimary }]}>
                {modal.mode === 'add' ? 'Nuevo ambiente' : 'Editar ambiente'}
              </Text>
              <TouchableOpacity onPress={closeModal} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={22} color={currentColors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled">
              <FormField
                label="Nombre *"
                value={form.name}
                onChangeText={(v) => setForm((p) => ({ ...p, name: v }))}
                placeholder="Ej: Aula 301"
                currentColors={currentColors}
              />
              <FormField
                label="Capacidad"
                value={form.capacity}
                onChangeText={(v) => setForm((p) => ({ ...p, capacity: v }))}
                placeholder="Ej: 30"
                keyboardType="numeric"
                currentColors={currentColors}
              />
              <FormField
                label="Ubicación"
                value={form.location}
                onChangeText={(v) => setForm((p) => ({ ...p, location: v }))}
                placeholder="Ej: Bloque A"
                currentColors={currentColors}
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.cancelBtn, { borderColor: currentColors.borderColor }]} onPress={closeModal}>
                <Text style={[styles.cancelBtnText, { color: currentColors.textSecondary }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.saveBtn, { backgroundColor: currentColors.accent }]} onPress={handleSave}>
                <Text style={[styles.saveBtnText, { color: currentColors.bgBody }]}>
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
  safe: { flex: 1, backgroundColor: '#f0fafa' },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 20, paddingTop: 55, paddingBottom: 20,
  },
  headerIcon: { paddingLeft: 20 },
  headerTitle: { paddingLeft: 20, fontSize: 24, fontWeight: 'bold' },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginHorizontal: 20, marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 13,
  },
  addBtnText: { fontSize: 15, fontWeight: 'bold' },

  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 20, marginBottom: 12,
    borderRadius: 10, borderWidth: 1,
    paddingHorizontal: 12, paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 14 },

  list: { flex: 1 },
  listContent: { paddingHorizontal: 20 },

  empty: { alignItems: 'center', paddingTop: 60, gap: 10 },
  emptyTitle: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  emptyText: { fontSize: 13, color: '#999999', textAlign: 'center' },

  envCard: {
    borderRadius: 14, borderWidth: 1,
    overflow: 'hidden', marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12,
  },
  cardIcon: {
    width: 40, height: 40, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  cardMetaText: { fontSize: 12, color: '#999999' },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 20, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusTxt: { fontSize: 11, fontWeight: '600' },

  cardActions: {
    flexDirection: 'row', borderTopWidth: 1,
  },
  editBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 5, paddingVertical: 11, borderRightWidth: 1,
  },
  editBtnText: { fontSize: 13, fontWeight: '600' },
  deleteBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 5, paddingVertical: 11,
  },
  deleteBtnText: { fontSize: 13, fontWeight: '600' },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20,
  },
  modalTitle: { flex: 1, fontSize: 17, fontWeight: 'bold' },

  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  fieldInput: {
    borderRadius: 10, borderWidth: 1,
    paddingHorizontal: 14, paddingVertical: 11,
    fontSize: 15,
  },

  modalActions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelBtn: {
    flex: 1, borderRadius: 12, borderWidth: 1,
    paddingVertical: 13, alignItems: 'center',
  },
  cancelBtnText: { fontWeight: '600', fontSize: 15 },
  saveBtn: {
    flex: 1, borderRadius: 12,
    paddingVertical: 13, alignItems: 'center',
  },
  saveBtnText: { fontWeight: 'bold', fontSize: 15 },
})