import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  //config do proxy para evitar erros relacionados ao CORSs
  server: {
    proxy: {
      '/metapi': {
        target: 'https://collectionapi.metmuseum.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/metapi/, ''),
        //tempo maximo para conexao com a API
        proxyTimeout: 120000,
      },
    }
  }
})
