import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaVolumeUp,
  FaArrowRight
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

import getRankingStatus from "../../utils/getRankingStatus";

import "./RankingCard.css";

function RankingCard({ environment }) {

  const { t } = useTranslation();

  const status = getRankingStatus(environment.score);

  return (
    <article className="ranking-card">

      <div className="ranking-card-header">

        <div>

          <span className="ranking-position">
            #{environment.position}
          </span>

          <h3>{environment.name}</h3>

          <small>{t(environment.locationKey)}</small>

        </div>

        <div className="ranking-score">
          {environment.score}
        </div>

      </div>

      <div className="ranking-progress">

        <div
          className="ranking-progress-fill"
          style={{
            width: `${environment.score}%`,
            background: status.color
          }}
        />

      </div>

      <div className="ranking-status">

        <span
          className="badge"
          style={{
            background: status.background,
            color: status.color
          }}
        >
          {t(status.label)}
        </span>

      </div>

      <div className="ranking-values">

        <span>
          <FaTemperatureHigh />
          {environment.temperature}°C
        </span>

        <span>
          <FaTint />
          {environment.humidity}%
        </span>

        <span>
          <FaWind />
          {environment.co2} ppm
        </span>

        <span>
          <FaVolumeUp />
          {environment.noise} dB
        </span>

      </div>

      <button className="ranking-button">

        {t("ranking.viewEnvironment")}

        <FaArrowRight />

      </button>

    </article>
  );

}

export default RankingCard;