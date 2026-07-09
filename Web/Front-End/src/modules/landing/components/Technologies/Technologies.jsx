import "./Technologies.css";
import TechnologyCard from "./TechnologyCard";
import { technologies } from "./technologiesData";

function Technologies() {

  return (

    <section className="technologies">

      <span className="section-badge">
        Stack Tecnológico
      </span>

      <h2>
        Tecnologías detrás de
        <span> EduAirControl</span>
      </h2>

      <p>
        Utilizamos herramientas modernas para construir
        una plataforma escalable, segura y preparada
        para aplicaciones IoT.
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