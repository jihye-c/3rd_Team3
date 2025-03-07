import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/recipeAPI': {
        target: 'http://openapi.foodsafetykorea.go.kr/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/recipeAPI/, ''),
      },
    },
  },
});
