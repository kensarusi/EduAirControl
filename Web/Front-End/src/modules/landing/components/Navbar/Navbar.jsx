import "./Navbar.css";
import { FaLeaf } from "react-icons/fa";
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

    return (
        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>

           <div
            className="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <img src={logo} alt="EduAirControl" />
            <span>EduAirControl</span>
        </div>

        <div className="navbar-right">

        <div className="navbar-actions">
            <button
                className="login-btn"
                onClick={() => navigate("/login")}
            >
                Iniciar sesión
            </button>
        </div>

         <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        </div>

          <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>

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

     <button
        className="mobile-login"
        onClick={() => {
            setMenuOpen(false);
            navigate("/login");
        }}
    >
        Iniciar sesión
    </button>

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