import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),
    vueJsx(),
  ],

  server: {
    proxy: {
      '/api-shop': {
        target: ' http://lifestealer86.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-shop/, '/public/api-shop'),
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})