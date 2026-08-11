INSERT INTO seguridad.rol (nombre_rol, descripcion) VALUES
    ('ADMIN', 'Administración completa del sistema'),
    ('USUARIO', 'Usuario estándar de la plataforma')
ON CONFLICT (nombre_rol) DO NOTHING;

INSERT INTO seguridad.permiso (nombre_permiso, descripcion, modulo) VALUES
    ('USUARIO_LEER', 'Consultar usuarios', 'USUARIOS'),
    ('USUARIO_GESTIONAR', 'Crear, actualizar o bloquear usuarios', 'USUARIOS'),
    ('ROL_GESTIONAR', 'Administrar roles y permisos', 'SEGURIDAD'),
    ('AUDITORIA_LEER', 'Consultar eventos de auditoría', 'SEGURIDAD'),
    ('AMBIENTE_LEER', 'Consultar ambientes y mediciones', 'AMBIENTES'),
    ('AMBIENTE_GESTIONAR', 'Administrar aulas, sensores y variables', 'AMBIENTES')
ON CONFLICT (nombre_permiso) DO NOTHING;

INSERT INTO seguridad.rol_permiso (rol_id, permiso_id)
SELECT r.id_rol, p.id_permiso
FROM seguridad.rol r
CROSS JOIN seguridad.permiso p
WHERE r.nombre_rol = 'ADMIN'
ON CONFLICT (rol_id, permiso_id) DO NOTHING;

INSERT INTO seguridad.rol_permiso (rol_id, permiso_id)
SELECT r.id_rol, p.id_permiso
FROM seguridad.rol r
JOIN seguridad.permiso p ON p.nombre_permiso = 'AMBIENTE_LEER'
WHERE r.nombre_rol = 'USUARIO'
ON CONFLICT (rol_id, permiso_id) DO NOTHING;
