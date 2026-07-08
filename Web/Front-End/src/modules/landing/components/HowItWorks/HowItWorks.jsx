import "./HowItWorks.css";

import ArchitectureDiagram from "./ArchitectureDiagram";
import { architectureData } from "./ArchitectureData";

function HowItWorks() {
  return (
    <section className="how-it-works">

      <div className="how-header">

        <span className="how-badge">
          Arquitectura del sistema
        </span>

        <h2 className="how-title">
          ¿Cómo funciona <span>EduAirControl</span>?
        </h2>

        <p className="how-description">
          Desde la captura de datos hasta la visualización de métricas y la
          generación de alertas, toda la información fluye automáticamente
          mediante una arquitectura moderna, segura y escalable.
        </p>

      </div>

      <div className="architecture-container">

        {/* Diagrama */}
        <ArchitectureDiagram />

        {/* Explicación */}
        <div className="architecture-info">

          {architectureData.map((item) => (

            <div className="info-card" key={item.id}>

              <div className="info-number">
                {item.id}
              </div>

              <div className="info-content">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;