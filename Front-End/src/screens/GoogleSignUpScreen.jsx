import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import BackButton from '../components/common/BackButton'
import '../styles/GoogleSignUp.css'

function GoogleSignUpScreen() {
  const navigate = useNavigate()

  const accounts = [
    { name: 'Account 1', email: 'account1@gmail.com' },
    { name: 'Account 2', email: 'account2@gmail.com' },
    { name: 'Account 3', email: 'account3@gmail.com' },
  ]

  return (
    <AuthLayout>
      <BackButton onClick={() => navigate(-1)} />

      <div className="google-signup-content">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
          alt="Google"
          className="google-logo"
        />

        <div className="choose-account">
          <h3>Choose your Account</h3>
        </div>

        <div className="accounts-list">
          {accounts.map((account, index) => (
            <div key={index} className="account-item" onClick={() => {
              console.log('Selected:', account.name)
              navigate('/')
            }}>
              <div className="account-avatar">👤</div>
              <span>{account.name}</span>
            </div>
          ))}
        </div>

        <a href="#" className="other-account" onClick={(e) => {
          e.preventDefault()
          console.log('Other account')
        }}>
          Other account
        </a>
      </div>
    </AuthLayout>
  )
}

export default GoogleSignUpScreen