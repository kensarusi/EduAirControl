import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

function SocialLogin() {
  const navigate = useNavigate()

  return (
    <div>
      <p className="social-text">Sign In using your account with</p>
      <div className="social-buttons">
        <button className="btn-facebook">
          <FaFacebookF /> Facebook
        </button>
        <button className="btn-google" onClick={() => navigate('/google-signup')}>
          <FcGoogle /> Google
        </button>
      </div>
    </div>
  )
}

export default SocialLogin