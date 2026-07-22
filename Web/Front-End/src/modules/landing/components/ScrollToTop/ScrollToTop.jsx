import { useState, useEffect } from "react";
import "./ScrollToTop.css";

/**
 * ScrollToTop
 * Botón flotante exclusivo para la Landing que lleva al usuario al inicio.
 * Se posiciona debajo del widget de accesibilidad.
 */
function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Mostrar el botón si el usuario ha bajado más de 300px
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            title="Volver arriba"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="scroll-to-top-icon"
                aria-hidden="true"
            >
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    );
}

export default ScrollToTop;
