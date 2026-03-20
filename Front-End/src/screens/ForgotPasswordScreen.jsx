import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthLayout from '../components/layout/AuthLayout'
import BackButton from '../components/common/BackButton'
import Input from '../components/common/Input'
import '../styles/ForgotPassword.css'

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSendCode = (e) => {
    e.preventDefault()
    navigate('/verify-code')
  }

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/')} />
      <div className="forgot-password-content">
        <div className="forgot-icon">🔒</div>
        <h1>{t('forgotPassword.title')}</h1>
        <p className="forgot-description">{t('forgotPassword.description')}</p>
        <form onSubmit={handleSendCode}>
          <Input label={t('forgotPassword.emailLabel')} type="email" placeholder={t('login.placeholder')} value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="btn-send-code">{t('forgotPassword.sendBtn')}</button>
        </form>
        <p className="try-another">{t('forgotPassword.tryAnother')}</p>
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordScreen