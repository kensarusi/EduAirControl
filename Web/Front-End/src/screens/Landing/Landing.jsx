import Navbar from "../../components/landing/Navbar/Navbar";
import Hero from "../../components/landing/Hero/app/Hero";
import WhyChoose from "../../components/landing/WhyChoose/WhyChoose";
import Features from "../../components/landing/Features/Features";
import Modules from "../../components/landing/Modules/Modules";
import TechStack from "../../components/landing/TechStack/TechStack";
import CTA from "../../components/landing/CTA/CTA";
import Footer from "../../components/landing/Footer/Footer";

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