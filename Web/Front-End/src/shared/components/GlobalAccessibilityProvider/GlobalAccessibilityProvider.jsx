import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AccessibilityWidget from "../../../modules/landing/components/AccessibilityWidget/AccessibilityWidget";

/**
 * GlobalAccessibilityProvider
 * Envuelve la app para proporcionar el widget de accesibilidad globalmente
 * y sincronizar el estado de accesibilidad en todas las pantallas.
 */
function GlobalAccessibilityProvider({ children }) {
    const location = useLocation();

    const applyA11ySettings = () => {
        const savedFontSize = localStorage.getItem("a11y-font-size") || "base";
        const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
        const savedTheme = localStorage.getItem("theme") || "";

        // Aplicar fuente
        const fontSizes = { base: "16px", lg: "18px", xl: "20px" };
        document.documentElement.style.setProperty("--a11y-font-size", fontSizes[savedFontSize] || "16px");

        // Aplicar tema al body
        const classes = [savedTheme, savedDarkMode ? "dark-mode" : ""].filter(Boolean).join(" ");
        
        // Forzar la aplicación de clases incluso si ya están (por si algún componente las limpia)
        document.body.className = classes;
        
        // Sincronizar el atributo data-theme para selectores CSS más específicos si se necesitan
        document.documentElement.setAttribute("data-theme", savedDarkMode ? "dark" : "light");
    };

    useEffect(() => {
        applyA11ySettings();

        // Escuchar cambios personalizados del widget
        const handleA11yChange = () => {
            applyA11ySettings();
        };

        window.addEventListener("a11y-change", handleA11yChange);
        return () => window.removeEventListener("a11y-change", handleA11yChange);
    }, []);

    // Re-aplicar al cambiar de ruta por si el componente de la página resetea el body
    useEffect(() => {
        applyA11ySettings();
    }, [location]);

    return (
        <>
            {children}
            <AccessibilityWidget />
        </>
    );
}

export default GlobalAccessibilityProvider;
