import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { colors } from '../../styles/colors'

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.accent} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.title}>Registrarse</Text>
            <Ionicons name="person-circle-outline" size={50} color={colors.accent} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} placeholder="Tu nombre" placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput style={styles.input} placeholder="correo@ejemplo.com" placeholderTextColor={colors.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordRow}>
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="••••••••" placeholderTextColor={colors.textMuted} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar contraseña</Text>
            <View style={styles.passwordRow}>
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="••••••••" placeholderTextColor={colors.textMuted} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showConfirm} />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons name={showConfirm ? 'eye-off' : 'eye'} size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.termsRow} onPress={() => setAcceptTerms(!acceptTerms)}>
            <View style={[styles.checkbox, acceptTerms && styles.checkboxActive]}>
              {acceptTerms && <Ionicons name="checkmark" size={12} color="white" />}
            </View>
            <Text style={styles.termsText}>
              Acepto los <Text style={styles.termsLink}>Términos de uso y Política de privacidad</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnRegister, !acceptTerms && styles.btnDisabled]} onPress={() => acceptTerms && navigation.navigate('Dashboard')}>
            <Text style={styles.btnRegisterText}>Registrarse</Text>
          </TouchableOpacity>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          <Text style={styles.socialText}>Inicia sesión con</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.btnFacebook}>
              <FontAwesome name="facebook" size={18} color="white" />
              <Text style={styles.socialBtnText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnGoogle}>
              <FontAwesome name="google" size={18} color="white" />
              <Text style={styles.socialBtnText}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgBody },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: colors.bgCard, borderRadius: 15, padding: 30, borderWidth: 2, borderColor: colors.accent },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 25 },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.textPrimary },
  inputGroup: { marginBottom: 18 },
  label: { color: colors.textPrimary, fontWeight: 'bold', marginBottom: 6, fontSize: 14 },
  input: { backgroundColor: colors.bgInput, borderWidth: 1, borderColor: colors.borderColor, borderRadius: 8, padding: 12, color: colors.textPrimary, fontSize: 14 },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  eyeBtn: { position: 'absolute', right: 12, top: 12 },
  termsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  checkboxActive: { backgroundColor: colors.accent },
  termsText: { color: colors.textSecondary, fontSize: 13, flex: 1 },
  termsLink: { color: colors.accent, textDecorationLine: 'underline' },
  btnRegister: { backgroundColor: colors.accent, borderRadius: 8, padding: 14, alignItems: 'center', marginBottom: 20 },
  btnDisabled: { opacity: 0.5 },
  btnRegisterText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.borderColor },
  dividerText: { color: colors.textMuted, paddingHorizontal: 10 },
  socialText: { color: colors.textSecondary, textAlign: 'center', marginBottom: 10 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  btnFacebook: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.facebook, borderRadius: 8, padding: 10, paddingHorizontal: 20 },
  btnGoogle: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.accent, borderRadius: 8, padding: 10, paddingHorizontal: 20 },
  socialBtnText: { color: 'white', fontWeight: 'bold' },
})