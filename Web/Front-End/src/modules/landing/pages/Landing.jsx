import Navbar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Hero from "../components/Hero/Hero/Hero";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import SystemModules from "../components/SystemModules/SystemModules";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Technologies from "../components/Technologies/Technologies";
import DesignedFor from "../components/DesignedFor/DesignedFor"
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

import "./Landing.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Landing() {

      const location = useLocation();

    useEffect(() => {

        if (location.state?.scrollTo) {

            const id = location.state.scrollTo;

            setTimeout(() => {

                document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth"
                });

            }, 100);

        }

    }, [location]);
    
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
      <ScrollToTop />
    </div>
  );
}

export default Landing;