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
  const [acceptTerms, setAcceptTerms] = useState(false)

  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    alert(`Registro exitoso: ${name}, ${email}`)
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
  label={t('signup.title')}
  type="text"
  placeholder={t('signup.placeholderName')}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<Input
  label={t('signup.email')}
  type="email"
  placeholder={t('signup.placeholderEmail')}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<Input
  label={t('signup.password')}
  type="password"
  placeholder={t('signup.placeholderPassword')}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<Input
  label={t('signup.confirmPassword')}
  type="password"
  placeholder={t('signup.placeholderConfirm')}
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>

<div className="terms">
  <label className="terms-label">
    <input
      type="checkbox"
      checked={acceptTerms}
      onChange={(e) => setAcceptTerms(e.target.checked)}
    />
    {t('signup.agreeTerms')}{" "}
    <span>{t('signup.termsLink')}</span>
  </label>
</div>

<button type="submit" className="btn-login">
  {t('signup.signUpBtn')}
</button>

    </form>
  )
}

export default SignUpForm
