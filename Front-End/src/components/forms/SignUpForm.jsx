import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import '../../styles/SignUp.css'

function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    if (!agreeTerms) {
      alert('Debes aceptar los términos y condiciones')
      return
    }

    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Password:', password)
    // Aquí después conectarás con el backend
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        type="text"
        placeholder="Value"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Value"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Value"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        label="Re-type password"
        type="password"
        placeholder="Value"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="terms-checkbox">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <span>
          I agree to the{' '}
          <a
            href="#"
            className="terms-link"
            onClick={(e) => {
              e.preventDefault()
              navigate('/terms')
            }}
          >
            Terms of Use and Privacy Policy.
          </a>
        </span>
      </div>

      <button type="submit" className="btn-signup-submit">Sign Up</button>
    </form>
  )
}

export default SignUpForm