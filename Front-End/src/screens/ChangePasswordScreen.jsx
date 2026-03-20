import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import BackButton from '../components/common/BackButton'
import Input from '../components/common/Input'
import '../styles/ChangePassword.css'

function ChangePasswordScreen() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleConfirm = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    console.log('Password changed!')
    navigate('/')
  }

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/verify-code')} />

      <div className="change-password-content">
        <div className="change-icon">🔑</div>
        <h1>Forgot Password</h1>
        <p className="change-description">
          Update your password to keep your account secure.
        </p>

        <form onSubmit={handleConfirm}>
          <Input
            label="New Password"
            type="password"
            placeholder="Value"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Value"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn-confirm">
            Confirm Change
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ChangePasswordScreen