import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import * as path from 'path';
import glob from 'vite-plugin-glob';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: process.env.VERCEL ? vercelAdapter() : nodeAdapter(),
    vite: {
      resolve: {
        alias: {
          '@': path.resolve('./src')
        }
      },
      plugins: [glob()]
    }
  }
};

export default config;
