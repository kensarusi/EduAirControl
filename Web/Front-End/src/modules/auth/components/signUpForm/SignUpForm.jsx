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
  const [showTerms, setShowTerms] = useState(false)

  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!acceptTerms) {
      alert('Debes aceptar los términos')
      return
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    alert(`Registro exitoso: ${name}, ${email}`)
    navigate('/dashboard')
  }

  return (
  <>
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
        <label className="terms-toggle">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />

          <span className="toggle-slider"></span>

          <span className="terms-text">
            {t('signup.accept')}{' '}
            <span
              className="terms-link"
              onClick={(e) => {
                e.preventDefault()   
                setShowTerms(true)
              }}
            >
              {t('signup.terms')}
            </span>
          </span>
        </label>
      </div>

      <button type="submit" className="btn-login">
        {t('signup.signUpBtn')}
      </button>
    </form>

    {showTerms && (
      <div
        className="terms-modal-overlay"
        onClick={() => setShowTerms(false)}
      >
        <div
          className="terms-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>{t('signup.termsTitle')}</h2>

          <div className="terms-content">
            <p>{t('signup.termsIntro')}</p>

            <ul>
              <li>{t('signup.term1')}</li>
              <li>{t('signup.term2')}</li>
              <li>{t('signup.term3')}</li>
              <li>{t('signup.term4')}</li>
            </ul>
          </div>

          <button onClick={() => setShowTerms(false)}>
            {t('common.close')}
          </button>
        </div>
      </div>
    )}
  </>
)

}

export default SignUpForm