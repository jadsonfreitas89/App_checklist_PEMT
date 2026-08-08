import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { webcrypto as nodeCrypto } from 'crypto';

if (!globalThis.crypto) {
  (globalThis as any).crypto = nodeCrypto;
}

if (typeof global !== 'undefined' && !(global as any).crypto) {
  (global as any).crypto = nodeCrypto;
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PEMT',
        short_name: 'PEMT',
        description: 'Sistema de inspeção de PEMT responsivo e instalável como PWA.',
        theme_color: '#0F172A',
        background_color: '#F8FAFC',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 4173
  }
});
