import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthLayout from '../../components/layout/AuthLayout'
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm'
import { BackButton } from '../../components/ui'
import '../../styles/auth/ForgotPassword.css'

function ForgotPasswordScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/')} />
      <div className="forgot-password-content">
        <div className="forgot-icon">🔒</div>
        <h1>{t('forgotPassword.title')}</h1>
        <p className="forgot-description">{t('forgotPassword.description')}</p>
        <ForgotPasswordForm />
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordScreen
