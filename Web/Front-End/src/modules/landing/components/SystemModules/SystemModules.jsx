import "./SystemModules.css";
import ModuleCard from "./ModuleCard";
import dashboardPreview from "../../../../shared/assets/dashboard-preview.png";
import { useTranslation } from "react-i18next";
import {
  BellRing,
  FileText,
  Users,
  Cpu,
} from "lucide-react";

function SystemModules() {
  const { t } = useTranslation();

  const modules = [
    {
      icon: BellRing,
      title: t("landing.modules.module1Title"),
      description: t("landing.modules.module1Desc"),
    },
    {
      icon: FileText,
      title: t("landing.modules.module2Title"),
      description: t("landing.modules.module2Desc"),
    },
    {
      icon: Users,
      title: t("landing.modules.module3Title"),
      description: t("landing.modules.module3Desc"),
    },
    {
      icon: Cpu,
      title: t("landing.modules.module4Title"),
      description: t("landing.modules.module4Desc"),
    },
  ];

  return (
    <section id="modules" className="modules">

      <span className="modules-badge">
        {t("landing.modules.badge")}
      </span>

      <h2 className="modules-title">
        {t("landing.modules.title")} <span>{t("landing.modules.titleHighlight")}</span>
      </h2>

      <p className="modules-description">
        {t("landing.modules.description")}
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
