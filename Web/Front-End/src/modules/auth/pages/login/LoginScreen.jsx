import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LoginForm from '../../components/loginForm/LoginForm'
import SocialLogin from '../../components/SocialLogin/SocialLogin'
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { Divider } from "../../../../shared/components";
import "./Login.css";

function LoginScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <div className="login-header-centered">
        <h1>{t('login.title')}</h1>
        <p className="login-subtitle">
          {t('login.subtitle', 'Bienvenido de nuevo a EduAirControl')}
        </p>
      </div>

      <LoginForm />

      <Divider text={t('login.or')} className="divider-clean" />

      <div className="login-footer-actions">
        <button
          className="btn-signup-outline"
          onClick={() => navigate('/signup')}
        >
          {t('login.signUpBtn')}
        </button>

        <SocialLogin />
      </div>
    </AuthLayout>
  )
}

export default LoginScreen