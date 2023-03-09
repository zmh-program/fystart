import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import service from './plugins/service'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    service(),
  ],
  build: {
    manifest: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
