import { FaTimes, FaHeart, FaRegHeart, FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdCo2 } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

import ScoreCircle from "../ScoreCircle/ScoreCircle";
import SensorInfo from "../SensorInfo/SensorInfo";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import EnvironmentExplanation from "../EnvironmentExplanation/EnvironmentExplanation";
import Tooltip from "../Tooltip/Tooltip";

import { getRecommendations } from "../../utils/getRecommendations";

import "./EnvironmentModal.css";

function EnvironmentModal({
  isOpen,
  onClose,
  environment,
  isFavorite,
  onToggleFavorite
}) {

  const { t } = useTranslation();

  if (!isOpen || !environment) return null;

  const statusText = environment.statusKey
    ? t(environment.statusKey)
    : environment.status;

  const statusClass =
    environment.statusKey === "dashboard.statusNormal"
      ? "normal"
      : environment.statusKey === "dashboard.statusWarning"
      ? "warning"
      : "danger";

  return (

    <div className="environment-modal-overlay">

      <div className="environment-modal">

        <Tooltip
          text={t("tooltips.close", "Cierra esta ventana y vuelve al listado de ambientes.")}
          position="bottom"
        >
          <button
            className="modal-close"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </Tooltip>

        <header className="modal-header">

          <h2>
            {environment.nameKey
              ? t(environment.nameKey)
              : environment.name}
          </h2>

          <Tooltip
            text={t(
              "tooltips.status",
              "Indica el estado general del ambiente: Normal, Advertencia o Alerta, calculado a partir de los sensores."
            )}
          >
            <span className={`modal-status ${statusClass}`}>
              {statusText}
            </span>
          </Tooltip>

        </header>

        <div className="environment-score">

          <Tooltip
            text={t(
              "tooltips.score",
              "Puntaje de 0 a 100 que resume la calidad del ambiente combinando temperatura, humedad, CO₂ y ruido. Mientras más alto, mejor."
            )}
          >
            <ScoreCircle
              score={environment.score}
              size={130}
            />
          </Tooltip>

          <div className="environment-score-info">

            <h3>{t("allEnvironments.qualityTitle")}</h3>

            <p>{t("allEnvironments.qualityDesc")}</p>

          </div>

        </div>

        <div className="modal-sensors">

          <Tooltip
            block
            text={t(
              "tooltips.temperature",
              "Temperatura actual del ambiente. Te ayuda a saber si conviene encender aire acondicionado o calefacción."
            )}
          >
            <SensorInfo
              icon={<FaTemperatureHigh />}
              title={t("dashboard.temperature")}
              value={`${environment.temp} °C`}
              description={t("allEnvironments.tempDescription")}
            />
          </Tooltip>

          <Tooltip
            block
            text={t(
              "tooltips.humidity",
              "Nivel de humedad en el aire. Una humedad fuera de rango puede afectar el confort y la salud respiratoria."
            )}
          >
            <SensorInfo
              icon={<WiHumidity />}
              title={t("dashboard.humidity")}
              value={`${environment.humidity}%`}
              description={t("allEnvironments.humidityDescription")}
            />
          </Tooltip>

          <Tooltip
            block
            text={t(
              "tooltips.co2",
              "Concentración de CO₂ en partes por millón (ppm). Valores altos indican poca ventilación; considera abrir ventanas."
            )}
          >
            <SensorInfo
              icon={<MdCo2 />}
              title={t("allEnvironments.co2")}
              value={`${environment.co2} ppm`}
              description={t("allEnvironments.co2Description")}
            />
          </Tooltip>

          <Tooltip
            block
            text={t(
              "tooltips.noise",
              "Nivel de ruido ambiental en decibeles (dB). Ayuda a detectar exceso de ruido que puede afectar la concentración."
            )}
          >
            <SensorInfo
              icon={<HiSpeakerWave />}
              title={t("dashboard.noise")}
              value={`${environment.noise} dB`}
              description={t("allEnvironments.noiseDescription")}
            />
          </Tooltip>

        </div>

        <Tooltip
          block
          text={t(
            "tooltips.recommendations",
            "Sugerencias automáticas generadas según las condiciones actuales, para ayudarte a mejorar este ambiente."
          )}
        >
          <RecommendationBox
            recommendations={getRecommendations(environment, t)}
          />
        </Tooltip>

        <EnvironmentExplanation />

        <div className="modal-actions">

          <Tooltip
            text={t(
              "tooltips.favorite",
              isFavorite
                ? "Quita este ambiente de tus favoritos."
                : "Marca este ambiente como favorito para encontrarlo más rápido en tu panel."
            )}
            block
          >
            <button
              className={`modal-favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={onToggleFavorite}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
              {isFavorite ? t("allEnvironments.removeFavorite") : t("allEnvironments.favorite")}
            </button>
          </Tooltip>

          <Tooltip
            text={t("tooltips.closeBtn", "Cierra esta ventana.")}
            block
          >
            <button
              className="close-btn"
              onClick={onClose}
            >
              {t("common.close")}
            </button>
          </Tooltip>

        </div>

      </div>

    </div>

  );

}

export default EnvironmentModal;