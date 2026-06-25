import "./HeroContent.css";

function HeroContent() {
  return (

    <div className="hero-content">

      <span className="hero-badge">
        🌿 Plataforma líder en monitoreo ambiental educativo
      </span>

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

        <button className="primary-btn">
          Solicitar Demo
        </button>

        <button className="secondary-btn">
          Ver Plataforma
        </button>

      </div>

    </div>

  );
}

export default HeroContent;