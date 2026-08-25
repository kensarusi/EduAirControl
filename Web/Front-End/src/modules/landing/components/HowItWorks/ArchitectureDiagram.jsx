import "./HowItWorks.css";
import {
  Cpu,
  Wifi,
  Server,
  Database,
  LayoutDashboard,
  BellRing,
  Thermometer,
  Droplets,
  Wind,
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

<div className="system-flow">

  <div className="flow-step">
    <Cpu size={18}/>
    <span>Sensores</span>
  </div>

  <div className="flow-arrow">→</div>

  <div className="flow-step">
    <Wifi size={18}/>
    <span>API</span>
  </div>

  <div className="flow-arrow">→</div>

  <div className="flow-step">
    <Server size={18}/>
    <span>Backend</span>
  </div>

  <div className="flow-arrow">→</div>

  <div className="flow-step">
    <Database size={18}/>
    <span>PostgreSQL</span>
  </div>

  <div className="flow-arrow">→</div>

  <div className="flow-step">
    <LayoutDashboard size={18}/>
    <span>Dashboard</span>
  </div>

  <div className="flow-arrow">→</div>

  <div className="flow-step alert">
    <BellRing size={18}/>
    <span>Alertas</span>
  </div>

</div>

  <div className="status-card">

    <BellRing size={20}/>

    <div>

        <h4>Sistema funcionando correctamente</h4>

        <p>
            Todos los sensores están reportando datos.
            No existen riesgos ambientales detectados.
        </p>

    </div>

</div>

</div>
  );
}

export default ArchitectureDiagram;