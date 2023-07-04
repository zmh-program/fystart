import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: ['favicon.ico', 'icon.png', '*.webp'],
      manifest: {
        name: 'Fystart',
        short_name: 'Fystart',
        theme_color: '#1E1E1EFF',
        icons: [{
            src: 'icon.png',
            sizes: '192x192',
            type: 'image/png',
          }],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png}'],
        globDirectory: 'dist',
        swDest: 'dist/service.js',
      },
      devOptions: {
        enabled: true,
      }
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
