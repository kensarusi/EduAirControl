import "./HeroCards.css";
import { useTranslation } from "react-i18next";

import {
    FaLeaf,
    FaChartLine,
    FaBell,
    FaDatabase
} from "react-icons/fa";

function HeroCards() {
    const { t } = useTranslation();

    return (

        <div className="hero-cards">

       <div className="hero-card">
            <div className="hero-card-icon"><FaLeaf /></div>
            <span>{t("landing.hero.cards.healthy")}</span>
        </div>

        <div className="hero-card">
            <div className="hero-card-icon"><FaChartLine /></div>
            <span>{t("landing.hero.cards.realtime").split(' ').map((text, i) => (
                <span key={i}>{text}<br /></span>
            ))}</span>
        </div>

        <div className="hero-card">
            <div className="hero-card-icon"><FaBell /></div>
            <span>{t("landing.hero.cards.alerts")}</span>
        </div>

        <div className="hero-card">
            <div className="hero-card-icon"><FaDatabase /></div>
            <span>{t("landing.hero.cards.reports")}</span>
        </div>

        </div>

    );

}

export default HeroCards;
