import * as path from 'path';
import glob from 'vite-plugin-glob';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  plugins: [glob(), sveltekit()]
});
