import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthLayout from '../components/layout/AuthLayout'
import BackButton from '../components/common/BackButton'
import Input from '../components/common/Input'
import '../styles/ChangePassword.css'

function ChangePasswordScreen() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleConfirm = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) { alert(t('changePassword.mismatch')); return }
    navigate('/')
  }

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/verify-code')} />
      <div className="change-password-content">
        <div className="change-icon">🔑</div>
        <h1>{t('changePassword.title')}</h1>
        <p className="change-description">{t('changePassword.description')}</p>
        <form onSubmit={handleConfirm}>
          <Input label={t('changePassword.newPassword')} type="password" placeholder={t('login.placeholder')} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Input label={t('changePassword.confirmPassword')} type="password" placeholder={t('login.placeholder')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit" className="btn-confirm">{t('changePassword.confirmBtn')}</button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ChangePasswordScreen