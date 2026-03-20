import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'

function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    console.log('Contraseña cambiada')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="New Password"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        text="Confirm Change"
        className="btn-login"
        type="submit"
      />
    </form>
  )
}

export default ChangePasswordForm