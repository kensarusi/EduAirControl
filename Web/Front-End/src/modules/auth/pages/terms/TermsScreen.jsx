import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineDocumentText, HiCheckCircle } from "react-icons/hi2";
import "./Terms.css";
import background from "../../../../shared/assets/fondo-terms.png"

function TermsScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const terms = [
    t("terms.item1"),
    t("terms.item2"),
    t("terms.item3"),
    t("terms.item4"),
    t("terms.item5"),
    t("terms.item6"),
    t("terms.item7"),
    t("terms.item8"),
  ];

  return (
      <div
        className="terms-page"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >

      <div className="terms-container">

        <div className="terms-header">

          <div className="terms-icon">
            <HiOutlineDocumentText />
          </div>

          <h1>{t("terms.title")}</h1>

          <p className="terms-subtitle">
            {t("terms.subtitle")}
          </p>

        </div>

        <div className="terms-content">

          <p className="terms-intro">
            {t("terms.intro")}
          </p>

          <div className="terms-list">

            {terms.map((item, index) => (
              <div className="term-item" key={index}>
                <HiCheckCircle />
                <span>{item}</span>
              </div>
            ))}

          </div>

          <p>{t("terms.footer1")}</p>

          <p>{t("terms.footer2")}</p>

        </div>

        <button
          className="btn-accept"
          onClick={() => navigate("/signup")}
        >
          {t("terms.acceptBtn")}
        </button>

      </div>
    </div>
  );
}

export default TermsScreen;