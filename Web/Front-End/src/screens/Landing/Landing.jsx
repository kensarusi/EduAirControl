import Navbar from '../../components/landing/Navbar/Navbar'
import Hero from '../../components/landing/Hero/Hero'
import Statistics from '../../components/landing/Statistics/Statistics'
import Features from '../../components/landing/Features/Features'
import Modules from '../../components/landing/Modules/Modules'
import TechStack from '../../components/landing/TechStack/TechStack'
import CTA from '../../components/landing/CTA/CTA'
import Footer from '../../components/landing/Footer/Footer'

import './Landing.css'

function Landing() {
    return (
        <div className="landing">

            <Navbar />
            <Hero />
            <Statistics />
            <Features />
            <Modules />
            <TechStack />
            <CTA />
            <Footer />

        </div>
    )
}

export default Landing