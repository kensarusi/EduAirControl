import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  TextInput, Modal, Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/colors'

const DEFAULT_PROFILE = {
  fullName: 'Keneth Santiago Rubiano Silva',
  email: 'Kensarusi@gmail.com',
  title: 'Product Manager',
}

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [modal, setModal] = useState({ open: false, field: '', value: '', label: '' })

  const fieldConfig = {
    fullName: { label: 'Nombre completo', icon: 'person-outline', keyboardType: 'default' },
    email: { label: 'Correo electrónico', icon: 'mail-outline', keyboardType: 'email-address' },
    title: { label: 'Cargo / Rol', icon: 'briefcase-outline', keyboardType: 'default' },
  }

  const openModal = (field) =>
    setModal({ open: true, field, value: profile[field], label: fieldConfig[field].label })

  const handleSave = () => {
    setProfile((prev) => ({ ...prev, [modal.field]: modal.value }))
    setModal({ open: false, field: '', value: '', label: '' })
  }

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: () => navigation.navigate('Login') },
      ]
    )
  }

  const initials = profile.fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBody} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <View style={{ width: 2 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profileTitle}>{profile.title}</Text>
          <View style={styles.emailBadge}>
            <Ionicons name="mail-outline" size={24} color={colors.accent} />
            <Text style={styles.emailText}>{profile.email}</Text>
          </View>
        </View>

        {/* Info fields */}
        <Text style={styles.sectionTitle}>Información personal</Text>
        <View style={styles.fieldsCard}>
          {Object.entries(fieldConfig).map(([key, config], index, arr) => (
            <TouchableOpacity
              key={key}
              style={[styles.fieldRow, index < arr.length - 1 && styles.fieldRowBorder]}
              onPress={() => openModal(key)}
            >
              <View style={styles.fieldLeft}>
                <View style={styles.fieldIconWrap}>
                  <Ionicons name={config.icon} size={16} color={colors.accent} />
                </View>
                <View>
                  <Text style={styles.fieldLabel}>{config.label}</Text>
                  <Text style={styles.fieldValue}>{profile[key]}</Text>
                </View>
              </View>
              <Ionicons name="pencil-outline" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings links */}
        <Text style={styles.sectionTitle}>Más opciones</Text>
        <View style={styles.fieldsCard}>
          {[
            { icon: 'lock-closed-outline', label: 'Cambiar contraseña', color: colors.accent },
            { icon: 'notifications-outline', label: 'Notificaciones', color: colors.accent },
            { icon: 'help-circle-outline', label: 'Ayuda y soporte', color: colors.accent },
            { icon: 'shield-checkmark-outline', label: 'Privacidad', color: colors.accent },
          ].map((item, index, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.fieldRow, index < arr.length - 1 && styles.fieldRowBorder]}
            >
              <View style={styles.fieldLeft}>
                <View style={styles.fieldIconWrap}>
                  <Ionicons name={item.icon} size={16} color={item.color} />
                </View>
                <Text style={styles.optionLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={modal.open} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Editar {modal.label}</Text>
            <TextInput
              style={styles.modalInput}
              value={modal.value}
              onChangeText={(v) => setModal((prev) => ({ ...prev, value: v }))}
              placeholder={`Ingresa ${modal.label.toLowerCase()}`}
              placeholderTextColor={colors.textMuted}
              autoFocus
              keyboardType={modal.field ? fieldConfig[modal.field]?.keyboardType : 'default'}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setModal({ open: false, field: '', value: '', label: '' })}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSave} onPress={handleSave}>
                <Text style={styles.modalSaveText}>Guardar</Text>
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
    flexDirection: 'column', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 55,
  },

  headerTitle: { marginBottom: -20,  fontSize: 24, fontWeight: 'bold', color: colors.textPrimary },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  avatarSection: { alignItems: 'center', paddingVertical: 1 },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: colors.accentDim,
    borderWidth: 2, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: colors.accent },
  profileName: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 17 },
  profileTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textMuted, marginBottom: 16 },
  emailBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: colors.bgCard, borderRadius: 22, borderWidth: 1,
    borderColor: colors.borderColor, paddingHorizontal: 14, paddingVertical: 6,
  },
  emailText: { fontSize: 15, color: colors.textSecondary, marginBottom: 1, marginRight: -25 },

  sectionTitle: {
    fontSize: 13, fontWeight: '700', color: colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 10, marginTop: 20,
  },

  fieldsCard: {
    backgroundColor: colors.bgCard, borderRadius: 16,
    borderWidth: 1, borderColor: colors.borderColor, overflow: 'hidden',
  },
  fieldRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  fieldRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderColor },
  fieldLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fieldIconWrap: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: colors.accentDim,
    alignItems: 'center', justifyContent: 'center',
  },
  fieldLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 2 },
  fieldValue: { fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
  optionLabel: { fontSize: 15, color: colors.textPrimary },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10,
    marginTop: 24, borderRadius: 12, borderWidth: 1,
    borderColor: colors.error, paddingVertical: 14,
    backgroundColor: 'rgba(244,67,54,0.08)',
  },
  logoutText: { color: colors.error, fontSize: 15, fontWeight: 'bold' },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.bgCard, borderTopLeftRadius: 24,
    borderTopRightRadius: 24, padding: 24,
    borderTopWidth: 2, borderColor: colors.accent,
  },
  modalTitle: {
    fontSize: 16, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 16,
  },
  modalInput: {
    backgroundColor: colors.bgInput, borderRadius: 10,
    borderWidth: 1, borderColor: colors.borderColor,
    padding: 14, color: colors.textPrimary, fontSize: 15, marginBottom: 20,
  },
  modalActions: { flexDirection: 'row', gap: 12 },
  modalCancel: {
    flex: 1, borderRadius: 10, borderWidth: 1,
    borderColor: colors.borderColor, padding: 14, alignItems: 'center',
  },
  modalCancelText: { color: colors.textSecondary, fontWeight: '600' },
  modalSave: {
    flex: 1, borderRadius: 10, backgroundColor: colors.accent,
    padding: 14, alignItems: 'center',
  },
  modalSaveText: { color: colors.bgBody, fontWeight: 'bold' },
})