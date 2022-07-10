import * as path from 'path';
import glob from 'vite-plugin-glob';
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  plugins: [glob(), sveltekit()]
};
