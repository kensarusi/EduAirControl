import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaVolumeUp,
  FaArrowRight
} from "react-icons/fa";

import "../styles/rankingCard.css";

function RankingCard({ environment }) {

    return (

        <article className="ranking-card">

            <div className="ranking-card-header">

                <div>

                    <span className="ranking-position">

                        #{environment.position}

                    </span>

                    <h3>{environment.name}</h3>

                    <small>{environment.location}</small>

                </div>

                <div className="ranking-score">

                    {environment.score}

                </div>

            </div>

            <div className="ranking-progress">

                <div
                    className="ranking-progress-fill"
                    style={{ width: `${environment.score}%` }}
                />

            </div>

            <div className="ranking-status">

                <span className={`badge ${environment.status.toLowerCase()}`}>

                    {environment.status}

                </span>

            </div>

            <div className="ranking-values">

                <span>

                    <FaTemperatureHigh />

                    {environment.temperature}

                </span>

                <span>

                    <FaTint />

                    {environment.humidity}

                </span>

                <span>

                    <FaWind />

                    {environment.co2}

                </span>

                <span>

                    <FaVolumeUp />

                    {environment.noise}

                </span>

            </div>

            <button className="ranking-button">

                Ver ambiente

                <FaArrowRight />

            </button>

        </article>

    );

}

export default RankingCard;