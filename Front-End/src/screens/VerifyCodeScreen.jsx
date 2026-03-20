import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import BackButton from '../components/common/BackButton'
import '../styles/VerifyCode.css'

function VerifyCodeScreen() {
  const [code, setCode] = useState(['', '', '', '', ''])
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus siguiente input
    if (value && index < 4) {
      document.getElementById(`code-${index + 1}`).focus()
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    console.log('Code:', code.join(''))
    navigate('/change-password')
  }

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/forgot-password')} />

      <div className="verify-code-content">
        <div className="verify-icon">📱</div>
        <h1>Verify Code</h1>
        <p className="verify-description">
          Enter the 5-digit code sent to your email.
        </p>

        <form onSubmit={handleVerify}>
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="code-input"
              />
            ))}
          </div>

          <a href="#" className="resend-code" onClick={(e) => {
            e.preventDefault()
            console.log('Code resent!')
          }}>
            Resend Code
          </a>

          <button type="submit" className="btn-verify">
            Verify Code
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default VerifyCodeScreen