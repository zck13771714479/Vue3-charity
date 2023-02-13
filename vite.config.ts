import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { CSSOptions } from 'vite';
import { Options as LessOptions } from 'less';
import { resolve } from 'path'
import commonjs from 'vite-plugin-commonjs'

function getDir(dir: string): string {
  return resolve(__dirname, './', dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  root:'./',
  base:'./',
  plugins: [vue(), commonjs()],
  resolve: {
    alias: {
      '@': './src'
    },
    extensions:['.js','.ts','.vue','.json']
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



