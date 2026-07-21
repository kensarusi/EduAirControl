import { useTranslation } from "react-i18next";
import Navbar from "../../dashboard/components/Navbar/Navbar";
import EnvironmentFilters from "../components/EnvironmentFilters/EnvironmentFilters";
import EnvironmentSummaryCard from "../components/EnvironmentSummaryCard/EnvironmentSummaryCard";
import { useAllEnvironmentsVM } from "../../../viewmodels/useAllEnvironmentsVM";
import "./AllEnvironments.css";

function AllEnvironmentsScreen() {

  const { t } = useTranslation();

  const {
  filtered,
  filters,
  setFilters,
  counts,
  suggestions,
  toggleFavorite
} = useAllEnvironmentsVM();

console.log(filtered);

  return (
    <div className="all-env-page">

      <Navbar />

      <div className="app-page-container">

        <header className="all-env-header">

          <div>

            <h1>
              {t("allEnvironments.title")}
            </h1>

            <p>
              {t("allEnvironments.subtitle")}
            </p>

          </div>

          <div className="all-env-stats">

            <div className="stat-card">

              <span>{counts.total}</span>

              <small>{t("filters.all")}</small>

            </div>

            <div className="stat-card normal">

              <span>{counts.normal}</span>

              <small>{t("dashboard.statusNormal")}</small>

            </div>

            <div className="stat-card warning">

              <span>{counts.warning}</span>

              <small>{t("dashboard.statusWarning")}</small>

            </div>

            <div className="stat-card danger">

              <span>{counts.alert}</span>

              <small>{t("dashboard.statusAlert")}</small>

            </div>

            <div className="stat-card favorite">

              <span>{counts.favorites}</span>

              <small>{t("favorites.title")}</small>

            </div>

          </div>

        </header>

        <EnvironmentFilters
          filters={filters}
          setFilters={setFilters}
          suggestions={suggestions}
        />

        {filtered.length === 0 ? (

          <div className="empty-state">

            <h2>
              {t("allEnvironments.noResults")}
            </h2>

          </div>

        ) : (

          <div className="all-env-grid">

            {filtered.map((environment) => (

              <EnvironmentSummaryCard
                key={environment.id}
                environment={environment}
                onToggleFavorite={toggleFavorite}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AllEnvironmentsScreen;