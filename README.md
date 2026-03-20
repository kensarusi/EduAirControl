# 🌿 EduAirControl - Frontend

Sistema de monitoreo y control de calidad del aire en ambientes educativos.

---

## 📋 Descripción

EduAirControl es una plataforma web que permite monitorear en tiempo real las condiciones ambientales (temperatura, humedad, CO₂, nivel de ruido) de diferentes ambientes de formación. El sistema genera alertas y advertencias cuando los valores están fuera de los rangos ideales.

---

## 🚀 Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18+ | Librería principal |
| Vite | 5+ | Bundler y servidor de desarrollo |
| React Router DOM | 6+ | Navegación entre pantallas |
| React Icons | 5+ | Íconos del proyecto |
| CSS3 | - | Estilos personalizados |

---

## 📁 Estructura del Proyecto

```text
EDUAIRCONTROL/
│
├── Back-End/
│   └── Back-End.txt
│
├── Docs/
│   └── Docs.txt
│
├── Front-End/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── facebook-icon.png
│   │   │   ├── google-icon.png
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── BackButton.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Checkbox.jsx
│   │   │   │   ├── Divider.jsx
│   │   │   │   ├── EnvironmentCard.jsx
│   │   │   │   ├── EnvironmentSummaryCard.jsx
│   │   │   │   ├── FilterBar.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── SocialLogin.jsx
│   │   │   │   └── VerifyCodeForm.jsx
│   │   │   │
│   │   │   ├── forms/
│   │   │   │   ├── ChangePasswordForm.jsx
│   │   │   │   ├── ForgotPasswordForm.jsx
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── SignUpForm.jsx
│   │   │   │   └── VerifyCodeForm.jsx
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── AuthLayout.jsx
│   │   │       ├── DashboardLayout.jsx
│   │   │       └── Navbar.jsx
│   │   │
│   │   ├── screens/
│   │   │   ├── AllEnvironmentsScreen.jsx
│   │   │   ├── ChangePasswordScreen.jsx
│   │   │   ├── DashboardScreen.jsx
│   │   │   ├── FavoritesScreen.jsx
│   │   │   ├── ForgotPasswordScreen.jsx
│   │   │   ├── GoogleSignUpScreen.jsx
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── ProfileScreen.jsx
│   │   │   ├── SettingsScreen.jsx
│   │   │   ├── SignUpScreen.jsx
│   │   │   ├── TermsScreen.jsx
│   │   │   └── VerifyCodeScreen.jsx
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── styles/
│   │   │   ├── AllEnvironments.css
│   │   │   ├── BackButton.css
│   │   │   ├── ChangePassword.css
│   │   │   ├── Dashboard.css
│   │   │   ├── DashboardLayout.css
│   │   │   ├── EnvironmentCard.css
│   │   │   ├── Favorites.css
│   │   │   ├── FilterBar.css
│   │   │   ├── ForgotPassword.css
│   │   │   ├── GoogleSignUp.css
│   │   │   ├── Login.css
│   │   │   ├── Navbar.css
│   │   │   ├── Profile.css
│   │   │   ├── Settings.css
│   │   │   ├── SignUp.css
│   │   │   ├── Terms.css
│   │   │   └── VerifyCode.css
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
```

---

## 🛣️ Rutas de la Aplicación

| Ruta | Pantalla | Descripción |
|---|---|---|
| `/` | LoginScreen | Inicio de sesión |
| `/signup` | SignUpScreen | Registro de usuario |
| `/terms` | TermsScreen | Términos y condiciones |
| `/google-signup` | GoogleSignUpScreen | Registro con Google |
| `/forgot-password` | ForgotPasswordScreen | Recuperar contraseña |
| `/verify-code` | VerifyCodeScreen | Verificar código |
| `/change-password` | ChangePasswordScreen | Cambiar contraseña |
| `/dashboard` | DashboardScreen | Panel principal con ambientes |
| `/all-environments` | AllEnvironmentsScreen | Todos los ambientes |
| `/profile` | ProfileScreen | Perfil del usuario |
| `/favorites` | FavoritesScreen | Ambientes favoritos |
| `/settings` | SettingsScreen | Configuración |

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
http://localhost:5174
```

---

## 📦 Dependencias

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "react-icons": "^5.x"
}
```

---

## 🧩 Componentes Principales

### Common (Reutilizables)
| Componente | Descripción |
|---|---|
| `BackButton` | Botón de retroceso circular |
| `Button` | Botón genérico reutilizable |
| `Checkbox` | Checkbox con label |
| `Divider` | Separador con texto (OR) |
| `EnvironmentCard` | Tarjeta de ambiente con datos |
| `EnvironmentSummaryCard` | Tarjeta resumen de ambiente |
| `FilterBar` | Barra de filtros del dashboard |
| `Input` | Input genérico con label |
| `SocialLogin` | Botones de Facebook y Google |

### Forms (Formularios)
| Componente | Descripción |
|---|---|
| `LoginForm` | Formulario de inicio de sesión |
| `SignUpForm` | Formulario de registro |
| `ForgotPasswordForm` | Formulario de recuperación |
| `VerifyCodeForm` | Formulario de verificación |
| `ChangePasswordForm` | Formulario de cambio de contraseña |

### Layout (Estructuras)
| Componente | Descripción |
|---|---|
| `AuthLayout` | Layout para pantallas de autenticación |
| `DashboardLayout` | Layout para pantallas del dashboard |
| `Navbar` | Barra de navegación horizontal |

---

## 👥 Equipo

| Nombre | Rol |
|---|---|
| Keneth Santiago Rubiano Silva | Desarrollador Full Stack, Especialidad en Front-End |
| Jhon Jiaro Cortéz Vargas  | Desarrollador Full Stack,. Especialidad Back-End |
| Maria De Los Angeles Olaya Garcia | Desarrollador Full Stack,. Especialidad Docume tación |


---