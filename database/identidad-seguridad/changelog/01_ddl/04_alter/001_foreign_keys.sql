ALTER TABLE seguridad.credencial
    ADD CONSTRAINT fk_credencial_usuario
    FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario (id_usuario) ON DELETE CASCADE;

ALTER TABLE seguridad.usuario_rol
    ADD CONSTRAINT fk_usuario_rol_usuario
    FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario (id_usuario) ON DELETE CASCADE,
    ADD CONSTRAINT fk_usuario_rol_rol
    FOREIGN KEY (rol_id) REFERENCES seguridad.rol (id_rol) ON DELETE RESTRICT;

ALTER TABLE seguridad.rol_permiso
    ADD CONSTRAINT fk_rol_permiso_rol
    FOREIGN KEY (rol_id) REFERENCES seguridad.rol (id_rol) ON DELETE CASCADE,
    ADD CONSTRAINT fk_rol_permiso_permiso
    FOREIGN KEY (permiso_id) REFERENCES seguridad.permiso (id_permiso) ON DELETE RESTRICT;

ALTER TABLE seguridad.token_sesion
    ADD CONSTRAINT fk_token_sesion_usuario
    FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario (id_usuario) ON DELETE CASCADE;

ALTER TABLE seguridad.verificacion_2fa
    ADD CONSTRAINT fk_verificacion_2fa_usuario
    FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario (id_usuario) ON DELETE CASCADE;

ALTER TABLE seguridad.recuperacion_password
    ADD CONSTRAINT fk_recuperacion_password_usuario
    FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario (id_usuario) ON DELETE CASCADE;

ALTER TABLE seguridad.auditoria_evento
    ADD CONSTRAINT fk_auditoria_evento_usuario
    FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario (id_usuario) ON DELETE SET NULL;
