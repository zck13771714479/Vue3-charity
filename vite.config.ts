import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { CSSOptions } from 'vite';
import { Options as LessOptions } from 'less';
import {resolve} from 'path'

function getDir(dir: string): string {
  return resolve(__dirname, './', dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': getDir('src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        options: {} as LessOptions
      }
    }
  }
})
// vite.config.ts



