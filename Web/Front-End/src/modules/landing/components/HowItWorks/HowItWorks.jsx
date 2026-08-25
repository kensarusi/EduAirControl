import "./HowItWorks.css";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

function HowItWorks() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

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

          <div className="info-carousel" aria-live="polite">
            <div
              className="info-track"
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
              {architectureData.map((item) => (
                <article className="info-card" key={item.id}>
                  <div className="info-number">
                    {item.id}
                  </div>

                  <div className="info-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button
              className="carousel-arrow"
              type="button"
              onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
              disabled={activeStep === 0}
              aria-label={t("landing.howItWorks.previous", "Paso anterior")}
            >
              <ArrowLeft size={18} />
            </button>

            <div className="carousel-dots">
              {architectureData.map((item, index) => (
                <button
                  className={`carousel-dot ${index === activeStep ? "is-active" : ""}`}
                  type="button"
                  aria-label={`${t("landing.howItWorks.step", "Paso")} ${item.id}`}
                  aria-pressed={index === activeStep}
                  key={item.id}
                  onClick={() => setActiveStep(index)}
                >
                  {item.id}
                </button>
              ))}
            </div>

            <button
              className="carousel-arrow"
              type="button"
              onClick={() => setActiveStep((step) => Math.min(step + 1, architectureData.length - 1))}
              disabled={activeStep === architectureData.length - 1}
              aria-label={t("landing.howItWorks.next", "Siguiente paso")}
            >
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;
