import "./Footer.css";
import { Link } from "react-router-dom";

import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import ScrollLink from "../../../../shared/components/ScrollLink/ScrollLink";

function Footer() {
  return (
    <footer id="footer" className="footer">

      <div className="footer-container">

        {/* Logo */}
        <div className="footer-brand">

          <div className="footer-logo">

            <ShieldCheck size={28} />

            <span>EduAirControl</span>

          </div>

          <p>
            Plataforma inteligente para el monitoreo ambiental en tiempo real,
            ayudando a las instituciones educativas a tomar mejores decisiones
            mediante datos confiables.
          </p>

          <div className="footer-social">

            <a href="#">
              <FaGithub size={20} />
            </a>

            <a href="#">
              <FaLinkedin size={20} />
            </a>

          </div>

        </div>

        {/* Navegación */}
        <div className="footer-links">

          <h3>Navegación</h3>

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

        </div>

        {/* Recursos */}
        <div className="footer-links">

          <h3>Recursos</h3>

          <Link to="/login">Iniciar sesión</Link>
          <Link to="/signup">Crear cuenta</Link>
          <Link to="/terms">Términos y condiciones</Link>

        </div>

        {/* Contacto */}
        <div className="footer-contact">

          <h3>Contacto</h3>

          <div>
            <Mail size={18} />
            <span>soporte@eduaircontrol.com</span>
          </div>

          <div>
            <Phone size={18} />
            <span>+57 3229523486</span>
          </div>

          <div>
            <MapPin size={18} />
            <span>Neiva, Huila - Colombia</span>
          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 EduAirControl. Todos los derechos reservados.
        </p>

      </div>

    </footer>
  );
}

export default Footer;