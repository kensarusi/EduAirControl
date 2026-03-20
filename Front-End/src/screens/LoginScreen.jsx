import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import LoginForm from '../components/forms/LoginForm'
import Divider from '../components/common/Divider'
import SocialLogin from '../components/common/SocialLogin'
import '../styles/Login.css'

function LoginScreen() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <div className="login-header">
        <h1>Login</h1>
        <div className="login-avatar">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYh5ktN6ivxkuHo-AYZ9v1njCxhjyPdBArvA&s" alt="avatar" />
        </div>
      </div>

      <LoginForm />

      <Divider text="OR" />

      <button
        className="btn-signup"
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </button>

      <SocialLogin />
    </AuthLayout>
  )
}

export default LoginScreen