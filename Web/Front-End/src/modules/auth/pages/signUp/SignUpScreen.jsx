import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaArrowLeft } from 'react-icons/fa'
import { HiOutlineDocumentText, HiCheckCircle } from "react-icons/hi2";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import SocialLogin from '../../components/SocialLogin/SocialLogin'
import { Divider } from "../../../../shared/components";
import "./SignUp.css";

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

  const result = signUpSchema.safeParse(formData)

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
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
              <label>Confirmar contraseña</label>
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

          <p className="terms-text-modern">
            He leído y acepto los{" "}

            <button
              type="button"
              className="terms-link-btn"
              onClick={() => setShowTerms(true)}
            >
              Términos y Políticas de Seguridad
            </button>
          </p>
        </div>

          <button type="submit" className="btn-signup-premium">
            {t('signup.signUpBtn')}
          </button>
        </form>

        <Divider text="OR" className="divider-clean" />
        <SocialLogin />
      </div>

    {showTerms && (
      <div
        className="modal-overlay-modern"
        onClick={() => setShowTerms(false)}
      >
        <div
          className="modal-content-modern"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="modal-header">

            <div className="modal-icon">
              <HiOutlineDocumentText />
            </div>

            <h2>{t("terms.title")}</h2>

            <p>{t("terms.subtitle")}</p>

          </div>

          <div className="terms-scroll-area"
                key={showTerms}
          >

            <p>{t("terms.intro")}</p>

            <div className="terms-modal-list">

              {[1,2,3,4,5,6,7,8].map((item)=>(
                <div className="term-modal-item" key={item}>
                  <HiCheckCircle />
                  <span>{t(`terms.item${item}`)}</span>
                </div>
              ))}

            </div>

            <p>{t("terms.footer1")}</p>

            <p>{t("terms.footer2")}</p>

          </div>

          <button
            className="btn-close-modal"
            onClick={() => setShowTerms(false)}
          >
            {t("common.close")}
          </button>

        </div>
      </div>
    )}

    </AuthLayout>
  );
}

export default SignUpScreen;