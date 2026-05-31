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
<<<<<<< Updated upstream

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
=======
  
  const [formData, setFormData] = useState({
    companyCode: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  
  const [showTerms, setShowTerms] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      alert(t('signup.errorTerms', 'Debes aceptar los términos'))
      return
    }
    if (formData.password !== formData.confirmPassword) {
      alert(t('signup.errorPassword', 'Las contraseñas no coinciden'))
      return
    }
    alert(`Registro exitoso para la empresa: ${formData.companyCode}`)
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <div className="signup-container-premium">
        <button className="back-btn-minimal" onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>

        <div className="signup-header-centered">
          <h1>{t('signup.title')}</h1>
          <p>{t('signup.subtitle', 'Únete a la red de monitoreo inteligente')}</p>
        </div>

        <form className="signup-form-modern" onSubmit={handleSubmit}>
          <div className="input-group-modern">
            <label>{t('signup.companyCode', 'Código de Empresa')}</label>
            <div className="input-wrapper">
              <FaBuilding className="input-icon" />
              <input
                type="text"
                name="companyCode"
                placeholder={t('signup.placeholderCompany', 'Ej: EDU-2024')}
                value={formData.companyCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group-modern">
            <label>{t('signup.fullName', 'Nombre completo')}</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder={t('signup.placeholderName')}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group-modern">
            <label>{t('signup.email')}</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder={t('signup.placeholderEmail')}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row-modern">
            <div className="input-group-modern">
              <label>{t('signup.password')}</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group-modern">
              <label>{t('signup.confirmPassword')}</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="terms-container-modern">
            <label className="custom-toggle-modern">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <span className="slider-modern"></span>
            </label>
            <span className="terms-text-modern">
              {t('signup.accept')}{' '}
              <button type="button" className="terms-link-btn" onClick={() => setShowTerms(true)}>
                {t('signup.terms')}
              </button>
            </span>
          </div>

          <button type="submit" className="btn-signup-premium">
            {t('signup.signUpBtn')}
          </button>
        </form>

        <Divider text="OR" className="divider-clean" />
        <SocialLogin />
>>>>>>> Stashed changes
      </div>
      <SignUpForm />
      <Divider text="OR" />
      <SocialLogin />
    </AuthLayout>
  )
}

export default SignUpScreen
