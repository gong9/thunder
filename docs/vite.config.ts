import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path' 

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist'), // todo 不生效
  },
  plugins: [vueJsx()],
})
