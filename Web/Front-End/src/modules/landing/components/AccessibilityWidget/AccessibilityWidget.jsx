import { useState, useEffect, useRef } from "react";
import "./AccessibilityWidget.css";

/* ── Constantes ── */
const FONT_SIZES = [
    { key: "base", label: "Base", size: "16px" },
    { key: "lg",   label: "LG",   size: "18px" },
    { key: "xl",   label: "XL",   size: "20px" },
];

const COLOR_THEMES = [
    { key: "",                   label: "Normal",       color: "#28F4D6" },
    { key: "theme-protanopia",   label: "Protanopia",   color: "#0072b2" },
    { key: "theme-deuteranopia", label: "Deuteranopia", color: "#E69F00" },
    { key: "theme-tritanopia",   label: "Tritanopia",   color: "#D55E00" },
];

const STORAGE_KEYS = {
    fontSize: "a11y-font-size",
    darkMode: "darkMode",
    colorTheme: "a11y-color-theme",
};

/* ── Helpers ── */
function applyBodyClasses(theme, dark) {
    const classes = [theme, dark ? "dark-mode" : ""].filter(Boolean).join(" ");
    document.body.className = classes;
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    // Notificar al GlobalAccessibilityProvider y demás oyentes
    window.dispatchEvent(new CustomEvent("a11y-change"));
}

function applyFontSize(key) {
    const entry = FONT_SIZES.find((f) => f.key === key) || FONT_SIZES[0];
    document.documentElement.style.setProperty("--a11y-font-size", entry.size);
    document.documentElement.setAttribute("data-font-size", key);
    window.dispatchEvent(new CustomEvent("a11y-change"));
}

/* ── Componente ── */
function AccessibilityWidget({ raised = false }) {
    const [open, setOpen] = useState(false);
    const widgetRef = useRef(null);

    /* Estado inicial desde localStorage */
    const [fontSize, setFontSize] = useState(
        () => localStorage.getItem(STORAGE_KEYS.fontSize) || "base"
    );
    const [darkMode, setDarkMode] = useState(
        () => JSON.parse(localStorage.getItem(STORAGE_KEYS.darkMode)) || false
    );
    const [colorTheme, setColorTheme] = useState(
        () => localStorage.getItem(STORAGE_KEYS.colorTheme) || ""
    );

    /* Aplicar al montar */
    useEffect(() => {
        applyFontSize(fontSize);
        applyBodyClasses(colorTheme, darkMode);
    }, []);

    /* Cerrar al hacer click fuera */
    useEffect(() => {
        const handleOutside = (e) => {
            if (widgetRef.current && !widgetRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [open]);

    /* Cerrar con Escape */
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open]);

    /* ── Handlers ── */
    const handleFontSize = (key) => {
        setFontSize(key);
        localStorage.setItem(STORAGE_KEYS.fontSize, key);
        applyFontSize(key);
    };

    const handleDarkMode = (val) => {
        setDarkMode(val);
        localStorage.setItem(STORAGE_KEYS.darkMode, JSON.stringify(val));
        applyBodyClasses(colorTheme, val);
    };

    const handleColorTheme = (key) => {
        setColorTheme(key);
        localStorage.setItem(STORAGE_KEYS.colorTheme, key);
        applyBodyClasses(key, darkMode);
    };

    const handleReset = () => {
        setFontSize("base");
        setDarkMode(false);
        setColorTheme("");
        localStorage.setItem(STORAGE_KEYS.fontSize, "base");
        localStorage.setItem(STORAGE_KEYS.darkMode, JSON.stringify(false));
        localStorage.setItem(STORAGE_KEYS.theme, "");
        applyFontSize("base");
        applyBodyClasses("", false);
    };

    return (
        <div
            className={`a11y-widget${raised ? " a11y-widget--raised" : ""}`}
            ref={widgetRef}
        >
            {/* Panel (se abre sobre el botón) */}
            {open && (
                <div className="a11y-panel" role="dialog" aria-label="Panel de accesibilidad">
                    {/* Header */}
                    <div className="a11y-panel__header">
                        <span className="a11y-panel__title">Accesibilidad</span>
                        <button
                            className="a11y-panel__close"
                            onClick={() => setOpen(false)}
                            aria-label="Cerrar panel"
                        >
                            ✕
                        </button>
                    </div>

                    {/* ── Tamaño de texto ── */}
                    <div className="a11y-section">
                        <p className="a11y-section__label">Tamaño de texto</p>
                        <div className="a11y-font-row">
                            {FONT_SIZES.map((f) => (
                                <button
                                    key={f.key}
                                    className={`a11y-font-btn${fontSize === f.key ? " a11y-font-btn--active" : ""}`}
                                    onClick={() => handleFontSize(f.key)}
                                    aria-pressed={fontSize === f.key}
                                >
                                    <span
                                        className="a11y-font-preview"
                                        style={{
                                            fontSize:
                                                f.key === "base" ? "14px" :
                                                f.key === "lg"   ? "17px" : "20px",
                                        }}
                                    >
                                        Aa
                                    </span>
                                    <span className="a11y-font-label">{f.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Modo claro / oscuro ── */}
                    <div className="a11y-section">
                        <p className="a11y-section__label">Modo de color</p>
                        <div className="a11y-mode-row">
                            <button
                                className={`a11y-mode-btn${!darkMode ? " a11y-mode-btn--active" : ""}`}
                                onClick={() => handleDarkMode(false)}
                                aria-pressed={!darkMode}
                            >
                                <span className="a11y-mode-icon">☀️</span>
                                <span>Claro</span>
                            </button>
                            <button
                                className={`a11y-mode-btn${darkMode ? " a11y-mode-btn--active" : ""}`}
                                onClick={() => handleDarkMode(true)}
                                aria-pressed={darkMode}
                            >
                                <span className="a11y-mode-icon">🌙</span>
                                <span>Oscuro</span>
                            </button>
                        </div>
                    </div>

                    {/* ── Daltonismo ── */}
                    <div className="a11y-section">
                        <p className="a11y-section__label">Visión del color</p>
                        <div className="a11y-theme-grid">
                            {COLOR_THEMES.map((t) => (
                                <button
                                    key={t.key}
                                    className={`a11y-theme-btn${colorTheme === t.key ? " a11y-theme-btn--active" : ""}`}
                                    onClick={() => handleColorTheme(t.key)}
                                    aria-pressed={colorTheme === t.key}
                                >
                                    <span
                                        className="a11y-theme-dot"
                                        style={{ background: t.color }}
                                    />
                                    <span className="a11y-theme-name">{t.label}</span>
                                    {colorTheme === t.key && (
                                        <span className="a11y-theme-check">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Restablecer ── */}
                    <button className="a11y-reset-btn" onClick={handleReset}>
                        <span>↺</span> Restablecer todo
                    </button>
                </div>
            )}

            {/* Botón flotante (siempre visible, debajo del panel) */}
            <button
                className={`a11y-trigger${open ? " a11y-trigger--open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-label="Opciones de accesibilidad"
                aria-expanded={open}
                title="Accesibilidad"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="a11y-icon"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
                    <path d="M5 8h14M12 8v5l-3 4M12 13l3 4" />
                </svg>
            </button>
        </div>
    );
}

export default AccessibilityWidget;
