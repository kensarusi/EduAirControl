import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero/Hero";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import SystemModules from "../components/SystemModules/SystemModules";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Technologies from "../components/Technologies/Technologies";
import DesignedFor from "../components/DesignedFor/DesignedFor"
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <WhyChoose />
      <SystemModules />
      <HowItWorks />
      <Technologies />
      <DesignedFor />
      <CTA />
      <Footer />
    </div>
  );
}

export default Landing;