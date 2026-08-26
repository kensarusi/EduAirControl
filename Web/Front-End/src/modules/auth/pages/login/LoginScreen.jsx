import AuthLayout from '../../components/AuthLayout/AuthLayout'
import AuthSlider from '../../components/AuthSlider/AuthSlider'
import { useSearchParams } from 'react-router-dom'

function LoginScreen() {
  const [searchParams] = useSearchParams()
  const initialRegister = searchParams.get('panel') === 'register'

  return (
    <AuthLayout className="auth-login-background">
      <AuthSlider initialRegister={initialRegister} />
    </AuthLayout>
  )
}

export default LoginScreen
