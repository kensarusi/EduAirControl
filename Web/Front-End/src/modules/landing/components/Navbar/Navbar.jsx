import "./Navbar.css";
import logo from "../../../../shared/assets/EduAirControlLogo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ScrollLink from "../../../../shared/components/ScrollLink/ScrollLink";

function Navbar() {

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

                <ScrollLink to="hero">Inicio</ScrollLink>

                <ScrollLink to="why">¿Por qué elegirnos?</ScrollLink>

                <ScrollLink to="modules">Módulos</ScrollLink>

                <ScrollLink to="how">Cómo funciona</ScrollLink>

                <ScrollLink to="technologies">Tecnologías</ScrollLink>

                <ScrollLink to="designed">Diseñado para</ScrollLink>

                <ScrollLink to="cta">CTA</ScrollLink>

            </div>

            {/* Botón Desktop */}

            <div className="navbar-actions">

                <button
                    className="login-btn"
                    onClick={() => navigate("/login")}
                >

                    Iniciar sesión

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

                <ScrollLink to="hero" onClick={closeMenu}>Inicio</ScrollLink>

                <ScrollLink to="why" onClick={closeMenu}>¿Por qué elegirnos?</ScrollLink>

                <ScrollLink to="modules" onClick={closeMenu}>Módulos</ScrollLink>

                <ScrollLink to="how" onClick={closeMenu}>Cómo funciona</ScrollLink>

                <ScrollLink to="technologies" onClick={closeMenu}>Tecnologías</ScrollLink>

                <ScrollLink to="designed" onClick={closeMenu}>Diseñado para</ScrollLink>

                <ScrollLink to="cta" onClick={closeMenu}>CTA</ScrollLink>

                <button
                    className="mobile-login"
                    onClick={() => {

                        closeMenu();

                        navigate("/login");

                    }}
                >

                    Iniciar sesión

                </button>

            </nav>

        </header>

    );

}

export default Navbar;