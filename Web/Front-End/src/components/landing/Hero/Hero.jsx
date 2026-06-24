import "./Hero.css";

import HeroContent from "./HeroContent";
import HeroCards from "./HeroCards";
import HeroDashboard from "./HeroDashboard";

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

        <div className="hero-right">
          <HeroDashboard />
        </div>

      </div>

    </section>
  );
}

export default Hero;