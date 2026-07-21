import { useTranslation } from "react-i18next";
import "./RankingPodium.css";

function RankingPodium({ ranking }) {

  const { t } = useTranslation();

  const topThree = ranking.slice(0, 3);

  if (topThree.length === 0) return null;

  return (

    <section className="ranking-podium">

      {topThree.map((environment, index) => {

        const medals = ["🥇", "🥈", "🥉"];

        return (

          <article
            key={environment.id}
            className={`podium-card place-${index + 1}`}
          >

            <span className="podium-medal">
              {medals[index]}
            </span>

            <h3>
              {environment.name}
            </h3>

            <p>
              {t(environment.locationKey)}
            </p>

            <div className="podium-score">

              {environment.score}

            </div>

            <span className="podium-label">

              {t("ranking.environmentScore")}

            </span>

          </article>

        );

      })}

    </section>

  );

}

export default RankingPodium;