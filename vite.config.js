// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/splash/',
  }

  if (command !== 'serve') {
    config.base = '/game-of-thrones-houses-catalogue/splash'
  }

  return config
})