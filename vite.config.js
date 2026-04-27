import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isTunnel = process.env.VITE_TUNNEL === 'true'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    allowedHosts: ['vjimmes2003.uk'],
    proxy: {
      '/api': {
        target: 'http://localhost:5080',
        changeOrigin: true,
        secure: false
      }
    },
    hmr: isTunnel ? false : true // ← 🔥 la clave
  }
})
