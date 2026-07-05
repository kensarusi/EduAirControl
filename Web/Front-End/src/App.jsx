import { Routes, Route } from 'react-router-dom'
import LoginScreen from '../modules/auth/LoginScreen'
import SignUpScreen from '../modules/auth/SignUpScreen'
import ForgotPasswordScreen from '../modules/auth/ForgotPasswordScreen'
import VerifyCodeScreen from '../modules/auth/VerifyCodeScreen'
import ChangePasswordScreen from '../modules/auth/ChangePasswordScreen'
import TermsScreen from '../modules/auth/TermsScreen'
import GoogleSignUpScreen from '../modules/auth/GoogleSignUpScreen'
import FacebookSignUpScreen from '../modules/auth/FacebookSignUpScreen'
import OAuth2SuccessScreen from '../modules/auth/OAuth2SuccessScreen'
import DashboardScreen from '../screens/app/DashboardScreen'
import AllEnvironmentsScreen from '../screens/app/AllEnvironmentsScreen'
import ProfileScreen from '../screens/app/ProfileScreen'
import SettingsScreen from '../screens/app/SettingsScreen'
import FavoritesScreen from '../screens/app/FavoritesScreen'
import EnvironmentManagement from "../screens/app/EnvironmentManagement";
import EnvironmentDetailScreen from '../screens/app/EnvironmentDetailScreen'
import Landing from '../shared/Landing/Landing'
import Login from "../modules/auth/LoginScreen"
import Register from "../modules/auth/SignUpScreen"

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/"                element={<LoginScreen />} />
      <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/signup"          element={<SignUpScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/verify-code"     element={<VerifyCodeScreen />} />
      <Route path="/change-password" element={<ChangePasswordScreen />} />
      <Route path="/terms"           element={<TermsScreen />} />
      <Route path="/google-signup"    element={<GoogleSignUpScreen />} />
      <Route path="/facebook-signup"  element={<FacebookSignUpScreen />} />
      <Route path="/oauth2/success"   element={<OAuth2SuccessScreen />} />

      {/* App */}
      <Route path="/dashboard"        element={<DashboardScreen />} />
      <Route path="/all-environments" element={<AllEnvironmentsScreen />} />
      <Route path="/profile"          element={<ProfileScreen />} />
      <Route path="/settings"         element={<SettingsScreen />} />
      <Route path="/favorites"        element={<FavoritesScreen />} />
      <Route path="/management" element={<EnvironmentManagement />} />
      <Route path="/environment/:id" element={<EnvironmentDetailScreen />} />
    </Routes>
  )
}

export default App
