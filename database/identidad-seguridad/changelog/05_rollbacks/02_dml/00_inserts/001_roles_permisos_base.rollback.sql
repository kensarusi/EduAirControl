DELETE FROM seguridad.rol_permiso
WHERE rol_id IN (
    SELECT id_rol FROM seguridad.rol WHERE nombre_rol IN ('ADMIN', 'USUARIO')
)
AND permiso_id IN (
    SELECT id_permiso FROM seguridad.permiso
    WHERE nombre_permiso IN (
        'USUARIO_LEER', 'USUARIO_GESTIONAR', 'ROL_GESTIONAR',
        'AUDITORIA_LEER', 'AMBIENTE_LEER', 'AMBIENTE_GESTIONAR'
    )
);

DELETE FROM seguridad.permiso
WHERE nombre_permiso IN (
    'USUARIO_LEER', 'USUARIO_GESTIONAR', 'ROL_GESTIONAR',
    'AUDITORIA_LEER', 'AMBIENTE_LEER', 'AMBIENTE_GESTIONAR'
);

DELETE FROM seguridad.rol WHERE nombre_rol IN ('ADMIN', 'USUARIO');
