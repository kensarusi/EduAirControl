import { useTranslation } from "react-i18next";
import "./RankingFilters.css";

function RankingFilters({
  filters,
  setFilters,
  suggestions,
}) {

  const { t } = useTranslation();

  const update = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (

    <section className="ranking-filters">

      <div className="filter-group">

        <label>{t("filters.name")}</label>

        <input
          type="text"
          value={filters.name}
          placeholder={t("filters.searchEnvironment")}
          onChange={(e) =>
            update("name", e.target.value)
          }
        />

      </div>

      <div className="filter-group">

        <label>{t("filters.building")}</label>

        <select
          value={filters.building}
          onChange={(e) =>
            update("building", e.target.value)
          }
        >

          <option value="">
            {t("filters.all")}
          </option>

          {suggestions.buildings.map((building) => (

            <option
              key={building}
              value={building}
            >
              {t(building)}
            </option>

          ))}

        </select>

      </div>

      <div className="filter-group">

        <label>{t("ranking.status")}</label>

        <select
          value={filters.status}
          onChange={(e) =>
            update("status", e.target.value)
          }
        >

          <option value="">
            {t("filters.all")}
          </option>

          {suggestions.status.map((status) => (

            <option
              key={status}
              value={status}
            >
              {status}
            </option>

          ))}

        </select>

      </div>

    </section>

  );

}

export default RankingFilters;