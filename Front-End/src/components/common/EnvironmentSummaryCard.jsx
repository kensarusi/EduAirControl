import '../../styles/AllEnvironments.css'

function EnvironmentSummaryCard({ name, status, co2, db, temp, humidity, airQuality }) {

  const statusColor = () => {
    if (status === 'Normal') return '#4CAF50'
    if (status === 'Alert') return '#F44336'
    return '#FFC107'
  }

  const qualityColor = () => {
    if (airQuality === 'Excelent') return '#4CAF50'
    if (airQuality === 'Bad') return '#F44336'
    return '#FFC107'
  }

  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <h3>{name}</h3>
        <span style={{ color: statusColor() }}>{status}</span>
      </div>

      <div className="summary-card-grid">
        <div className="summary-item">
          <span className="summary-label">CO2</span>
          <span className="summary-value">{co2}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">dB</span>
          <span className="summary-value">{db}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Temp</span>
          <span className="summary-value">{temp}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Humidity</span>
          <span className="summary-value">{humidity}</span>
        </div>
      </div>

      <div className="summary-card-footer">
        <span>Air quality:</span>
        <span style={{ color: qualityColor() }}>{airQuality}</span>
      </div>
    </div>
  )
}

export default EnvironmentSummaryCard
