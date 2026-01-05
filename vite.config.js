import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Cette option aide à contourner certains blocages de sécurité sur Mac/Ecoles
    hmr: {
      overlay: false 
    }
  },
  build: {
    // Désactive les sourcemaps pour éviter les fonctions JS interdites par la CSP
    sourcemap: false
  },
  // Force Vite à ne pas utiliser eval pour le debug des styles
  css: {
    devSourcemap: false
  }
})