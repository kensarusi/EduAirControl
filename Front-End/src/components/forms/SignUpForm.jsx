import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Input } from '../ui'
import '../../styles/auth/SignUp.css'

function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) { alert(t('signup.passwordMismatch')); return }
    if (!agreeTerms) { alert(t('signup.mustAgreeTerms')); return }
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input label={t('signup.name')} type="text" placeholder={t('login.placeholder')} value={name} onChange={(e) => setName(e.target.value)} />
      <Input label={t('signup.email')} type="email" placeholder={t('login.placeholder')} value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label={t('signup.password')} type="password" placeholder={t('login.placeholder')} value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label={t('signup.confirmPassword')} type="password" placeholder={t('login.placeholder')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <div className="terms-checkbox">
        <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms') }} className="terms-link">
          {t('signup.termsLink')}
        </a>
      </div>

      <button type="submit" className="btn-signup-submit">{t('signup.signUpBtn')}</button>
    </form>
  )
}

export default SignUpForm
