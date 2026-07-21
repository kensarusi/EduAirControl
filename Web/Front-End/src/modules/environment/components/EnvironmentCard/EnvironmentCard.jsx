import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ScoreCircle from "../ScoreCircle/ScoreCircle";
import MetricCard from "../MetricCard/MetricCard";
import EnvironmentModal from "../EnvironmentModal/EnvironmentModal";
import { calculateEnvironmentScore } from "../../utils/calculateEnvironmentScore";
import { getEnvironmentStatus } from "../../utils/getEnvironmentStatus";
import "./EnvironmentCard.css";

function EnvironmentCard({ environment, onToggleFavorite }) {
  const { t } = useTranslation();

  const [favorite, setFavorite] = useState(environment.isFavorite ?? false);
  const [open, setOpen] = useState(false);

  const score = calculateEnvironmentScore(environment);
  const status = getEnvironmentStatus(score);

  const handleFavorite = (e) => {
    e.stopPropagation();
    const value = !favorite;
    setFavorite(value);
    onToggleFavorite?.(environment.id, value);
  };

  return (
    <>
      <article className="environment-card" onClick={() => setOpen(true)}>
        <div className={`environment-status ${status.class}`} />

        <div className="environment-card-header">
          <div>
            <h3>{environment.name}</h3>
            <span className={`status-badge ${status.class}`}>
              {t(status.label)}
            </span>
          </div>

          <button className="favorite-btn" onClick={handleFavorite}>
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <div className="environment-score">
          <ScoreCircle score={score} />
          <div>
            <h4>{t("allEnvironments.qualityTitle")}</h4>
            <p>{t("allEnvironments.qualityDesc")}</p>
          </div>
        </div>

        <div className="environment-metrics">
          <MetricCard type="temperature" value={environment.temp} />
          <MetricCard type="humidity" value={environment.humidity} />
          <MetricCard type="co2" value={environment.co2} />
          <MetricCard type="noise" value={environment.noise} />
        </div>
      </article>

      <EnvironmentModal
        open={open}
        onClose={() => setOpen(false)}
        environment={{
          ...environment,
          score,
          favorite
        }}
      />
    </>
  );
}

export default EnvironmentCard;