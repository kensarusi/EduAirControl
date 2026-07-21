import {
  FaLeaf,
  FaExclamationTriangle,
  FaRadiation,
  FaChartLine,
} from "react-icons/fa";

import "../styles/rankingStats.css";

function RankingStats({ environments = [] }) {
  
  const normal = environments.filter(
    (environment) => environment.status === "Normal"
  ).length;

  const warning = environments.filter(
    (environment) => environment.status === "Advertencia"
  ).length;

  const danger = environments.filter(
    (environment) =>
      environment.status === "Crítico" ||
      environment.status === "Critico"
  ).length;

  const average = environments.length
    ? (
        environments.reduce(
          (total, environment) => total + environment.score,
          0
        ) / environments.length
      ).toFixed(0)
    : 0;

  const stats = [

    {
      icon: <FaLeaf />,
      title: "Normales",
      value: normal,
      color: "success",
    },

    {
      icon: <FaExclamationTriangle />,
      title: "Advertencia",
      value: warning,
      color: "warning",
    },

    {
      icon: <FaRadiation />,
      title: "Alertas",
      value: danger,
      color: "danger",
    },

    {
      icon: <FaChartLine />,
      title: "Promedio",
      value: average,
      color: "primary",
    },

  ];

  return (

    <section className="ranking-stats">

      {stats.map((item, index) => (

        <div
          key={index}
          className={`ranking-stat-card ${item.color}`}
        >

          <div className="ranking-stat-icon">

            {item.icon}

          </div>

          <div className="ranking-stat-content">

            <span>{item.title}</span>

            <h2>{item.value}</h2>

          </div>

        </div>

      ))}

    </section>

  );

}

export default RankingStats;