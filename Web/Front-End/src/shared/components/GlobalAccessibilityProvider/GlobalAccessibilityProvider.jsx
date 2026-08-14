import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AccessibilityWidget from "../../../modules/landing/components/AccessibilityWidget/AccessibilityWidget";

/**
 * GlobalAccessibilityProvider
 * Envuelve la app para proporcionar el widget de accesibilidad globalmente
 * y sincronizar el estado de accesibilidad en todas las pantallas.
 *
 * El widget de accesibilidad se muestra en TODAS las rutas.
 * En el landing, el widget se eleva (raised=true) para dejar espacio
 * al botón de "volver arriba" que está debajo.
 */
function GlobalAccessibilityProvider({ children }) {
    const location = useLocation();
    const isLanding = location.pathname === "/" || location.pathname === "/landing";

    const applyA11ySettings = () => {
        const savedFontSize = localStorage.getItem("a11y-font-size") || "base";
        const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
        const savedTheme =
        localStorage.getItem("a11y-color-theme") || "";

        // Aplicar tamaño de fuente
        const fontSizes = { base: "16px", lg: "18px", xl: "20px" };
        document.documentElement.style.setProperty(
            "--a11y-font-size",
            fontSizes[savedFontSize] || "16px"
        );
        document.documentElement.setAttribute("data-font-size", savedFontSize);

        // Aplicar tema al body (tema daltónico + dark mode)
        const classes = [savedTheme, savedDarkMode ? "dark-mode" : ""]
            .filter(Boolean)
            .join(" ");

        // Forzar la aplicación de clases incluso si ya están
        document.body.className = classes;

        // Sincronizar atributo data-theme para selectores CSS adicionales
        document.documentElement.setAttribute(
            "data-theme",
            savedDarkMode ? "dark" : "light"
        );
    };

    useEffect(() => {
        // Aplicar ajustes al montar
        applyA11ySettings();

        // Escuchar cambios del widget de accesibilidad
        const handleA11yChange = () => applyA11ySettings();
        window.addEventListener("a11y-change", handleA11yChange);

        return () => window.removeEventListener("a11y-change", handleA11yChange);
    }, []);

    // Re-aplicar al cambiar de ruta para que ningún componente de página
    // pueda resetear las clases del body
    useEffect(() => {
        applyA11ySettings();
    }, [location]);

    return (
        <>
            {children}
            {/* El widget de accesibilidad aparece en TODAS las pantallas.
                En el landing se eleva para dejar espacio al botón scroll-to-top. */}
            <AccessibilityWidget raised={isLanding} />
        </>
    );
}

export default GlobalAccessibilityProvider;
