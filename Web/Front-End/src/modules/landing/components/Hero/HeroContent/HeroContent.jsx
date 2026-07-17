import "./HeroContent.css";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function HeroContent() {
  return (
    <div className="hero-content">

      <div className="hero-badge">
        <ShieldCheck size={16} />

        <span>
          Plataforma líder en monitoreo ambiental educativo
        </span>
      </div>

      <h1 className="hero-title">
        Respira Tranquilo.
        <br />
        Aprende Mejor.
        <br />
        <span>EduAirControl.</span>
      </h1>

      <p className="hero-description">
        Monitorea en tiempo real la calidad del aire de aulas,
        laboratorios y espacios educativos mediante sensores IoT,
        análisis inteligentes y alertas automáticas.
      </p>

      <div className="hero-actions">

        <Link to="/signup" className="primary-btn">
          Crear cuenta
          <span className="btn-arrow">→</span>
        </Link>

        <Link to="/login" className="secondary-btn">
          Ver demostraciones
        </Link>

      </div>

      <div className="hero-stats">

        <div className="stat-item">
          <h3>+120</h3>
          <span>Instituciones</span>
        </div>

        <div className="stat-item">
          <h3>99.8%</h3>
          <span>Disponibilidad</span>
        </div>

        <div className="stat-item">
          <h3>24/7</h3>
          <span>Monitoreo</span>
        </div>

      </div>

      <div className="trusted-section">

    <div className="trusted-line"></div>

    <span className="trusted-title">
        Con la confianza de
    </span>

    <div className="trusted-items">

        <div className="trusted-item">
            🏫
            <span>Instituciones</span>
        </div>

        <div className="trusted-item">
            🎓
            <span>Universidades</span>
        </div>

        <div className="trusted-item">
            🧪
            <span>Laboratorios</span>
        </div>

        <div className="trusted-item">
            🏢
            <span>Centros de Formación</span>
        </div>

    </div>

</div>

    </div>
  );
}

export default HeroContent;