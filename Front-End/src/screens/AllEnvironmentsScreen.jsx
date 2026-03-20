import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import BackButton from '../components/common/BackButton'
import EnvironmentSummaryCard from '../components/common/EnvironmentSummaryCard'
import '../styles/AllEnvironments.css'

function AllEnvironmentsScreen() {
  const navigate = useNavigate()

  const environments = [
    {
      name: 'Environment Training 1',
      status: 'Normal',
      co2: '1176 ppm',
      db: '39',
      temp: '22°',
      humidity: '49%',
      airQuality: 'Excelent'
    },
    {
      name: 'Environment Training 2',
      status: 'Alert',
      co2: '1176 ppm',
      db: '39',
      temp: '22°',
      humidity: '49%',
      airQuality: 'Bad'
    },
    {
      name: 'Environment Training 3',
      status: 'Warning',
      co2: '1176 ppm',
      db: '39',
      temp: '22°',
      humidity: '49%',
      airQuality: 'Regular'
    }
  ]

  const normalCount = environments.filter(e => e.status === 'Normal').length
  const warningCount = environments.filter(e => e.status === 'Warning').length
  const alertCount = environments.filter(e => e.status === 'Alert').length

  return (
    <div className="all-env-page">
      <Navbar />
      <div className="all-env-container">
        <BackButton onClick={() => navigate('/dashboard')} />
        <h1 className="all-env-title">All Environments</h1>

        {/* Encabezados */}
        <div className="all-env-headers">
          <span>Ambiente</span>
          <span>CO2</span>
          <span>dB</span>
          <span>Temperatura</span>
        </div>

        {/* Tarjetas */}
        <div className="all-env-cards">
          {environments.map((env, index) => (
            <EnvironmentSummaryCard key={index} {...env} />
          ))}
        </div>

        {/* Resumen inferior */}
        <div className="all-env-summary">
          <div className="summary-badge normal">
            <span>Estado Normal</span>
            <strong>{normalCount}</strong>
          </div>
          <div className="summary-badge warning">
            <span>Advertencias</span>
            <strong>{warningCount}</strong>
          </div>
          <div className="summary-badge alert">
            <span>Alertas</span>
            <strong>{alertCount}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllEnvironmentsScreen
