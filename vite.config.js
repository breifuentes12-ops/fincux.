import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuración de Vite: le decimos que vamos a usar Vue
export default defineConfig({
  plugins: [vue()],
  base: './' // rutas relativas, para que funcione en GitHub Pages (que publica en /fincux./)
})
