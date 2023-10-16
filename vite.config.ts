import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from "vite-plugin-pwa";
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: [fileURLToPath(new URL('./src', import.meta.url)) + '/**/*.vue'],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: ['favicon.ico', 'icon.png', 'background.webp'],
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
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,webp,png}'],
        globDirectory: 'dist',
        runtimeCaching: [{
          urlPattern: new RegExp('^https://open.lightxi.com/'),
          handler: "CacheFirst",
          options: {
            cacheName: "lightxi-cdn",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            }
          }
        }],
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
