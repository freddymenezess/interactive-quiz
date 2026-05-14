import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    allowedHosts: ['https://oi8cit-ip-15-204-225-138.tunnelmole.net'],
    port: 5173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@admin': fileURLToPath(
        new URL('./src/components/admin', import.meta.url)
      ),
      '@quiz': fileURLToPath(new URL('./src/components/quiz', import.meta.url)),
      '@ranking': fileURLToPath(
        new URL('./src/components/ranking', import.meta.url)
      ),
      '@context': fileURLToPath(new URL('./src/context', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@reducers': fileURLToPath(new URL('./src/reducers', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@avatars': fileURLToPath(
        new URL('./src/assets/avatars', import.meta.url)
      ),
    },
  },
});
