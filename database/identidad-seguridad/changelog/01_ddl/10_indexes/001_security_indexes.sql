CREATE INDEX idx_credencial_usuario_id ON seguridad.credencial (usuario_id);
CREATE INDEX idx_usuario_rol_rol_id ON seguridad.usuario_rol (rol_id);
CREATE INDEX idx_rol_permiso_permiso_id ON seguridad.rol_permiso (permiso_id);
CREATE INDEX idx_token_sesion_usuario_estado ON seguridad.token_sesion (usuario_id, estado);
CREATE INDEX idx_token_sesion_expiracion ON seguridad.token_sesion (fecha_expiracion);
CREATE INDEX idx_verificacion_2fa_usuario_estado ON seguridad.verificacion_2fa (usuario_id, estado);
CREATE INDEX idx_recuperacion_password_usuario_estado ON seguridad.recuperacion_password (usuario_id, estado);
CREATE INDEX idx_auditoria_evento_usuario_fecha ON seguridad.auditoria_evento (usuario_id, fecha_evento DESC);
CREATE INDEX idx_auditoria_evento_modulo_fecha ON seguridad.auditoria_evento (modulo, fecha_evento DESC);
