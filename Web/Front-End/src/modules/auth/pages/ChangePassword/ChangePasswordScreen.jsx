import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthLayout from '../../components/layout/AuthLayout'
import ChangePasswordForm from '../../components/forms/ChangePasswordForm'
import { BackButton } from '../../components/ui'
import '../../styles/auth/ChangePassword.css'

function ChangePasswordScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/verify-code')} />
      <div className="change-password-content">
        <div className="change-icon">🔑</div>
        <h1>{t('changePassword.title')}</h1>
        <p className="change-description">{t('changePassword.description')}</p>
        <ChangePasswordForm />
      </div>
    </AuthLayout>
  )
}

export default ChangePasswordScreen
