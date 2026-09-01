import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./shared/styles/design-system.css";
import "./shared/i18n/i18n.js";
import { EnvironmentProvider } from "./context/EnvironmentContext";
import GlobalAccessibilityProvider from "./shared/components/GlobalAccessibilityProvider/GlobalAccessibilityProvider";


// Restaurar tema daltónico y modo oscuro al cargar la aplicación.
const savedTheme = localStorage.getItem("a11y-color-theme") || localStorage.getItem("theme") || "";


let darkMode = false;
try {
  darkMode = JSON.parse(localStorage.getItem("darkMode") || "false");
} catch {
  darkMode = false;
}

const savedClasses = [savedTheme, darkMode ? "dark-mode" : ""]
  .filter(Boolean)
  .join(" ");

if (savedClasses) {
  document.body.className = savedClasses;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EnvironmentProvider>
        <GlobalAccessibilityProvider>
          <App />
        </GlobalAccessibilityProvider>
      </EnvironmentProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
