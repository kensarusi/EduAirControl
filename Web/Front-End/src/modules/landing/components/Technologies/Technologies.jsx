import "./Technologies.css";
import TechnologyCard from "./TechnologyCard";
import { useTranslation } from "react-i18next";
import {
  FaReact,
  FaJava,
  FaDocker,
  FaGithub,
  FaGitAlt,
  FaCss3Alt,
  FaDatabase,
  FaKey
} from "react-icons/fa";
import {
  SiVite,
  SiJavascript,
  SiSpringboot,
  SiPostgresql,
  SiHibernate,
  SiFigma
} from "react-icons/si";

function Technologies() {
  const { t } = useTranslation();

  const technologies = [
    {
      title: t("landing.technologies.tech1Title"),
      description: t("landing.technologies.tech1Desc"),
      color: "#38F4D8",
      icons: [
        { icon: FaReact, name: "React" },
        { icon: SiVite, name: "Vite" },
        { icon: SiJavascript, name: "JavaScript" },
        { icon: FaCss3Alt, name: "CSS3" }
      ]
    },
    {
      title: t("landing.technologies.tech2Title"),
      description: t("landing.technologies.tech2Desc"),
      color: "#4F7CFF",
      icons: [
        { icon: FaJava, name: "Java 21" },
        { icon: SiSpringboot, name: "Spring Boot" },
        { icon: SiHibernate, name: "Hibernate" },
        { icon: FaKey, name: "JWT" }
      ]
    },
    {
      title: t("landing.technologies.tech3Title"),
      description: t("landing.technologies.tech3Desc"),
      color: "#A06BFF",
      icons: [
        { icon: SiPostgresql, name: "PostgreSQL" },
        { icon: FaDatabase, name: "SQL" }
      ]
    },
    {
      title: t("landing.technologies.tech4Title"),
      description: t("landing.technologies.tech4Desc"),
      color: "#FFAE3C",
      icons: [
        { icon: FaDocker, name: "Docker" },
        { icon: FaGitAlt, name: "Git" },
        { icon: FaGithub, name: "GitHub" },
        { icon: SiFigma, name: "Figma" }
      ]
    }
  ];

  return (

    <section id="technologies" className="technologies">

      <span className="section-badge">
        {t("landing.technologies.badge")}
      </span>

      <h2>
        {t("landing.technologies.title")}
        <span> {t("landing.technologies.titleHighlight")}</span>
      </h2>

      <p>
        {t("landing.technologies.description")}
      </p>

      <div className="technology-grid">

        {technologies.map((tech) => (

          <TechnologyCard
            key={tech.title}
            {...tech}
          />

        ))}

      </div>

    </section>

  );

}

export default Technologies;
