import { Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/auth/LoginScreen'
import SignUpScreen from './screens/auth/SignUpScreen'
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen'
import VerifyCodeScreen from './screens/auth/VerifyCodeScreen'
import ChangePasswordScreen from './screens/auth/ChangePasswordScreen'
import TermsScreen from './screens/auth/TermsScreen'
import GoogleSignUpScreen from './screens/auth/GoogleSignUpScreen'
import FacebookSignUpScreen from './screens/auth/FacebookSignUpScreen'
import DashboardScreen from './screens/app/DashboardScreen'
import AllEnvironmentsScreen from './screens/app/AllEnvironmentsScreen'
import ProfileScreen from './screens/app/ProfileScreen'
import SettingsScreen from './screens/app/SettingsScreen'
import FavoritesScreen from './screens/app/FavoritesScreen'

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/"                element={<LoginScreen />} />
      <Route path="/signup"          element={<SignUpScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/verify-code"     element={<VerifyCodeScreen />} />
      <Route path="/change-password" element={<ChangePasswordScreen />} />
      <Route path="/terms"           element={<TermsScreen />} />
      <Route path="/google-signup"    element={<GoogleSignUpScreen />} />
      <Route path="/facebook-signup"  element={<FacebookSignUpScreen />} />

      {/* App */}
      <Route path="/dashboard"        element={<DashboardScreen />} />
      <Route path="/all-environments" element={<AllEnvironmentsScreen />} />
      <Route path="/profile"          element={<ProfileScreen />} />
      <Route path="/settings"         element={<SettingsScreen />} />
      <Route path="/favorites"        element={<FavoritesScreen />} />
    </Routes>
  )
}

export default App