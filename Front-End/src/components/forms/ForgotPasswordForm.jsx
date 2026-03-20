import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'

function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email enviado:', email)
    navigate('/verify-code')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        text="Send Recovery Code"
        className="btn-login"
        type="submit"
      />
      <p className="try-another">Try Another Way</p>
    </form>
  )
}

export default ForgotPasswordForm