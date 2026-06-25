import "./HeroDashboard.css";

export default function HeroDashboard() {
  return (
    <div className="dashboard-mockup">

      <div className="dashboard-header">
        <span>EduAirControl</span>
        <span>Online</span>
      </div>

      <div className="dashboard-metrics">

        <div className="metric-card">
          <span>IAQ</span>
          <p>28</p>
          <small>Excelente</small>
        </div>

        <div className="metric-card">
          <span>CO₂</span>
          <p>612</p>
          <small>ppm</small>
        </div>

        <div className="metric-card">
          <span>Temp</span>
          <p>23.6°</p>
          <small>Óptima</small>
        </div>

      </div>

      <div className="chart-placeholder"></div>

      <div className="dashboard-grid">

        <div className="mini-widget">
          <h4>Humedad</h4>
          <p>48%</p>
        </div>

        <div className="mini-widget">
          <h4>Alertas</h4>
          <p>2</p>
        </div>

        <div className="mini-widget">
          <h4>Dispositivos</h4>
          <p>18</p>
        </div>

        <div className="mini-widget">
          <h4>Calidad</h4>
          <p>Buena</p>
        </div>

      </div>

    </div>
  );
}