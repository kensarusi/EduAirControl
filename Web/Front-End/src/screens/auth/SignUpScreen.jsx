import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaArrowLeft } from 'react-icons/fa'
import AuthLayout from '../../components/layout/AuthLayout'
import SocialLogin from '../../components/forms/SocialLogin'
import { Divider } from '../../components/ui'
import '../../styles/auth/SignUp.css'

function SignUpScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
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
    // Aquí iría la lógica para validar el companyCode y registrar al usuario
    alert(`Registro exitoso para la empresa: ${formData.companyCode}`)
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <div className="signup-container-premium">
        <button className="back-btn-minimal" onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>

        <div className="signup-header-modern">
          <div className="header-text">
            <h1>{t('signup.title')}</h1>
            <p>{t('signup.subtitle', 'Únete a la red de monitoreo inteligente')}</p>
          </div>
          <div className="signup-avatar-premium">
            <div className="avatar-glow"></div>
          </div>
        </div>

        <form className="signup-form-modern" onSubmit={handleSubmit}>
          {/* Campo de Empresa - Clave para Multi-Empresa */}
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

        <Divider text="OR" />
        <SocialLogin />
      </div>

      {showTerms && (
        <div className="modal-overlay-modern" onClick={() => setShowTerms(false)}>
          <div className="modal-content-modern" onClick={(e) => e.stopPropagation()}>
            <h2>{t('signup.termsTitle')}</h2>
            <div className="terms-scroll-area">
              <p>{t('signup.termsIntro')}</p>
              <ul>
                <li>{t('signup.term1')}</li>
                <li>{t('signup.term2')}</li>
                <li>{t('signup.term3')}</li>
                <li>{t('signup.term4')}</li>
              </ul>
            </div>
            <button className="btn-close-modal" onClick={() => setShowTerms(false)}>
              {t('common.close', 'Cerrar')}
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}

export default SignUpScreen