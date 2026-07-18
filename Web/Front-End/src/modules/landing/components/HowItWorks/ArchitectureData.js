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
import { useTranslation } from "react-i18next";

function ArchitectureDiagram() {
  const { t } = useTranslation();

  return (
    <div className="dashboard-demo">

      <div className="dashboard-header">

        <div>
          <h3>EduAirControl Dashboard</h3>
          <p>{t("landing.howItWorks.diagramSubtitle")}</p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          {t("landing.howItWorks.diagramStatus")}
        </div>

      </div>

      <div className="metrics">

        <div className="metric-card">
          <Thermometer size={24}/>
          <h2>24°C</h2>
          <small>{t("landing.howItWorks.metricTemp")}</small>
          <span className="metric-status">{t("landing.howItWorks.statusNormal")}</span>
        </div>

        <div className="metric-card">
          <Droplets size={24}/>
          <h2>65%</h2>
          <small>{t("landing.howItWorks.metricHumidity")}</small>
          <span className="metric-status">{t("landing.howItWorks.statusOptimal")}</span>
        </div>

        <div className="metric-card">
          <Wind size={24}/>
          <h2>520 ppm</h2>
          <small>{t("landing.howItWorks.metricCO2")}</small>
          <span className="metric-status">{t("landing.howItWorks.statusStable")}</span>
        </div>

      </div>

      <div className="chart">

        <svg viewBox="0 0 600 180">

            <polyline
                fill="none"
                stroke="#39F4D8"
                strokeWidth="5"
                points="
                0,140
                80,120
                160,130
                240,90
                320,100
                400,70
                480,85
                560,40
                "
            />

        </svg>

      </div>

      <div className="system-flow">

        <div className="flow-step">
          <Cpu size={18}/>
          <span>{t("landing.howItWorks.flowSensors")}</span>
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
          <span>{t("landing.howItWorks.flowAlerts")}</span>
        </div>

      </div>

      <div className="status-card">

        <BellRing size={20}/>

        <div>

          <h4>{t("landing.howItWorks.systemOk")}</h4>

          <p>{t("landing.howItWorks.systemOkDesc")}</p>

        </div>

      </div>

    </div>
  );
}

export default ArchitectureDiagram;
