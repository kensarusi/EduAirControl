/**
 * Contrato de federación del shell de EduAirControl.
 *
 * Esta primera fase no registra remotos todavía: evita cambiar rutas o pantallas
 * existentes mientras se prepara el contrato que deberán respetar los dominios
 * extraídos posteriormente.
 */
export default {
  name: 'eduaircontrol_shell',
  manifest: true,
  // El proyecto aún es JavaScript; los tipos se habilitarán al incorporar TypeScript.
  dts: false,
  remotes: {},
  shared: {
    react: { singleton: true, requiredVersion: '19.2.0' },
    'react-dom': { singleton: true, requiredVersion: '19.2.0' },
    // Incluye react-dom/client; es esencial para que React no se cargue dos veces.
    'react-dom/': { singleton: true, requiredVersion: '19.2.0' },
    'react-router-dom': { singleton: true, requiredVersion: '7.13.1' },
  },
};
