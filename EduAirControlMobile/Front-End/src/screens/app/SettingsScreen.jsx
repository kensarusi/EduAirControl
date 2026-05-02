import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Switch,
  Modal, TextInput, Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'
import { darkColors, lightColors } from '../../styles/colors'

// ─── Datos ────────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'es', label: '🇨🇴  Español' },
  { code: 'en', label: '🇺🇸  English' },
  { code: 'fr', label: '🇫🇷  Français' },
  { code: 'pt', label: '🇧🇷  Português' },
]

const DATE_FORMATS = ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD']

const TIMEZONES = [
  { value: 'America/Bogota',      label: 'Bogotá (UTC-5)' },
  { value: 'America/Lima',        label: 'Lima (UTC-5)' },
  { value: 'America/Mexico_City', label: 'Ciudad de México (UTC-6)' },
  { value: 'America/New_York',    label: 'Nueva York (UTC-5/-4)' },
  { value: 'America/Sao_Paulo',   label: 'São Paulo (UTC-3)' },
  { value: 'America/Santiago',    label: 'Santiago (UTC-4/-3)' },
  { value: 'Europe/London',       label: 'Londres (UTC+0/+1)' },
  { value: 'Europe/Madrid',       label: 'Madrid (UTC+1/+2)' },
  { value: 'Asia/Tokyo',          label: 'Tokio (UTC+9)' },
]

// ─── Subcomponentes ───────────────────────────────────────────────────────────
function SectionHeader({ icon, title, c }) {
  return (
    <View style={[styles.sectionHeader, { borderBottomColor: c.borderColor }]}>
      <Ionicons name={icon} size={18} color={c.accent} />
      <Text style={[styles.sectionTitle, { color: c.textPrimary }]}>{title}</Text>
    </View>
  )
}

function SettingRow({ icon, label, sub, right, c, onPress, chevron = false }) {
  return (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: c.borderColorLight }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}
      disabled={!onPress}
    >
      {icon && (
        <View style={[styles.rowIcon, { backgroundColor: c.bgInput }]}>
          <Ionicons name={icon} size={16} color={c.accent} />
        </View>
      )}
      <View style={styles.rowInfo}>
        <Text style={[styles.rowLabel, { color: c.textPrimary }]}>{label}</Text>
        {sub ? <Text style={[styles.rowSub, { color: c.textMuted }]}>{sub}</Text> : null}
      </View>
      {right}
      {chevron && <Ionicons name="chevron-forward" size={16} color={c.textMuted} style={{ marginLeft: 6 }} />}
    </TouchableOpacity>
  )
}

function Card({ children, c }) {
  return (
    <View style={[styles.card, { backgroundColor: c.bgCard, borderColor: c.borderColor }]}>
      {children}
    </View>
  )
}

// ─── Pantalla principal ───────────────────────────────────────────────────────
export default function SettingsScreen() {
  const { isDark, toggleTheme } = useTheme()
  const c = isDark ? darkColors : lightColors

  const [language, setLanguage]       = useState('es')
  const [dateFormat, setDateFormat]   = useState('DD-MM-YYYY')
  const [timezone, setTimezone]       = useState('America/Bogota')
  const [autoTZ, setAutoTZ]           = useState(true)
  const [reminders, setReminders]     = useState({
    alertas: true, advertencias: true, resumenDiario: false, sonido: true,
  })
  const [privacy, setPrivacy]         = useState({
    perfilPublico: false, compartirDatos: false,
  })

  // Modales
  const [langModal, setLangModal]         = useState(false)
  const [dateModal, setDateModal]         = useState(false)
  const [tzModal, setTzModal]             = useState(false)
  const [passModal, setPassModal]         = useState(false)
  const [deleteModal, setDeleteModal]     = useState(false)
  const [helpModal, setHelpModal]         = useState(null) // 'faq'|'contact'|'terms'|'privacy'|'version'

  const [passData, setPassData]           = useState({ current: '', new: '', confirm: '' })
  const [showPass, setShowPass]           = useState({ current: false, new: false, confirm: false })

  const langLabel = LANGUAGES.find((l) => l.code === language)?.label ?? 'Español'

  const toggleReminder = (key) => setReminders((p) => ({ ...p, [key]: !p[key] }))
  const togglePrivacy  = (key) => setPrivacy((p) => ({ ...p, [key]: !p[key] }))

  const handleSavePassword = () => {
    if (!passData.current || !passData.new || !passData.confirm) {
      Alert.alert('Error', 'Completa todos los campos')
      return
    }
    if (passData.new !== passData.confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden')
      return
    }
    if (passData.new.length < 6) {
      Alert.alert('Error', 'Mínimo 6 caracteres')
      return
    }
    Alert.alert('Listo', 'Contraseña actualizada ✅')
    setPassModal(false)
    setPassData({ current: '', new: '', confirm: '' })
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      '⚠️ Eliminar cuenta',
      'Esta acción no se puede deshacer. ¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => Alert.alert('Cuenta eliminada') },
      ]
    )
    setDeleteModal(false)
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bgBody }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={c.bgBody} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.borderColor }]}>
        <Ionicons name="settings-outline" size={22} color={c.accent} />
        <Text style={[styles.headerTitle, { color: c.textPrimary }]}>Configuraciones</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── APARIENCIA ── */}
        <Card c={c}>
          <SectionHeader icon="color-palette-outline" title="Apariencia" c={c} />

          <SettingRow
            icon="moon-outline"
            label="Modo oscuro"
            sub={isDark ? 'Activado' : 'Desactivado'}
            c={c}
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: c.borderColor, true: c.accentDim }}
                thumbColor={isDark ? c.accent : c.textMuted}
              />
            }
          />
        </Card>

        {/* ── IDIOMA Y FECHAS ── */}
        <Card c={c}>
          <SectionHeader icon="globe-outline" title="Idioma y fechas" c={c} />
          <Text style={[styles.sectionDesc, { color: c.textMuted }]}>
            Personaliza el idioma, formato de fecha y zona horaria.
          </Text>

          <SettingRow
            icon="language-outline"
            label="Idioma"
            sub={langLabel}
            c={c}
            onPress={() => setLangModal(true)}
            chevron
          />
          <SettingRow
            icon="calendar-outline"
            label="Formato de fecha"
            sub={dateFormat}
            c={c}
            onPress={() => setDateModal(true)}
            chevron
          />
          <SettingRow
            icon="time-outline"
            label="Zona horaria automática"
            sub={autoTZ ? 'Activado' : 'Manual'}
            c={c}
            right={
              <Switch
                value={autoTZ}
                onValueChange={setAutoTZ}
                trackColor={{ false: c.borderColor, true: c.accentDim }}
                thumbColor={autoTZ ? c.accent : c.textMuted}
              />
            }
          />
          {!autoTZ && (
            <SettingRow
              icon="location-outline"
              label="Zona horaria"
              sub={timezone}
              c={c}
              onPress={() => setTzModal(true)}
              chevron
            />
          )}
        </Card>

        {/* ── NOTIFICACIONES ── */}
        <Card c={c}>
          <SectionHeader icon="notifications-outline" title="Notificaciones" c={c} />
          <Text style={[styles.sectionDesc, { color: c.textMuted }]}>
            Controla qué alertas quieres recibir.
          </Text>

          {[
            { key: 'alertas',       label: 'Alertas críticas',  icon: 'alert-circle-outline' },
            { key: 'advertencias',  label: 'Advertencias',      icon: 'warning-outline' },
            { key: 'resumenDiario', label: 'Resumen diario',    icon: 'bar-chart-outline' },
            { key: 'sonido',        label: 'Sonido',            icon: 'volume-high-outline' },
          ].map(({ key, label, icon }) => (
            <SettingRow
              key={key}
              icon={icon}
              label={label}
              sub={reminders[key] ? 'Activado' : 'Desactivado'}
              c={c}
              right={
                <Switch
                  value={reminders[key]}
                  onValueChange={() => toggleReminder(key)}
                  trackColor={{ false: c.borderColor, true: c.accentDim }}
                  thumbColor={reminders[key] ? c.accent : c.textMuted}
                />
              }
            />
          ))}
        </Card>

        {/* ── PRIVACIDAD ── */}
        <Card c={c}>
          <SectionHeader icon="shield-checkmark-outline" title="Privacidad y seguridad" c={c} />
          <Text style={[styles.sectionDesc, { color: c.textMuted }]}>
            Gestiona tus datos y acceso a la cuenta.
          </Text>

          <SettingRow
            icon="eye-outline"
            label="Perfil público"
            sub={privacy.perfilPublico ? 'Visible para otros' : 'Solo tú'}
            c={c}
            right={
              <Switch
                value={privacy.perfilPublico}
                onValueChange={() => togglePrivacy('perfilPublico')}
                trackColor={{ false: c.borderColor, true: c.accentDim }}
                thumbColor={privacy.perfilPublico ? c.accent : c.textMuted}
              />
            }
          />
          <SettingRow
            icon="analytics-outline"
            label="Compartir datos de uso"
            sub={privacy.compartirDatos ? 'Activado' : 'Desactivado'}
            c={c}
            right={
              <Switch
                value={privacy.compartirDatos}
                onValueChange={() => togglePrivacy('compartirDatos')}
                trackColor={{ false: c.borderColor, true: c.accentDim }}
                thumbColor={privacy.compartirDatos ? c.accent : c.textMuted}
              />
            }
          />
          <SettingRow
            icon="lock-closed-outline"
            label="Cambiar contraseña"
            sub="Actualiza tu contraseña"
            c={c}
            onPress={() => setPassModal(true)}
            chevron
          />
          <SettingRow
            icon="trash-outline"
            label="Eliminar cuenta"
            sub="Esta acción es permanente"
            c={c}
            onPress={() => setDeleteModal(true)}
            right={<Ionicons name="chevron-forward" size={16} color={c.error} />}
          />
        </Card>

        {/* ── AYUDA ── */}
        <Card c={c}>
          <SectionHeader icon="help-circle-outline" title="Ayuda y soporte" c={c} />

          {[
            { key: 'faq',     icon: 'chatbubble-ellipses-outline', label: 'Preguntas frecuentes', sub: 'Respuestas rápidas' },
            { key: 'contact', icon: 'mail-outline',                 label: 'Contacto',             sub: 'soporte@eduaircontrol.com' },
            { key: 'terms',   icon: 'document-text-outline',        label: 'Términos de servicio', sub: 'Ver condiciones' },
            { key: 'privacy', icon: 'lock-open-outline',            label: 'Política de privacidad', sub: 'Cómo usamos tus datos' },
            { key: 'version', icon: 'information-circle-outline',   label: 'Versión de la app',    sub: 'v1.0.0' },
          ].map(({ key, icon, label, sub }) => (
            <SettingRow
              key={key}
              icon={icon}
              label={label}
              sub={sub}
              c={c}
              onPress={() => setHelpModal(key)}
              chevron
            />
          ))}
        </Card>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* ── MODAL IDIOMA ── */}
      <Modal visible={langModal} transparent animationType="slide" onRequestClose={() => setLangModal(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setLangModal(false)}>
          <View style={[styles.sheet, { backgroundColor: c.bgCard }]}>
            <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>Idioma</Text>
            {LANGUAGES.map((l) => (
              <TouchableOpacity
                key={l.code}
                style={[styles.sheetOption, language === l.code && { backgroundColor: c.accentDim }]}
                onPress={() => { setLanguage(l.code); setLangModal(false) }}
              >
                <Text style={[styles.sheetOptionText, { color: language === l.code ? c.accent : c.textPrimary }]}>
                  {l.label}
                </Text>
                {language === l.code && <Ionicons name="checkmark" size={18} color={c.accent} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── MODAL FORMATO DE FECHA ── */}
      <Modal visible={dateModal} transparent animationType="slide" onRequestClose={() => setDateModal(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setDateModal(false)}>
          <View style={[styles.sheet, { backgroundColor: c.bgCard }]}>
            <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>Formato de fecha</Text>
            {DATE_FORMATS.map((fmt) => (
              <TouchableOpacity
                key={fmt}
                style={[styles.sheetOption, dateFormat === fmt && { backgroundColor: c.accentDim }]}
                onPress={() => { setDateFormat(fmt); setDateModal(false) }}
              >
                <Text style={[styles.sheetOptionText, { color: dateFormat === fmt ? c.accent : c.textPrimary }]}>
                  {fmt}
                </Text>
                {dateFormat === fmt && <Ionicons name="checkmark" size={18} color={c.accent} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── MODAL ZONA HORARIA ── */}
      <Modal visible={tzModal} transparent animationType="slide" onRequestClose={() => setTzModal(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setTzModal(false)}>
          <ScrollView style={[styles.sheet, { backgroundColor: c.bgCard, maxHeight: '70%' }]}>
            <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>Zona horaria</Text>
            {TIMEZONES.map((tz) => (
              <TouchableOpacity
                key={tz.value}
                style={[styles.sheetOption, timezone === tz.value && { backgroundColor: c.accentDim }]}
                onPress={() => { setTimezone(tz.value); setTzModal(false) }}
              >
                <Text style={[styles.sheetOptionText, { color: timezone === tz.value ? c.accent : c.textPrimary }]}>
                  {tz.label}
                </Text>
                {timezone === tz.value && <Ionicons name="checkmark" size={18} color={c.accent} />}
              </TouchableOpacity>
            ))}
            <View style={{ height: 20 }} />
          </ScrollView>
        </TouchableOpacity>
      </Modal>

      {/* ── MODAL CONTRASEÑA ── */}
      <Modal visible={passModal} transparent animationType="fade" onRequestClose={() => setPassModal(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setPassModal(false)}>
          <View style={[styles.dialog, { backgroundColor: c.bgCard }]} onStartShouldSetResponder={() => true}>
            <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>🔐 Cambiar contraseña</Text>

            {[
              { field: 'current', placeholder: 'Contraseña actual' },
              { field: 'new',     placeholder: 'Nueva contraseña' },
              { field: 'confirm', placeholder: 'Confirmar nueva contraseña' },
            ].map(({ field, placeholder }) => (
              <View key={field} style={[styles.passRow, { backgroundColor: c.bgInput, borderColor: c.borderColor }]}>
                <TextInput
                  style={[styles.passInput, { color: c.textPrimary }]}
                  placeholder={placeholder}
                  placeholderTextColor={c.textMuted}
                  secureTextEntry={!showPass[field]}
                  value={passData[field]}
                  onChangeText={(v) => setPassData((p) => ({ ...p, [field]: v }))}
                />
                <TouchableOpacity onPress={() => setShowPass((p) => ({ ...p, [field]: !p[field] }))}>
                  <Ionicons name={showPass[field] ? 'eye-off-outline' : 'eye-outline'} size={18} color={c.textMuted} />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.dialogActions}>
              <TouchableOpacity
                style={[styles.dialogBtn, { backgroundColor: c.bgInput, borderColor: c.borderColor }]}
                onPress={() => setPassModal(false)}
              >
                <Text style={{ color: c.textSecondary, fontWeight: '600' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dialogBtn, { backgroundColor: c.accent }]}
                onPress={handleSavePassword}
              >
                <Text style={{ color: c.bgBody, fontWeight: '700' }}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── MODAL AYUDA ── */}
      <Modal visible={!!helpModal} transparent animationType="slide" onRequestClose={() => setHelpModal(null)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setHelpModal(null)}>
          <View style={[styles.sheet, { backgroundColor: c.bgCard }]} onStartShouldSetResponder={() => true}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setHelpModal(null)}>
              <Ionicons name="close" size={22} color={c.textMuted} />
            </TouchableOpacity>

            {helpModal === 'faq' && (
              <>
                <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>❓ Preguntas frecuentes</Text>
                {[
                  { q: '¿Cómo monitoreo un ambiente?', a: 'Ve al Dashboard y selecciona el ambiente que deseas revisar.' },
                  { q: '¿Puedo marcar favoritos?', a: 'Sí, toca el ícono de corazón en cualquier tarjeta de ambiente.' },
                  { q: '¿Qué significa "Alerta"?', a: 'Indica que uno o más sensores superaron el umbral crítico.' },
                  { q: '¿Cómo cambio el idioma?', a: 'En Configuraciones > Idioma y fechas > Idioma.' },
                ].map(({ q, a }) => (
                  <View key={q} style={[styles.faqItem, { borderBottomColor: c.borderColorLight }]}>
                    <Text style={[styles.faqQ, { color: c.textPrimary }]}>{q}</Text>
                    <Text style={[styles.faqA, { color: c.textMuted }]}>{a}</Text>
                  </View>
                ))}
              </>
            )}

            {helpModal === 'contact' && (
              <>
                <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>📬 Contacto</Text>
                {[
                  { icon: '✉️', title: 'Correo', desc: 'soporte@eduaircontrol.com' },
                  { icon: '🕐', title: 'Horario', desc: 'Lunes a viernes, 8am – 6pm' },
                  { icon: '⏱️', title: 'Tiempo de respuesta', desc: 'Menos de 24 horas hábiles' },
                ].map(({ icon, title, desc }) => (
                  <View key={title} style={styles.contactItem}>
                    <Text style={styles.contactIcon}>{icon}</Text>
                    <View>
                      <Text style={[styles.faqQ, { color: c.textPrimary }]}>{title}</Text>
                      <Text style={[styles.faqA, { color: c.textMuted }]}>{desc}</Text>
                    </View>
                  </View>
                ))}
              </>
            )}

            {helpModal === 'terms' && (
              <>
                <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>📋 Términos de servicio</Text>
                <Text style={[styles.helpBody, { color: c.textSecondary }]}>
                  Al usar EduAirControl aceptas los siguientes términos:
                </Text>
                {[
                  'El uso de la plataforma es exclusivo para instituciones educativas.',
                  'Los datos de monitoreo son propiedad de la institución.',
                  'Está prohibido compartir credenciales de acceso.',
                  'EduAirControl no se hace responsable de decisiones tomadas con base en los datos.',
                ].map((t, i) => (
                  <Text key={i} style={[styles.helpBullet, { color: c.textMuted }]}>• {t}</Text>
                ))}
              </>
            )}

            {helpModal === 'privacy' && (
              <>
                <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>🔒 Política de privacidad</Text>
                <Text style={[styles.helpBody, { color: c.textSecondary }]}>
                  Tu privacidad es nuestra prioridad:
                </Text>
                {[
                  'No vendemos tus datos a terceros.',
                  'Los datos de sensores se almacenan cifrados.',
                  'Puedes solicitar la eliminación de tus datos en cualquier momento.',
                  'Solo accedemos a tu ubicación si tú lo autorizas.',
                ].map((t, i) => (
                  <Text key={i} style={[styles.helpBullet, { color: c.textMuted }]}>• {t}</Text>
                ))}
              </>
            )}

            {helpModal === 'version' && (
              <>
                <Text style={[styles.sheetTitle, { color: c.textPrimary }]}>📱 Versión de la app</Text>
                <View style={styles.versionBadge}>
                  <Text style={[styles.versionText, { color: c.accent }]}>v1.0.0</Text>
                </View>
                <Text style={[styles.helpBody, { color: c.textSecondary, textAlign: 'center' }]}>
                  EduAirControl — Monitoreo de ambientes educativos
                </Text>
                <Text style={[styles.faqA, { color: c.textMuted, textAlign: 'center' }]}>
                  Última actualización: Mayo 2026
                </Text>
              </>
            )}

            <View style={{ height: 20 }} />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:   { flex: 1 },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingTop: 55, paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },

  card: {
    borderRadius: 16, borderWidth: 1,
    marginBottom: 16, overflow: 'hidden',
  },

  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    padding: 16, borderBottomWidth: 1,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700' },
  sectionDesc:  { fontSize: 12, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 4 },

  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, gap: 12,
  },
  rowIcon:  { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  rowInfo:  { flex: 1 },
  rowLabel: { fontSize: 14, fontWeight: '600' },
  rowSub:   { fontSize: 12, marginTop: 2 },

  // Modales
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingTop: 8, paddingHorizontal: 20,
  },
  sheetTitle: { fontSize: 17, fontWeight: '700', textAlign: 'center', paddingVertical: 16 },
  sheetOption: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10, marginBottom: 4,
  },
  sheetOptionText: { fontSize: 15 },

  dialog: {
    margin: 24, borderRadius: 20,
    padding: 20, gap: 12,
  },
  passRow: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 10, borderWidth: 1,
    paddingHorizontal: 14, paddingVertical: 4,
  },
  passInput: { flex: 1, fontSize: 14, paddingVertical: 10 },
  dialogActions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  dialogBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 10,
    alignItems: 'center', borderWidth: 1,
  },

  closeBtn: { alignSelf: 'flex-end', padding: 4, marginTop: 8 },

  faqItem:    { paddingVertical: 12, borderBottomWidth: 1 },
  faqQ:       { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  faqA:       { fontSize: 13 },
  contactItem:{ flexDirection: 'row', gap: 14, alignItems: 'flex-start', paddingVertical: 12 },
  contactIcon:{ fontSize: 24 },

  helpBody:   { fontSize: 13, marginBottom: 8, marginTop: 4 },
  helpBullet: { fontSize: 13, marginBottom: 6, lineHeight: 20 },

  versionBadge: { alignSelf: 'center', marginVertical: 16 },
  versionText:  { fontSize: 32, fontWeight: 'bold' },
})