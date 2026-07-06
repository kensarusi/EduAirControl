import "./Hero.css";

import HeroContent from "../HeroContent/HeroContent";
import HeroCards from "../HeroCards/HeroCards";
import HeroDashboard from "../HeroDashboard/HeroDashboard";

function Hero() {
  return (
    <section className="hero">

      {/* Luces del fondo */}
      <div className="hero-glow hero-glow-left"></div>
      <div className="hero-glow hero-glow-right"></div>

      <div className="hero-container">

        <div className="hero-left">
          <HeroContent />
          <HeroCards />
        </div>

          <div className="dashboard-glow"></div>

        <div className="hero-right">
          <HeroDashboard />
        </div>

      </div>

        <div className="hero-transition"></div>

    </section>
  );
}

export default Hero;