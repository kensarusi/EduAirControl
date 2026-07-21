import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WiThermometer, WiHumidity } from "react-icons/wi";
import { MdCo2 } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";

import EnvironmentModal from "../EnvironmentModal/EnvironmentModal";
import ScoreCircle from "../ScoreCircle/ScoreCircle";
import MetricCard from "../MetricCard/MetricCard";

import calculateEnvironmentScore from "../../utils/calculateEnvironmentScore";
import getMetricStatus from "../../utils/getMetricStatus";
import { getEnvironmentStatus } from "../../utils/getEnvironmentStatus";

import "./EnvironmentSummaryCard.css";

function EnvironmentSummaryCard({
  environment,
  onToggleFavorite,
}) {

  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const isFavorite = environment.isFavorite ?? false;

    const handleFavorite = (e) => {
        e.stopPropagation();

        onToggleFavorite?.(
            environment.id,
            !isFavorite
        );
    };

  const status = getEnvironmentStatus(
    environment.statusKey,
    t
  );

  const score = calculateEnvironmentScore(
    environment
  );

  return (

    <>

      <div
        className="summary-card"
        onClick={() => setShowModal(true)}
      >

        <div
          className="summary-card-status-bar"
          style={{
            backgroundColor: status.color,
          }}
        />

        <div className="summary-card-header">

          <div className="summary-card-header-left">

            <h3>

              {
                environment.nameKey
                  ? t(environment.nameKey)
                  : environment.name
              }

            </h3>

            <span
              className="summary-status"
              style={{
                color: status.color,
                backgroundColor: status.bg,
              }}
            >

              {status.text}

            </span>

          </div>

          <button
            className={`btn-favorite ${
              isFavorite ? "active" : ""
            }`}
            onClick={handleFavorite}
          >

            {
              isFavorite
                ? <FaHeart />
                : <FaRegHeart />
            }

          </button>

        </div>

        <div className="summary-score">

          <ScoreCircle score={score} />

          <div className="summary-score-info">

            <h4>

              {t("allEnvironments.qualityTitle")}

            </h4>

            <p>

              {t("allEnvironments.qualityDesc")}

            </p>

          </div>

        </div>

        <div className="summary-card-grid">

          <MetricCard
            icon={<MdCo2 className="summary-icon co2" />}
            label={t("allEnvironments.co2")}
            value={`${environment.co2} ppm`}
            status={getMetricStatus(
              "co2",
              environment.co2,
              t
            )}
          />

          <MetricCard
            icon={<HiSpeakerWave className="summary-icon noise" />}
            label={t("dashboard.noise")}
            value={`${environment.noise} dB`}
            status={getMetricStatus(
              "noise",
              environment.noise,
              t
            )}
          />

          <MetricCard
            icon={<WiThermometer className="summary-icon temp" />}
            label={t("dashboard.temperature")}
            value={`${environment.temp} °C`}
            status={getMetricStatus(
              "temp",
              environment.temp,
              t
            )}
          />

          <MetricCard
            icon={<WiHumidity className="summary-icon humidity" />}
            label={t("dashboard.humidity")}
            value={`${environment.humidity}%`}
            status={getMetricStatus(
              "humidity",
              environment.humidity,
              t
            )}
          />

        </div>

      </div>

      <EnvironmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        environment={{
            ...environment,
            score,
            isFavorite
        }}
        isFavorite={isFavorite}
        onToggleFavorite={() => {
          onToggleFavorite?.(environment.id, !isFavorite);
        }}
    />

    </>

  );

}

export default EnvironmentSummaryCard;