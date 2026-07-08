import "./HowItWorks.css";
import {
  Thermometer,
  Droplets,
  Wind,
  BellRing,
  Activity,
} from "lucide-react";

function ArchitectureDiagram() {
  return (
    <div className="dashboard-demo">

  <div className="dashboard-header">

    <div>
      <h3>EduAirControl Dashboard</h3>
      <p>Monitoreo ambiental en tiempo real</p>
    </div>

    <div className="status">
      <span className="status-dot"></span>
      Sistema Activo
    </div>

  </div>

  <div className="metrics">

    <div className="metric-card">
      <Thermometer size={24}/>
      <h2>24°C</h2>
      <small>Temperatura</small>
      <span className="metric-status">Normal</span>
    </div>

    <div className="metric-card">
      <Droplets size={24}/>
      <h2>65%</h2>
      <small>Humedad</small>
      <span className="metric-status">Óptima</span>
    </div>

    <div className="metric-card">
      <Wind size={24}/>
      <h2>520 ppm</h2>
      <small>CO₂</small>
      <span className="metric-status">Estable</span>
    </div>

  </div>

  <div className="chart">

    <div className="chart-title">
      Calidad del aire (última hora)
    </div>

    <div className="chart-area">

      <div className="bar h1"></div>
      <div className="bar h2"></div>
      <div className="bar h3"></div>
      <div className="bar h4"></div>
      <div className="bar h5"></div>
      <div className="bar h6"></div>
      <div className="bar h7"></div>
      <div className="bar h8"></div>

    </div>

  </div>

  <div className="flow">

    <div className="flow-item">📡 Sensores</div>

    <div className="flow-arrow">↓</div>

    <div className="flow-item">🌐 API REST</div>

    <div className="flow-arrow">↓</div>

    <div className="flow-item">⚙ Backend</div>

    <div className="flow-arrow">↓</div>

    <div className="flow-item">🗄 PostgreSQL</div>

    <div className="flow-arrow">↓</div>

    <div className="flow-item">📊 Dashboard</div>

    <div className="flow-arrow">↓</div>

    <div className="flow-item">🔔 Alertas</div>

  </div>

  <div className="alert-banner">

    <BellRing size={20}/>

    <div>

      <strong>Calidad del aire óptima</strong>

      <p>No se detectan riesgos ambientales.</p>

    </div>

  </div>

</div>
  );
}

export default ArchitectureDiagram;