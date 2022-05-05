import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import * as path from 'path';
import svg from '@poppanator/sveltekit-svg';
import glob from 'vite-plugin-glob';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          '@': path.resolve('./src')
        }
      },
      plugins: [svg(), glob()]
    }
  }
};

export default config;
