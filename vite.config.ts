import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change `base` to match your GitHub repository name when you deploy, e.g.
// "/my-portfolio/". Keep it as "/" if you deploy to a custom domain or a
// "<username>.github.io" root repository.
export default defineConfig({
  plugins: [react()],
  base: '/devportfolio/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
