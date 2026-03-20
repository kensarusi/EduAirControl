import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import BackButton from '../components/common/BackButton'
import Input from '../components/common/Input'
import '../styles/ForgotPassword.css'

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSendCode = (e) => {
    e.preventDefault()
    console.log('Recovery code sent to:', email)
    navigate('/verify-code')
  }

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/')} />

      <div className="forgot-password-content">
        <div className="forgot-icon">🔒</div>
        <h1>Forgot Password</h1>
        <p className="forgot-description">
          Enter your email address and we'll send you a recovery code.
        </p>

        <form onSubmit={handleSendCode}>
          <Input
            label="Email Address"
            type="email"
            placeholder="Value"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-send-code">
            Send Recovery Code
          </button>
        </form>

        <p className="try-another">Try Another Way</p>
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordScreen