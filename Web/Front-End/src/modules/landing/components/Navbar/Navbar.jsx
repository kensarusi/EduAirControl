import "./Navbar.css";
import { FaLeaf } from "react-icons/fa";
import logo from "../../../../shared/assets/EduAirControlLogo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollLink from "../../../../shared/components/ScrollLink/ScrollLink";

function Navbar() {
const [scrolled, setScrolled] = useState(false);
const navigate = useNavigate();

useEffect(() => {

    const handleScroll = () => {

        setScrolled(window.scrollY > 40);

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (
        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>

            <div className="logo">
            <img src={logo} alt="EduAirControl" />
            <span>EduAirControl</span>
                </div>

          <nav className="navbar-menu">

            <ScrollLink to="hero">
                Inicio
            </ScrollLink>

            <ScrollLink to="why">
                ¿Por qué elegirnos?
            </ScrollLink>

            <ScrollLink to="modules">
                Módulos
            </ScrollLink>

            <ScrollLink to="how">
                Cómo funciona
            </ScrollLink>

            <ScrollLink to="technologies">
                Tecnologías
            </ScrollLink>

            <ScrollLink to="designed">
                Diseñado para
            </ScrollLink>

            <ScrollLink to="cta">
                CTA
            </ScrollLink>

        </nav>

            <div className="navbar-actions">

            <button
            className="login-btn"
            onClick={() => navigate("/login")}
        >
            Iniciar sesión
        </button>

        </div>

        </header>
    );
}

export default Navbar;