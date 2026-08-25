import AuthLayout from '../../components/AuthLayout/AuthLayout'

function SignUpScreen() {

  const navigate = useNavigate()
  const { t } = useTranslation()

  const termsSummary = t("signup.termsModal.items", { returnObjects: true })

  const [hasReadFullTerms] = useState(
    () => sessionStorage.getItem("eduaircontrol-terms-read") === "true"
  )

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

  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(formData.password),
  }
  const passwordStrength = Object.values(passwordRequirements).filter(Boolean).length

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!hasReadFullTerms) {
      setShowTerms(true)
      return
    }

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
        <button
          className="back-btn-minimal"
          onClick={() => navigate('/login')}
        >
          <FaArrowLeft />
        </button>

        <div className="signup-header-centered">
          <h1>{t('signup.title')}</h1>
          <p>
            {t(
              'signup.subtitle',
              'Únete a la red de monitoreo inteligente'
            )}
          </p>
        </div>

        <form
          className="signup-form-modern"
          onSubmit={handleSubmit}
        >
          <div className="input-group-modern">
            <label>
              {t('signup.companyCode', 'Código de Empresa')}
            </label>

            <div className="input-wrapper">
              <FaBuilding className="input-icon" />

              <input
                type="text"
                name="companyCode"
                placeholder={t(
                  'signup.placeholderCompany',
                  'Ej: EDU-2024'
                )}
                value={formData.companyCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group-modern">
            <label>
              {t('signup.fullName', 'Nombre completo')}
            </label>

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
            <label>
              {t('signup.email')}
            </label>

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
              <label>
                {t('signup.password')}
              </label>

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
              {formData.password && (
              <div className="password-strength">
                <div className="password-strength-bar">
                  <div
                    className={`password-strength-fill strength-${passwordStrength}`}
                  ></div>
                </div>
                <span>
                  {passwordStrength <= 2 && t("signup.passwordStrength.weak")}
                  {passwordStrength === 3 && t("signup.passwordStrength.medium")}
                  {passwordStrength === 4 && t("signup.passwordStrength.good")}
                  {passwordStrength === 5 && t("signup.passwordStrength.strong")}
                </span>
              </div>
            )}

            </div>
            <div className="input-group-modern">
              <label>
                {t(
                  'signup.confirmPassword',
                  'Confirmar contraseña'
                )}
              </label>

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
                disabled={!hasReadFullTerms}
              />

              <span className="slider-modern"></span>
            </label>

            <p className="terms-text-modern">
              {t("signup.termsModal.acceptPrefix")}{" "}

              <button
                type="button"
                className="terms-link-btn"
                onClick={() => setShowTerms(true)}
              >
                {t("signup.termsModal.link")}
              </button>
            </p>

            {!hasReadFullTerms && (
              <p className="terms-read-required">
                {t("signup.termsModal.readRequired")}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-signup-premium"
          >
            {t('signup.signUpBtn')}
          </button>
        </form>

        <Divider
          text="OR"
          className="divider-clean"
        />

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

              <h2>
                {t("signup.termsModal.title")}
              </h2>

              <p>
                {t("signup.termsModal.subtitle")}
              </p>
            </div>

            <div
              className="terms-scroll-area"
              key={showTerms}
            >
              <p>
                {t("signup.termsModal.intro")}
              </p>

              <div className="terms-modal-list">
                {termsSummary.map((item) => (
                  <div
                    className="term-modal-item"
                    key={item}
                  >
                    <HiCheckCircle />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p>
                {t("signup.termsModal.notice")}
              </p>

              <p className="terms-full-document">
                {t("signup.termsModal.fullDocumentPrefix")}{" "}

                <button
                  type="button"
                  className="terms-link-btn"
                  onClick={() => navigate("/terms")}
                >
                  {t("signup.termsModal.fullDocumentLink")}
                </button>
              </p>
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
  )
}

export default SignUpScreen
