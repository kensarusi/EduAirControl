import { useTranslation } from "react-i18next";
import "./rankingStats.css";

function RankingStats({ statistics }) {

  const { t } = useTranslation();

  return (

    <section className="ranking-stats">

      <div className="ranking-stat-card total">

        <span>{statistics.total}</span>

        <small>{t("ranking.totalEnvironments")}</small>

      </div>

      <div className="ranking-stat-card average">

        <span>{statistics.average}</span>

        <small>{t("ranking.averageScore")}</small>

      </div>

      <div className="ranking-stat-card success">

        <span>{statistics.best?.score ?? "--"}</span>

        <small>{t("ranking.bestEnvironment")}</small>

      </div>

      <div className="ranking-stat-card danger">

        <span>{statistics.worst?.score ?? "--"}</span>

        <small>{t("ranking.worstEnvironment")}</small>

      </div>

    </section>

  );

}

export default RankingStats;