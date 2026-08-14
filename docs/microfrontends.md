# Micro-frontends de EduAirControl

## Decisión

El frontend se mantiene como una aplicación React/Vite mientras se establece
Module Federation como mecanismo de composición en tiempo de ejecución. No se
extraen módulos hasta que la base compile de forma estable y exista un contrato
de integración verificable.

La primera extracción propuesta es **environment**. El dominio ya concentra las
rutas `/all-environments`, `/environment/:id` y `/management`, sus componentes,
utilidades y datos. El shell conservará la sesión, navegación común, tema,
accesibilidad e internacionalización.

## Límites de dominio

| Componente | Propietario | Rutas públicas |
| --- | --- | --- |
| Shell | plataforma | `/`, `/landing`, navegación global y sesión |
| auth | identidad | `/login`, `/signup`, recuperación y OAuth |
| environment | gestión ambiental | `/all-environments`, `/environment/:id`, `/management` |
| ranking | analítica | `/ranking` |

`favorites`, `profile` y `settings` permanecen en el shell hasta que tengan
despliegue y equipo propietario independientes.

## Contratos

- El shell es dueño de las rutas de primer nivel y carga remotos por prefijo.
- Cada remoto expone una única entrada de rutas y no importa internals de otro
  remoto.
- React, React DOM y React Router se negocian como dependencias singleton con
  versiones compatibles. No se activa `eager`, para no inflar el bundle inicial.
- La comunicación entre dominios usa propiedades, callbacks o eventos DOM con
  nombres `eduaircontrol:<dominio>:<evento>` y payload documentado. No se
  comparte un store global.
- Los cambios incompatibles en entradas remotas requieren una nueva entrada o
  una versión mayor del contrato; los remotos deben mantener compatibilidad con
  el shell desplegado anteriormente.

## Despliegue y calidad

Cada remoto publicará un manifiesto con versión inmutable. El shell deberá
resolver la URL del manifiesto por ambiente, registrar telemetría de carga y
mostrar un fallback aislado si un remoto no está disponible.

La incorporación de un remoto exige: build y lint del remoto, pruebas unitarias
de su dominio, prueba de contrato contra el shell y flujo E2E de sus rutas. La
CI solo debe construir/probar los dominios afectados cuando se adopte un
workspace con grafo de dependencias.

## Próximo cambio funcional

Crear `apps/environment` como remoto Vite, exponer su entrada de rutas y cargar
ese remoto desde el shell bajo `/environment/*`. Se conservarán temporalmente
las rutas actuales mediante redirecciones para no romper enlaces existentes.
