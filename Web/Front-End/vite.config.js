import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import moduleFederationConfig from './module-federation.config.js'

export default defineConfig({
  plugins: [react(), federation(moduleFederationConfig)],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
