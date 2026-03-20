import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import BackButton from '../components/common/BackButton'
import Input from '../components/common/Input'
import Divider from '../components/common/Divider'
import SocialLogin from '../components/common/SocialLogin'
import '../styles/SignUp.css'

function SignUpScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if (!agreeTerms) {
      alert('You must agree to the Terms and Conditions')
      return
    }
    console.log('Sign Up:', { name, email, password })
    navigate('/')
  }

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/')} />

      <div className="signup-header">
        <h1>Sign Up</h1>
        <div className="signup-avatar">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYh5ktN6ivxkuHo-AYZ9v1njCxhjyPdBArvA&s" alt="avatar" />
        </div>
      </div>

      <form onSubmit={handleSignUp}>
        <Input label="Name" type="text" placeholder="Value" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" type="email" placeholder="Value" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" placeholder="Value" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input label="Re-type password" type="password" placeholder="Value" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <div className="terms-checkbox">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <span>I agree to the </span>
          <a href="#" onClick={(e) => {
            e.preventDefault()
            navigate('/terms')
          }} className="terms-link">
            Terms of Use and Privacy Policy.
          </a>
        </div>

        <button type="submit" className="btn-signup-submit">Sign Up</button>
      </form>

      <Divider text="OR" />

      <SocialLogin />
    </AuthLayout>
  )
}

export default SignUpScreen
