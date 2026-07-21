import { useTranslation } from "react-i18next";
import Navbar from "../../dashboard/components/Navbar/Navbar";
import RankingCard from "../components/RankingCard";
import RankingFilters from "../components/RankingFilters";
import { useRankingVM } from "../../../viewmodels/useRankingVM";

import "../../ranking/styles/RankingScreen.css";

function RankingScreen() {

  const { t } = useTranslation();

  const {
    ranking,
    filters,
    setFilters,
    statistics
  } = useRankingVM();

  return (
    <div className="ranking-page">

      <Navbar />

      <div className="app-page-container">

        <header className="ranking-header">

          <div>

            <h1>{t("ranking.title")}</h1>

            <p>{t("ranking.subtitle")}</p>

          </div>

          <div className="ranking-summary">

            <div className="summary-card">
              <span>{statistics.total}</span>
              <small>{t("ranking.totalEnvironments")}</small>
            </div>

            <div className="summary-card">
              <span>{statistics.average}</span>
              <small>{t("ranking.averageScore")}</small>
            </div>

          </div>

        </header>

        <RankingFilters
          filters={filters}
          setFilters={setFilters}
        />

        <div className="ranking-grid">

          {ranking.map(environment => (

            <RankingCard
              key={environment.id}
              environment={environment}
            />

          ))}

        </div>

      </div>

    </div>
  );

}

export default RankingScreen;