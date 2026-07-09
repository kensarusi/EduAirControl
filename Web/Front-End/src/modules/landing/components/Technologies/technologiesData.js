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

export const technologies = [
  {
    title: "Frontend",
    description: "Interfaz moderna, rápida y totalmente responsive.",
    color: "#38F4D8",
    icons: [
      { icon: FaReact, name: "React" },
      { icon: SiVite, name: "Vite" },
      { icon: SiJavascript, name: "JavaScript" },
      { icon: FaCss3Alt, name: "CSS3" }
    ]
  },

  {
    title: "Backend",
    description: "Servicios REST seguros y escalables.",
    color: "#4F7CFF",
    icons: [
      { icon: FaJava, name: "Java 21" },
      { icon: SiSpringboot, name: "Spring Boot" },
      { icon: SiHibernate, name: "Hibernate" },
      { icon: FaKey, name: "JWT" }
    ]
  },

  {
    title: "Base de Datos",
    description: "Persistencia eficiente para grandes volúmenes de datos.",
    color: "#A06BFF",
    icons: [
      { icon: SiPostgresql, name: "PostgreSQL" },
      { icon: FaDatabase, name: "SQL" }
    ]
  },

  {
    title: "DevOps",
    description: "Control de versiones y despliegue continuo.",
    color: "#FFAE3C",
    icons: [
      { icon: FaDocker, name: "Docker" },
      { icon: FaGitAlt, name: "Git" },
      { icon: FaGithub, name: "GitHub" },
      { icon: SiFigma, name: "Figma" }
    ]
  }
];