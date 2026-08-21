import AuthLayout from '../../components/AuthLayout/AuthLayout'
import AuthSlider from '../../components/AuthSlider/AuthSlider'

function SignUpScreen() {
  return (
    <AuthLayout className="auth-login-background">
      <AuthSlider initialRegister />
    </AuthLayout>
  )
}

export default SignUpScreen
