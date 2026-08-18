import Navbar from "../../dashboard/components/Navbar/Navbar";

import RankingHeader from "../components/RankingHeader/RankingHeader";
import RankingStats from "../components/RankingStats/RankingStats";
import RankingFilters from "../components/RankingFilters/RankingFilters";
import RankingPodium from "../components/RankingPodium/RankingPodium";
import RankingCard from "../components/RankingCard/RankingCard";

import useRankingVM from "../../../viewmodels/useRankingVM";

import "./rankingScreen.css";

function RankingScreen() {

  const {
    ranking,
    filters,
    setFilters,
    suggestions,
    statistics
  } = useRankingVM();

  return (

    <div className="ranking-screen">

      <Navbar />

      <div className="app-page-container">

        <div className="ranking-content">

        <RankingHeader />

        <RankingStats
          statistics={statistics}
        />

        <RankingFilters
          filters={filters}
          setFilters={setFilters}
          suggestions={suggestions}
        />

        <RankingPodium
          ranking={ranking}
        />

        {ranking.length === 0 ? (

          <section className="ranking-empty">

            <h2>No hay ambientes</h2>

            <p>
              No se encontraron ambientes con los filtros seleccionados.
            </p>

          </section>

        ) : (

          <section className="ranking-list">

            {ranking.map((environment) => (

              <RankingCard
                key={environment.id}
                environment={environment}
              />

            ))}

          </section>

        )}

      </div>

      </div>

    </div>

  );

}

export default RankingScreen;