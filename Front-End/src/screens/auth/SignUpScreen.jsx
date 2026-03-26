import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthLayout from '../../components/layout/AuthLayout'
import SignUpForm from '../../components/forms/SignUpForm'
import SocialLogin from '../../components/forms/SocialLogin'
import { BackButton, Divider } from '../../components/ui'
import '../../styles/auth/SignUp.css'

function SignUpScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate('/')} />
      <div className="signup-header">
        <h1>{t('signup.title')}</h1>
        <div className="signup-avatar">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYh5ktN6ivxkuHo-AYZ9v1njCxhjyPdBArvA&s"
            alt="avatar"
          />
        </div>
      </div>
      <SignUpForm />
      <Divider text="OR" />
      <SocialLogin />
    </AuthLayout>
  )
}

export default SignUpScreen
