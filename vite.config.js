import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    {
      name: 'jsx-in-js',
      enforce: 'pre',
      async transform(code, id) {
        if (id.endsWith('.js') && id.includes('/src/')) {
          return transformWithEsbuild(code, id, { loader: 'jsx' })
        }
      },
    },
    react(),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
