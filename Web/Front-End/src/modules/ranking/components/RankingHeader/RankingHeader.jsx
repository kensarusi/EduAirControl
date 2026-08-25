import { useTranslation } from "react-i18next";
import "./rankingHeader.css";

function RankingHeader() {

  const { t } = useTranslation();

  return (

    <header className="ranking-header">

      <div>

        <h1>
          {t("ranking.title")}
        </h1>

        <p>
          {t("ranking.subtitle")}
        </p>

      </div>

    </header>

  );

}

export default RankingHeader;