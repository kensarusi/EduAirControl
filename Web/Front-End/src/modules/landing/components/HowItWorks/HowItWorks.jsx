import "./HowItWorks.css";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { useTranslation } from "react-i18next";

function HowItWorks() {
  const { t } = useTranslation();

  const architectureData = [
    {
      id: "01",
      title: t("landing.howItWorks.step1Title"),
      description: t("landing.howItWorks.step1Desc"),
    },
    {
      id: "02",
      title: t("landing.howItWorks.step2Title"),
      description: t("landing.howItWorks.step2Desc"),
    },
    {
      id: "03",
      title: t("landing.howItWorks.step3Title"),
      description: t("landing.howItWorks.step3Desc"),
    },
    {
      id: "04",
      title: t("landing.howItWorks.step4Title"),
      description: t("landing.howItWorks.step4Desc"),
    },
    {
      id: "05",
      title: t("landing.howItWorks.step5Title"),
      description: t("landing.howItWorks.step5Desc"),
    },
    {
      id: "06",
      title: t("landing.howItWorks.step6Title"),
      description: t("landing.howItWorks.step6Desc"),
    },
  ];

  return (
    <section id="how" className="how-it-works">

      <div className="how-header">

        <span className="how-badge">
          {t("landing.howItWorks.badge")}
        </span>

        <h2 className="how-title">
          {t("landing.howItWorks.title")} <span>{t("landing.howItWorks.titleHighlight")}</span>?
        </h2>

        <p className="how-description">
          {t("landing.howItWorks.description")}
        </p>

      </div>

      <div className="architecture-container">

        {/* Diagrama */}
        <ArchitectureDiagram />

        {/* Explicación */}
        <div className="architecture-info">

          {architectureData.map((item) => (

            <div className="info-card" key={item.id}>

              <div className="info-number">
                {item.id}
              </div>

              <div className="info-content">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;
