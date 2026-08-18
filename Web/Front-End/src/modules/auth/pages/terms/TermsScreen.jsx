import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineDocumentText, HiCheckCircle } from "react-icons/hi2";
import "./Terms.css";
import background from "../../../../shared/assets/fondo-terms.png";

function TermsScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const localizedSections = t("terms.sections", { returnObjects: true });
  const sections = Array.isArray(localizedSections)
    ? localizedSections
    : t("terms.sections", { returnObjects: true, lng: "es" });

  return (
    <main className="terms-page" style={{ backgroundImage: `url(${background})` }}>
      <article className="terms-container">
        <header className="terms-header">
          <div className="terms-icon"><HiOutlineDocumentText /></div>
          <h1>{t("terms.title")}</h1>
          <p className="terms-brand">{t("terms.brand")}</p>
          <p className="terms-subtitle">{t("terms.subtitle")}</p>
        </header>

        <div className="terms-content">
          {sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && <ul className="legal-list">{section.list.map((item) => <li key={item}><HiCheckCircle /><span>{item}</span></li>)}</ul>}
              {section.note && <p className="legal-note">{section.note}</p>}
            </section>
          ))}
          <footer className="terms-metadata">
            <p><strong>{t("terms.metadata.updated")}:</strong> {t("terms.metadata.updatedValue")}</p>
            <p><strong>{t("terms.metadata.responsible")}:</strong> {t("terms.metadata.responsibleValue")}</p>
            <p><strong>{t("terms.metadata.email")}:</strong> {t("terms.metadata.emailValue")}</p>
          </footer>
        </div>

        <button className="btn-accept" onClick={() => navigate("/signup")}>{t("terms.acceptBtn")}</button>
      </article>
    </main>
  );
}

export default TermsScreen;
