import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthLayout from '../components/layout/AuthLayout'
import BackButton from '../components/common/BackButton'
import '../styles/VerifyCode.css'

function VerifyCodeScreen() {
  const [code, setCode] = useState(['', '', '', '', ''])
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 4) document.getElementById(`code-${index + 1}`).focus()
  }

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/forgot-password')} />
      <div className="verify-code-content">
        <div className="verify-icon">📱</div>
        <h1>{t('verifyCode.title')}</h1>
        <p className="verify-description">{t('verifyCode.description')}</p>
        <form onSubmit={(e) => { e.preventDefault(); navigate('/change-password') }}>
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input key={index} id={`code-${index}`} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(index, e.target.value)} className="code-input" />
            ))}
          </div>
          <a href="#" className="resend-code" onClick={(e) => e.preventDefault()}>{t('verifyCode.resend')}</a>
          <button type="submit" className="btn-verify">{t('verifyCode.verifyBtn')}</button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default VerifyCodeScreen