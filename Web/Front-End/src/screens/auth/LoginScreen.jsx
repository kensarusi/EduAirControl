import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LoginForm from '../../components/forms/LoginForm'
import SocialLogin from '../../components/forms/SocialLogin'
import { Divider, LanguageSelector } from '../../components/ui'
import '../../styles/auth/Login.css'

function LoginScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="auth-container">
      <LanguageSelector />
      <div className="auth-card">
      <div className="login-header">
        <h1>{t('login.title')}</h1>
        <div className="login-avatar">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYh5ktN6ivxkuHo-AYZ9v1njCxhjyPdBArvA&s"
            alt="avatar"
          />
        </div>
      </div>
      <LoginForm />
      <Divider text={`${t('login.or')}`} />
      <button className="btn-signup" onClick={() => navigate('/signup')}>
        {t('login.signUpBtn')}
      </button>
      <SocialLogin />
      </div>
    </div>
  )
}

export default LoginScreen