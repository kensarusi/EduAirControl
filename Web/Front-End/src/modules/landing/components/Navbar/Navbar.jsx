import "./Navbar.css";
import { FaLeaf } from "react-icons/fa";
import logo from "../../../../shared/assets/EduAirControlLogo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

                <a href="#">Inicio</a>
                <a href="#">Por qué elegirnos?</a>
                <a href="#">Tecnología</a>
                <a href="#">Recursos</a>
                <a href="#">Contacto</a>

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