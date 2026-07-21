# EduAirControl

EduAirControl es una plataforma web para monitoreo ambiental en espacios educativos. Permite visualizar ambientes, revisar ranking de calidad, gestionar aulas, marcar favoritos, consultar notificaciones y administrar ajustes de usuario.

El proyecto esta dividido en frontend React/Vite y backend Spring Boot con PostgreSQL.

## Stack

### Frontend

- React 19
- Vite 8
- React Router DOM 7
- i18next + react-i18next
- React Icons y Lucide React
- React Hook Form + Zod
- CSS modular por pantalla/componente

### Backend

- Java 17
- Spring Boot 4
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT
- OAuth2 Google
- OpenAPI / Swagger

### Infraestructura

- Docker Compose
- Nginx para servir el frontend en contenedor
- Jenkins opcional para CI/CD local

## Estructura

```text
EduAirControl/
|-- README.md
|-- Web/
|   |-- Front-End/
|   |   |-- src/
|   |   |   |-- App.jsx
|   |   |   |-- main.jsx
|   |   |   |-- context/
|   |   |   |-- modules/
|   |   |   |   |-- auth/
|   |   |   |   |-- dashboard/
|   |   |   |   |-- environment/
|   |   |   |   |-- favorites/
|   |   |   |   |-- landing/
|   |   |   |   |-- notifications/
|   |   |   |   |-- profile/
|   |   |   |   |-- ranking/
|   |   |   |   `-- settings/
|   |   |   |-- shared/
|   |   |   `-- viewmodels/
|   |   |-- package.json
|   |   |-- vite.config.js
|   |   `-- Dockerfile
|   |-- backend/
|   |   |-- src/main/java/com/eduaircontrol/backend/
|   |   |   |-- application/
|   |   |   |-- config/
|   |   |   |-- core/
|   |   |   `-- security/
|   |   |-- src/main/resources/application.properties
|   |   |-- pom.xml
|   |   `-- Dockerfile
|   |-- Docs/
|   `-- docker-compose.yml
|-- jenkins/
`-- Jenkinsfile
```

## Rutas principales

| Ruta | Vista |
| --- | --- |
| `/` | Redirecciona a `/landing` |
| `/landing` | Landing page |
| `/login` | Inicio de sesion |
| `/signup` | Registro |
| `/forgot-password` | Recuperar contrasena |
| `/verify-code` | Verificar codigo |
| `/change-password` | Cambiar contrasena |
| `/terms` | Terminos y condiciones |
| `/oauth2/success` | Callback de OAuth2 |
| `/dashboard` | Redirecciona a `/all-environments` |
| `/all-environments` | Ambientes |
| `/all-environments?environment=:id` | Ambientes con modal abierto |
| `/ranking` | Ranking ambiental |
| `/environment/:id` | Detalle completo de ambiente |
| `/favorites` | Favoritos |
| `/management` | Gestion de ambientes |
| `/profile` | Perfil |
| `/settings` | Configuracion |

## Ejecucion local

### Frontend

```bash
cd Web/Front-End
npm install
npm run dev
```

Por defecto Vite queda en:

```text
http://localhost:5173
```

Scripts disponibles:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

El backend usa PostgreSQL. La configuracion por defecto espera una base de datos disponible en `postgres:5432`, pensada para Docker Compose.

Para correrlo localmente sin Docker, ajusta `spring.datasource.url` o define variables de entorno equivalentes.

```bash
cd Web/backend
./mvnw spring-boot:run
```

En Windows:

```bash
cd Web/backend
mvnw.cmd spring-boot:run
```

Backend por defecto:

```text
http://localhost:8080
```

Swagger/OpenAPI, si esta habilitado por Springdoc:

```text
http://localhost:8080/swagger-ui.html
```

## Docker Compose

Desde `Web/`:

```bash
docker compose up --build
```

Servicios principales:

| Servicio | Puerto |
| --- | --- |
| Frontend | `3000` |
| Backend | `8080` |
| PostgreSQL | `5432` |
| Jenkins | `8081` |

Frontend en Docker:

```text
http://localhost:3000
```

Backend en Docker:

```text
http://localhost:8080
```

## Variables de entorno

Docker Compose define valores por defecto, pero estas variables se pueden configurar:

| Variable | Uso |
| --- | --- |
| `JWT_SECRET` | Firma de tokens JWT |
| `JWT_EXPIRATION` | Duracion del token |
| `GOOGLE_CLIENT_ID` | OAuth2 Google |
| `GOOGLE_CLIENT_SECRET` | OAuth2 Google |
| `FRONTEND_OAUTH2_SUCCESS_URL` | URL de retorno tras login OAuth2 |
| `CORS_ALLOWED_ORIGINS` | Origenes permitidos por CORS |

Ejemplo:

```bash
JWT_SECRET=una_clave_segura_de_mas_de_32_caracteres
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FRONTEND_OAUTH2_SUCCESS_URL=http://localhost:5173/oauth2/success
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Funcionalidades actuales

- Landing responsive con navegacion por secciones.
- Autenticacion con login, registro, recuperacion y cambio de contrasena.
- Flujo OAuth2 con Google.
- Listado de ambientes con filtros.
- Modal de ambiente desde tarjetas y desde ranking.
- Detalle completo de ambiente.
- Ranking de ambientes por indice ambiental.
- Gestion de ambientes: agregar, editar y eliminar.
- Favoritos compartidos entre ambientes, detalle y favoritos.
- Panel de notificaciones.
- Perfil y configuracion.
- Soporte multiidioma mediante i18n.
- Tema oscuro y tokens visuales compartidos.

## Calidad y verificacion

Comandos recomendados antes de entregar cambios:

```bash
cd Web/Front-End
npm run build
npm run lint
```

Para backend:

```bash
cd Web/backend
mvnw.cmd test
```

## Notas de desarrollo

- El estado de ambientes y favoritos se centraliza en `EnvironmentContext`.
- Las pantallas principales estan organizadas por dominio dentro de `src/modules`.
- La ruta inicial de usuario es `/landing`.
- La navbar interna usa `/all-environments`, `/ranking`, `/favorites`, `/management`, `/profile` y `/settings`.
- El boton "Ver ambiente" en ranking abre el modal en `/all-environments?environment=:id`.
