import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Input } from '../ui'
import '../../styles/auth/Login.css'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label={t('login.email')}
        type="email"
        placeholder={t('login.placeholderEmail')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label={t('login.password')}
        type="password"
        placeholder={t('login.placeholderPassword')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="login-options">
        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          {t('login.rememberMe')}
        </label>
        <a
          href="#"
          className="forgot-password"
          onClick={(e) => { e.preventDefault(); navigate('/forgot-password') }}
        >
          {t('login.forgotPassword')}
        </a>
      </div>

      <button type="submit" className="btn-login">{t('login.loginBtn')}</button>
    </form>
  )
}

export default LoginForm
