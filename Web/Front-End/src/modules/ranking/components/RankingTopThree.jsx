import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaVolumeUp,
} from "react-icons/fa";

import "../styles/rankingTopThree.css";

function RankingTopThree({

    environments,
    order

}) {

  const medals = ["🥇", "🥈", "🥉"];

  const colors = ["gold", "silver", "bronze"];

 const ordered = [...environments].sort((a, b) => {

    if (order === "asc") {

        return a.score - b.score;

    }

    return b.score - a.score;

});

const topThree = ordered.slice(0, 3);

  if (topThree.length === 0) {

    return null;

  }

  return (

    <section className="ranking-top-three">

      {

        topThree.map((room, index) => (

          <div
            key={room.id}
            className={`ranking-podium-card ${colors[index]} podium-${index + 1}`}          >

            <div className="ranking-medal">

              {medals[index]}

            </div>

            <h3>{room.name}</h3>

            <span className="ranking-score">

              {room.score}

            </span>

            <p>Índice de Salud Ambiental</p>

            <div className="ranking-divider" />

            <div className="ranking-values">

              <span>

                <FaTemperatureHigh />

                {room.temperature}

              </span>

              <span>

                <FaTint />

                {room.humidity}

              </span>

              <span>

                <FaWind />

                {room.co2}

              </span>

              <span>

                <FaVolumeUp />

                {room.noise}

              </span>

            </div>

            <button>

              Ver ambiente

            </button>

          </div>

        ))

      }

    </section>

  );

}

export default RankingTopThree;