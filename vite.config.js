// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
<<<<<<< Updated upstream
    base: '/splash',
  }

  if (command !== 'serve') {
    config.base = '/game-of-thrones-houses-catalogue/splash'
  }

  return config
})
=======
    base: './',
    build: {
      target: 'modules',
      define: {
        'process.env': {},
      },
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
      cssCodeSplit: true,

    },
    appType: "spa"
  }

  if (command !== 'serve') {
    config.base = '/game-of-thrones-houses-catalogue'
  }

  return config
})
>>>>>>> Stashed changes
