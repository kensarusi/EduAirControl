import { Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import VerifyCodeScreen from './screens/VerifyCodeScreen'
import ChangePasswordScreen from './screens/ChangePasswordScreen'
import TermsScreen from './screens/TermsScreen'
import GoogleSignUpScreen from './screens/GoogleSignUpScreen'
import DashboardScreen from './screens/DashboardScreen'
import AllEnvironmentsScreen from './screens/AllEnvironmentsScreen'
import ProfileScreen from './screens/ProfileScreen'
import SettingsScreen from './screens/SettingsScreen'
import FavoritesScreen from './screens/FavoritesScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/verify-code" element={<VerifyCodeScreen />} />
      <Route path="/change-password" element={<ChangePasswordScreen />} />
      <Route path="/terms" element={<TermsScreen />} />
      <Route path="/google-signup" element={<GoogleSignUpScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/all-environments" element={<AllEnvironmentsScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/favorites" element={<FavoritesScreen />} />
    </Routes>
  )
}

export default App