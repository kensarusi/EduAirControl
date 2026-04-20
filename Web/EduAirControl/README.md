# 🌿 EduAirControl — Frontend

Sistema de monitoreo y control de calidad del aire en ambientes educativos.

---

## 📋 Descripción

EduAirControl es una plataforma web que permite monitorear en tiempo real las condiciones ambientales (temperatura, humedad, CO₂ y nivel de ruido) de diferentes ambientes de formación. El sistema genera alertas y advertencias cuando los valores están fuera de los rangos ideales, soporta modo oscuro y está disponible en español e inglés.

---

## 🚀 Tecnologías

| Tecnología       | Versión | Uso                              |
|------------------|---------|----------------------------------|
| React            | 19+     | Librería principal               |
| Vite             | 8+      | Bundler y servidor de desarrollo |
| React Router DOM | 7+      | Navegación entre pantallas       |
| React Icons      | 5+      | Íconos del proyecto              |
| i18next          | latest  | Internacionalización (i18n)      |
| react-i18next    | latest  | Integración de i18next con React |
| CSS3             | —       | Estilos personalizados           |

---

## ⚙️ Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/kensarusi/eduaircontrol-frontend.git
```

2. Entrar a la carpeta:
```bash
cd eduaircontrol-frontend/Front-End
```

3. Instalar dependencias:
```bash
npm install
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Abrir en el navegador:
```
http://localhost:5173
```

---

## 📁 Estructura del Proyecto

```text
EDUAIRCONTROL/
│
├── Back-End/
├── Docs/
│
└── Front-End/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    │
    ├── src/
    │   ├── assets/                          # Imágenes y recursos estáticos
    │   │   ├── EduAirControlLogo.png
    │   │   ├── facebook-icon.png
    │   │   ├── google-icon.png
    │   │   ├── hero.png
    │   │   └── react.svg
    │   │
    │   ├── constants/
    │   │   └── environments.js              # STATUS, QUALITY, colores y rangos ideales
    │   │
    │   ├── hooks/
    │   │   ├── useDarkMode.js               # Toggle dark mode + persistencia localStorage
    │   │   └── useFavorites.js              # Gestión de favoritos + persistencia localStorage
    │   │
    │   ├── i18n/
    │   │   ├── en.json                      # Traducciones en inglés
    │   │   ├── es.json                      # Traducciones en español
    │   │   └── i18n.js                      # Configuración de i18next
    │   │
    │   ├── components/
    │   │   ├── ui/                          # Componentes genéricos reutilizables
    │   │   │   ├── index.js                 # Barrel export
    │   │   │   ├── BackButton.jsx
    │   │   │   ├── Button.jsx
    │   │   │   ├── Checkbox.jsx
    │   │   │   ├── Divider.jsx
    │   │   │   ├── EditModal.jsx
    │   │   │   └── Input.jsx
    │   │   │
    │   │   ├── environment/                 # Componentes del dominio de ambientes
    │   │   │   ├── index.js                 # Barrel export
    │   │   │   ├── EnvironmentCard.jsx
    │   │   │   ├── EnvironmentFilters.jsx
    │   │   │   ├── EnvironmentSummaryCard.jsx
    │   │   │   └── FilterBar.jsx
    │   │   │
    │   │   ├── forms/                       # Formularios y autenticación social
    │   │   │   ├── ChangePasswordForm.jsx
    │   │   │   ├── ForgotPasswordForm.jsx
    │   │   │   ├── LoginForm.jsx
    │   │   │   ├── SignUpForm.jsx
    │   │   │   ├── SocialLogin.jsx
    │   │   │   └── VerifyCodeForm.jsx
    │   │   │
    │   │   └── layout/                      # Estructuras de página
    │   │       ├── AuthLayout.jsx
    │   │       ├── DashboardLayout.jsx
    │   │       └── Navbar.jsx
    │   │
    │   ├── screens/
    │   │   ├── auth/                        # Flujo de autenticación
    │   │   │   ├── ChangePasswordScreen.jsx
    │   │   │   ├── ForgotPasswordScreen.jsx
    │   │   │   ├── GoogleSignUpScreen.jsx
    │   │   │   ├── LoginScreen.jsx
    │   │   │   ├── SignUpScreen.jsx
    │   │   │   ├── TermsScreen.jsx
    │   │   │   └── VerifyCodeScreen.jsx
    │   │   │
    │   │   └── app/                         # Pantallas principales
    │   │       ├── AllEnvironmentsScreen.jsx
    │   │       ├── DashboardScreen.jsx
    │   │       ├── FavoritesScreen.jsx
    │   │       ├── ProfileScreen.jsx
    │   │       └── SettingsScreen.jsx
    │   │
    │   ├── styles/
    │   │   ├── auth/                        # Login, SignUp, ForgotPassword, etc.
    │   │   ├── app/                         # Dashboard, Favorites, Profile, Settings
    │   │   ├── layout/                      # Navbar, DashboardLayout
    │   │   └── components/                  # EnvironmentCard, FilterBar, etc.
    │   │
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    │
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── README.md
    └── vite.config.js
```

---

## 🛣️ Rutas de la Aplicación

| Ruta                | Pantalla              | Descripción                    |
|---------------------|-----------------------|--------------------------------|
| `/`                 | LoginScreen           | Inicio de sesión               |
| `/signup`           | SignUpScreen          | Registro de usuario            |
| `/terms`            | TermsScreen           | Términos y condiciones         |
| `/google-signup`    | GoogleSignUpScreen    | Registro con Google            |
| `/forgot-password`  | ForgotPasswordScreen  | Recuperar contraseña           |
| `/verify-code`      | VerifyCodeScreen      | Verificar código               |
| `/change-password`  | ChangePasswordScreen  | Cambiar contraseña             |
| `/dashboard`        | DashboardScreen       | Panel principal con ambientes  |
| `/all-environments` | AllEnvironmentsScreen | Todos los ambientes            |
| `/profile`          | ProfileScreen         | Perfil del usuario             |
| `/favorites`        | FavoritesScreen       | Ambientes favoritos            |
| `/settings`         | SettingsScreen        | Configuración                  |

---

## 🧩 Componentes Principales

### UI — Genéricos reutilizables

| Componente  | Descripción                    |
|-------------|--------------------------------|
| `BackButton` | Botón de retroceso circular   |
| `Button`     | Botón genérico reutilizable   |
| `Checkbox`   | Checkbox con label            |
| `Divider`    | Separador con texto (ej. OR)  |
| `EditModal`  | Modal para editar campos      |
| `Input`      | Input genérico con label      |

### Environment — Dominio de ambientes

| Componente               | Descripción                                   |
|--------------------------|-----------------------------------------------|
| `EnvironmentCard`        | Tarjeta de ambiente con datos detallados      |
| `EnvironmentFilters`     | Inputs de filtrado por nombre, CO₂, dB, temp |
| `EnvironmentSummaryCard` | Tarjeta resumen de ambiente                   |
| `FilterBar`              | Barra de filtros del dashboard                |

### Forms — Formularios

| Componente           | Descripción                               |
|----------------------|-------------------------------------------|
| `LoginForm`          | Formulario de inicio de sesión            |
| `SignUpForm`         | Formulario de registro                    |
| `ForgotPasswordForm` | Formulario de recuperación de contraseña  |
| `VerifyCodeForm`     | Formulario de verificación de código      |
| `ChangePasswordForm` | Formulario de cambio de contraseña        |
| `SocialLogin`        | Botones de Facebook y Google              |

### Layout — Estructuras de página

| Componente        | Descripción                             |
|-------------------|-----------------------------------------|
| `AuthLayout`      | Layout para pantallas de autenticación  |
| `DashboardLayout` | Layout para pantallas del dashboard     |
| `Navbar`          | Barra de navegación lateral             |

---

## 🌐 Internacionalización (i18n)

La aplicación soporta múltiples idiomas gracias a `react-i18next`. Actualmente disponible en:

| Idioma  | Código | Archivo            |
|---------|--------|--------------------|
| Español | `es`   | `src/i18n/es.json` |
| Inglés  | `en`   | `src/i18n/en.json` |

El idioma se puede cambiar desde **Configuración → Idioma** y se guarda automáticamente para futuras sesiones.

---

## 🌙 Modo Oscuro

La aplicación incluye modo oscuro completo, activable desde **Configuración → Apariencia**. La preferencia se guarda en `localStorage` y se mantiene al recargar la página.

---

## 💾 Persistencia Local

Los siguientes datos se guardan en `localStorage` y se mantienen entre sesiones:

| Dato                    | Clave          |
|-------------------------|----------------|
| Idioma seleccionado     | `language`     |
| Modo oscuro             | `darkMode`     |
| Perfil del usuario      | `profile`      |
| Configuración general   | `settings`     |
| Zona horaria automática | `autoTimezone` |
| Ambientes favoritos     | `favorites`    |

---

## 📦 Dependencias

```json
{
  "react": "^19.x",
  "react-dom": "^19.x",
  "react-router-dom": "^7.x",
  "react-icons": "^5.x",
  "i18next": "latest",
  "react-i18next": "latest"
}
```

---

## 👥 Equipo

| Nombre                            | Rol                                                      |
|-----------------------------------|----------------------------------------------------------|
| Keneth Santiago Rubiano Silva     | Desarrollador Full Stack — Especialidad Front-End        |
| Jhon Jairo Cortéz Vargas          | Desarrollador Full Stack — Especialidad Back-End         |
| Maria De Los Angeles Olaya Garcia | Desarrollador Full Stack — Especialidad Documentación    |

---