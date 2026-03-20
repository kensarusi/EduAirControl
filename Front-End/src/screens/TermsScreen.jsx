import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/Terms.css'

function TermsScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <h1>{t('terms.title')}</h1>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYh5ktN6ivxkuHo-AYZ9v1njCxhjyPdBArvA&s" alt="EduAirControl" className="terms-logo" />
        </div>
        <div className="terms-content">
          <p>{t('terms.intro')}</p>
          <ul>
            <li>{t('terms.item1')}</li>
            <li>{t('terms.item2')}</li>
            <li>{t('terms.item3')}</li>
            <li>{t('terms.item4')}</li>
          </ul>
          <p>{t('terms.footer1')}</p>
          <p>{t('terms.footer2')}</p>
        </div>
        <button className="btn-accept" onClick={() => navigate('/signup')}>{t('terms.acceptBtn')}</button>
      </div>
    </div>
  )
}

export default TermsScreen