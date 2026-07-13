import "./SystemModules.css";
import ModuleCard from "./ModuleCard";
import { modules } from "./modulesData";
import dashboardPreview from "../../../../shared/assets/dashboard-preview.png";

function SystemModules() {
  return (
    <section id="modules" className="modules">

      <span className="modules-badge">
        Plataforma completa
      </span>

      <h2 className="modules-title">
        Módulos del <span>Sistema</span>
      </h2>

      <p className="modules-description">
        EduAirControl integra todas las herramientas necesarias para
        monitorear, analizar y gestionar la calidad del aire en
        instituciones educativas desde un único lugar.
      </p>

      <div className="modules-showcase">

        <div className="dashboard-preview">
          <img
            src={dashboardPreview}
            alt="Dashboard EduAirControl"
            className="dashboard-image"
          />
        </div>

        <div className="modules-grid">
          {modules.map((module) => (
            <ModuleCard
              key={module.title}
              {...module}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

export default SystemModules;