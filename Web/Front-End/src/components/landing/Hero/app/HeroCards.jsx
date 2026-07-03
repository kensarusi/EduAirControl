import "../style/HeroCards.css";

import {
    FaLeaf,
    FaChartLine,
    FaBell,
    FaDatabase
} from "react-icons/fa";

function HeroCards() {

    return (

        <div className="hero-cards">

            <div className="hero-card">
                <FaLeaf />
                <span>Ambientes Saludables</span>
            </div>

            <div className="hero-card">
                <FaChartLine />
                <span>Tiempo
                    <br />
                     Real</span>
            </div>

            <div className="hero-card">
                <FaBell />
                <span>Alertas Inteligentes</span>
            </div>

            <div className="hero-card">
                <FaDatabase />
                <span>Historial y Reportes</span>
            </div>

        </div>

    );

}

export default HeroCards;