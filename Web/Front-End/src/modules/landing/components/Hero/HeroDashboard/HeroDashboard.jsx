import "./HeroDashboard.css";
import {
  Activity,
  Thermometer,
  Droplets,
  Bell,
  Database,
  Leaf,
} from "lucide-react";

export default function HeroDashboard() {
  return (
    <div className="dashboard-mockup">

      <div className="dashboard-header">

      <div>
          <h3>EduAirControl</h3>
          <span>Última actualización hace 3 s</span>
      </div>

      <div className="status">
          <span className="status-dot"></span>
          Online
      </div>

    </div>

      <div className="dashboard-metrics">

       <div className="metric-card">
        <div className="metric-header">
            <Activity size={16}/>
            <span>IAQ</span>
        </div>

        <p>28</p>

        <div className="metric-footer">
            <small>Excelente</small>

            <span className="metric-trend positive">
                ↑ 3%
            </span>
        </div>
    </div>

        <div className="metric-card">
          <div className="metric-header">
            <Leaf size={16} />
          <span>CO₂</span>
          </div>
          
          <p>612</p>

          <div className="metric-footer">
            <small>ppm</small>

           <span className="metric-trend positive">
                ↑ 12%
            </span>
        </div>
        </div>
    

        <div className="metric-card">
          <div className="metric-header">
            <Thermometer size={16} />
            <span>Temp</span>
          </div>

          <p>23.6°</p>
          <small>Óptima</small>
        </div>

      </div>

        <div className="chart-placeholder">

            <svg
                viewBox="0 0 800 220"
                className="chart-svg"
                preserveAspectRatio="none"
            >

                <defs>

                    <linearGradient id="lineGradient" x1="0" x2="1">

                        <stop offset="0%" stopColor="#27F5D2"/>

                        <stop offset="100%" stopColor="#66FFD6"/>

                    </linearGradient>

                </defs>

                <path
                    className="chart-line"
                    d="
                    M0,140
                    C80,80 140,170 220,120
                    S360,40 430,90
                    S570,180 650,80
                    S760,110 800,50
                    "
                />

                <circle cx="90" cy="95" r="4" fill="#27F5D2"/>
                <circle cx="250" cy="125" r="4" fill="#27F5D2"/>
                <circle cx="430" cy="90" r="4" fill="#27F5D2"/>
                <circle cx="650" cy="80" r="4" fill="#27F5D2"/>
                <circle cx="790" cy="50" r="4" fill="#27F5D2"/>

            </svg>
        </div>

      <div className="dashboard-grid">

        <div className="mini-widget">
          <div className="widget-title">
            <Droplets size={16} />
            <span>Humedad</span>
          </div>

          <p>48%</p>
        </div>

        <div className="mini-widget">
          <div className="widget-title">
            <Bell size={16} />
            <span>Alertas</span>
          </div>

          <p>2</p>
        </div>

        <div className="mini-widget">
          <div className="widget-title">
              <Database size={16}/>
              <h4>Dispositivos</h4>
          </div>

          <p>18</p>
      </div>

        <div className="mini-widget">
          <div className="widget-title">
            <Activity size={16} />
            <span>Calidad</span>
          </div>
          
          <p>Buena</p>
        </div>

      </div>

    </div>
  );
}