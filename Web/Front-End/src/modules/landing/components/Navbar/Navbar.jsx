import "./Navbar.css";
import logo from "../../../../shared/assets/EduAirControlLogo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ScrollLink from "../../../../shared/components/ScrollLink/ScrollLink";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../../../shared/components/LanguageSelector/LanguageSelector";

function Navbar() {

    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 40);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (

        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>

            {/* Logo */}

            <div
                className="logo"
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                    closeMenu();
                }}
            >

                <img src={logo} alt="EduAirControl" />

                <span>EduAirControl</span>

            </div>

            {/* Navegación Desktop */}

            <div className="navbar-links">

                <ScrollLink to="hero">{t("landing.navbar.home")}</ScrollLink>

                <ScrollLink to="why">{t("landing.navbar.why")}</ScrollLink>

                <ScrollLink to="how">{t("landing.navbar.howItWorks")}</ScrollLink>

                <ScrollLink to="designed">{t("landing.navbar.designedFor")}</ScrollLink>

                <ScrollLink to="cta">{t("landing.navbar.cta")}</ScrollLink>

            </div>

            {/* Acciones Desktop */}

            <div className="navbar-actions">

                <LanguageSelector />

                <button
                    className="login-btn"
                    onClick={() => navigate("/login")}
                >

                    {t("landing.navbar.login")}

                </button>

            </div>

            {/* Hamburguesa */}

            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >

                {menuOpen ? <X size={28}/> : <Menu size={28}/>}

            </button>

            {/* Menú Mobile */}

            <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>

                <ScrollLink to="hero" onClick={closeMenu}>{t("landing.navbar.home")}</ScrollLink>

                <ScrollLink to="why" onClick={closeMenu}>{t("landing.navbar.why")}</ScrollLink>

                <ScrollLink to="how" onClick={closeMenu}>{t("landing.navbar.howItWorks")}</ScrollLink>

                <ScrollLink to="designed" onClick={closeMenu}>{t("landing.navbar.designedFor")}</ScrollLink>

                <ScrollLink to="cta" onClick={closeMenu}>{t("landing.navbar.cta")}</ScrollLink>

                <div className="mobile-lang-selector">
                    <LanguageSelector />
                </div>

                <button
                    className="mobile-login"
                    onClick={() => {

                        closeMenu();

                        navigate("/login");

                    }}
                >

                    {t("landing.navbar.login")}

                </button>

            </nav>

        </header>

    );

}

export default Navbar;
