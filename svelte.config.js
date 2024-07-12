import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    }),
    mdsvex({
      extensions: ['.md', '.svx']
    })
  ],

  extensions: ['.svelte', '.md', '.svx'],

  kit: {
    adapter: process.env.VERCEL ? vercelAdapter() : nodeAdapter(),

    alias: {
      '@/*': './src/*',
      '@atoms/*': './src/components/atoms/*',
      '@molecules/*': './src/components/molecules/*',
      '@organisms/*': './src/components/organisms/*',
      '@templates/*': './src/components/templates/*'
    },
    version: {
      name: process.env.IS_RELEASE
        ? process.env.npm_package_version
        : process.env.npm_package_version + '-dev'
    }
  }
};

export default config;
