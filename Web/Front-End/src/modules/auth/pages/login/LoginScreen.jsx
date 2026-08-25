import AuthLayout from '../../components/AuthLayout/AuthLayout'
import AuthSlider from '../../components/AuthSlider/AuthSlider'

function LoginScreen() {
  return (
    <AuthLayout className="auth-login-background">
      <AuthSlider />
    </AuthLayout>
  )
}

export default LoginScreen
