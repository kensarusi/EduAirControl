import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero/Hero";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Features from "../components/Features/Features";
import Modules from "../components/Modules/Modules";
import TechStack from "../components/TechStack/TechStack";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <WhyChoose />
      <Features />
      <Modules />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  );
}

export default Landing;