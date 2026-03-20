import { useNavigate } from 'react-router-dom'
import '../styles/Terms.css'

function TermsScreen() {
  const navigate = useNavigate()

  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <h1>Terms and Conditions</h1>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYh5ktN6ivxkuHo-AYZ9v1njCxhjyPdBArvA&s"
            alt="EduAirControl"
            className="terms-logo"
          />
        </div>

        <div className="terms-content">
          <p>By accessing and using EduAirControl, you agree to comply with the following terms:</p>
          <ul>
            <li>You will provide accurate and complete information.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>The platform must be used only for authorized and lawful purposes.</li>
            <li>Environmental data provided by the system is for monitoring and reporting purposes only.</li>
          </ul>
          <p>EduAirControl reserves the right to update these terms at any time. Continued use of the platform implies acceptance of any modifications.</p>
          <p>By clicking "Accept", you confirm that you have read and agreed to these Terms and Conditions.</p>
        </div>

        <button className="btn-accept" onClick={() => navigate('/signup')}>
          ACCEPT
        </button>
      </div>
    </div>
  )
}

export default TermsScreen