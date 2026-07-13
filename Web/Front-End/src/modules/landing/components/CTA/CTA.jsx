import { Link } from "react-router-dom";
import { ArrowRight, LogIn } from "lucide-react";
import "./CTA.css"


function CTA() {
  return (
    <section id="cta" className="cta">

      <div className="cta-container">

        <span className="cta-badge">
          Comienza hoy
        </span>

        <h2>
          Construyamos instituciones
          <span> más saludables</span>
        </h2>

        <p>
          EduAirControl ayuda a monitorear la calidad del aire en tiempo real,
          generar alertas inteligentes y tomar decisiones basadas en datos para
          proteger a toda la comunidad educativa.
        </p>

        <div className="cta-buttons">

        <Link to="/signup" className="btn-primary">
            <LogIn size={20}/>
            REGISTRATE AHORA MISMO!
        </Link>

        </div>

      </div>

    </section>
  );
}

export default CTA;