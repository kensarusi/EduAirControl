# Dominio de Identidad y Seguridad

Este módulo versiona el dominio de seguridad de EduAirControl con Liquibase y PostgreSQL.

Incluye diez tablas del esquema `seguridad`:

- Identidad y autorización: `usuario`, `credencial`, `rol`, `permiso`, `usuario_rol`, `rol_permiso`.
- Autenticación: `token_sesion`, `verificacion_2fa`, `recuperacion_password`.
- Auditoría: `auditoria_evento`.

Las tablas se crean sin llaves foráneas; las relaciones se agregan posteriormente en `01_ddl/04_alter`, tal como indica la guía del proyecto. Los valores de estado se validan con `CHECK` en lugar de `ENUM` para permitir su evolución.

## Aplicación local

Desde esta carpeta, con PostgreSQL disponible en el host:

```powershell
liquibase --defaultsFile=liquibase.properties update
```

Para revisar el plan sin hacer cambios:

```powershell
liquibase --defaultsFile=liquibase.properties updateSQL
```
