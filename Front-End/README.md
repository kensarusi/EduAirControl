# EduAirControl – Front-End

## Instalación

```bash
npm install
npm run dev
```

## Estructura del proyecto

```
src/
├── assets/                      # Imágenes y recursos estáticos
│
├── constants/
│   └── environments.js          # STATUS, QUALITY, colores, rangos ideales
│
├── hooks/
│   ├── useDarkMode.js           # Toggle dark mode + persistencia localStorage
│   └── useFavorites.js          # Gestión de favoritos + persistencia localStorage
│
├── i18n/
│   ├── en.json                  # Traducciones en inglés
│   ├── es.json                  # Traducciones en español
│   └── i18n.js                  # Configuración de i18next
│
├── components/
│   ├── ui/                      # Componentes genéricos reutilizables
│   │   ├── index.js             # Barrel export (import { Button, Input } from '../ui')
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Divider.jsx
│   │   ├── Checkbox.jsx
│   │   ├── BackButton.jsx
│   │   └── EditModal.jsx
│   │
│   ├── environment/             # Componentes del dominio de ambientes
│   │   ├── index.js             # Barrel export
│   │   ├── EnvironmentCard.jsx
│   │   ├── EnvironmentSummaryCard.jsx
│   │   ├── EnvironmentFilters.jsx
│   │   └── FilterBar.jsx
│   │
│   ├── forms/                   # Formularios y componentes de autenticación
│   │   ├── LoginForm.jsx
│   │   ├── SignUpForm.jsx
│   │   ├── ForgotPasswordForm.jsx
│   │   ├── VerifyCodeForm.jsx
│   │   ├── ChangePasswordForm.jsx
│   │   └── SocialLogin.jsx
│   │
│   └── layout/                  # Estructuras de página
│       ├── AuthLayout.jsx
│       ├── DashboardLayout.jsx
│       └── Navbar.jsx
│
├── screens/
│   ├── auth/                    # Flujo de autenticación (no requiere sesión)
│   │   ├── LoginScreen.jsx
│   │   ├── SignUpScreen.jsx
│   │   ├── ForgotPasswordScreen.jsx
│   │   ├── VerifyCodeScreen.jsx
│   │   ├── ChangePasswordScreen.jsx
│   │   ├── GoogleSignUpScreen.jsx
│   │   └── TermsScreen.jsx
│   │
│   └── app/                     # Pantallas principales (requieren sesión)
│       ├── DashboardScreen.jsx
│       ├── AllEnvironmentsScreen.jsx
│       ├── FavoritesScreen.jsx
│       ├── ProfileScreen.jsx
│       └── SettingsScreen.jsx
│
└── styles/
    ├── auth/                    # Estilos del flujo de autenticación
    ├── app/                     # Estilos de pantallas principales
    ├── layout/                  # Estilos de Navbar y layouts
    └── components/              # Estilos de componentes reutilizables
```

## Cambios respecto a la versión anterior

- `components/common/` dividida en `ui/`, `environment/` y `forms/` según responsabilidad
- `screens/` dividida en `auth/` y `app/` para separar flujos
- `styles/` organizada en subcarpetas por contexto
- Lógica de `getStatusColor` / `getQualityColor` centralizada en `constants/environments.js`
- Hook `useDarkMode` extrae la lógica repetida de localStorage
- Hook `useFavorites` extrae la lógica de favoritos del DashboardScreen
- Barrel exports en `components/ui/index.js` y `components/environment/index.js`
- `VerifyCodeForm` duplicado en `common/` eliminado (se usa el de `forms/`)
