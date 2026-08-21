import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaUser, FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa'
import { HiOutlineDocumentText, HiCheckCircle } from 'react-icons/hi2'
import SocialLogin from '../SocialLogin/SocialLogin'
import { Divider } from '../../../../shared/components'
import '../../pages/signUp/SignUp.css'

function SignUpForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const termsSummary = t('signup.termsModal.items', { returnObjects: true })
  const [hasReadFullTerms] = useState(
    () => sessionStorage.getItem('eduaircontrol-terms-read') === 'true'
  )
  const [formData, setFormData] = useState({
    companyCode: '', name: '', email: '', password: '', confirmPassword: '', acceptTerms: false
  })
  const [showTerms, setShowTerms] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!hasReadFullTerms) { setShowTerms(true); return }
    if (!formData.acceptTerms) { alert(t('signup.errorTerms', 'Debes aceptar los términos')); return }
    if (formData.password !== formData.confirmPassword) { alert(t('signup.errorPassword', 'Las contraseñas no coinciden')); return }
    alert(`Registro exitoso para la empresa: ${formData.companyCode}`)
    navigate('/dashboard')
  }

  return (
    <>
      <form className="signup-form-modern" onSubmit={handleSubmit}>
        <div className="input-group-modern">
          <label htmlFor="signup-company-code">{t('signup.companyCode', 'Código de Empresa')}</label>
          <div className="input-wrapper">
            <FaBuilding className="input-icon" />
            <input id="signup-company-code" type="text" name="companyCode" placeholder={t('signup.placeholderCompany', 'Ej: EDU-2024')} value={formData.companyCode} onChange={handleChange} required />
          </div>
        </div>
        <div className="input-group-modern">
          <label htmlFor="signup-name">{t('signup.fullName', 'Nombre completo')}</label>
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input id="signup-name" type="text" name="name" placeholder={t('signup.placeholderName')} value={formData.name} onChange={handleChange} required />
          </div>
        </div>
        <div className="input-group-modern">
          <label htmlFor="signup-email">{t('signup.email')}</label>
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input id="signup-email" type="email" name="email" placeholder={t('signup.placeholderEmail')} value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row-modern">
          <div className="input-group-modern">
            <label htmlFor="signup-password">{t('signup.password')}</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input id="signup-password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-group-modern">
            <label htmlFor="signup-confirm-password">{t('signup.confirmPassword', 'Confirmar contraseña')}</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input id="signup-confirm-password" type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>
        </div>
        <div className="terms-container-modern">
          <label className="custom-toggle-modern" htmlFor="signup-accept-terms">
            <input id="signup-accept-terms" type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} disabled={!hasReadFullTerms} />
            <span className="slider-modern"></span>
          </label>
          <p className="terms-text-modern">
            {t('signup.termsModal.acceptPrefix')}{' '}
            <button type="button" className="terms-link-btn" onClick={() => setShowTerms(true)}>{t('signup.termsModal.link')}</button>
          </p>
          {!hasReadFullTerms && <p className="terms-read-required">{t('signup.termsModal.readRequired')}</p>}
        </div>
        <button type="submit" className="btn-signup-premium">{t('signup.signUpBtn')}</button>
      </form>
      <Divider text="OR" className="divider-clean" />
      <SocialLogin />

      {showTerms && (
        <div className="modal-overlay-modern" onClick={() => setShowTerms(false)}>
          <div className="modal-content-modern" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon"><HiOutlineDocumentText /></div>
              <h2>{t('signup.termsModal.title')}</h2>
              <p>{t('signup.termsModal.subtitle')}</p>
            </div>
            <div className="terms-scroll-area" key={showTerms}>
              <p>{t('signup.termsModal.intro')}</p>
              <div className="terms-modal-list">
                {termsSummary.map(item => <div className="term-modal-item" key={item}><HiCheckCircle /><span>{item}</span></div>)}
              </div>
              <p>{t('signup.termsModal.notice')}</p>
              <p className="terms-full-document">
                {t('signup.termsModal.fullDocumentPrefix')}{' '}
                <button type="button" className="terms-link-btn" onClick={() => navigate('/terms')}>{t('signup.termsModal.fullDocumentLink')}</button>
              </p>
            </div>
            <button className="btn-close-modal" onClick={() => setShowTerms(false)}>{t('common.close')}</button>
          </div>
        </div>
      )}
    </>
  )
}

export default SignUpForm
