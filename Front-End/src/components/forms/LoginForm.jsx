import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import '../../styles/Login.css'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Remember me:', rememberMe)
    // Aquí después conectarás con el backend
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <div className="login-options">
        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <a
          href="#"
          className="forgot-password"
          onClick={(e) => {
            e.preventDefault()
            navigate('/forgot-password')
          }}
        >
          Forgot password?
        </a>
      </div>

      <button type="submit" className="btn-login">Login</button>
    </form>
  )
}

export default LoginForm