import { sentrySvelteKit } from '@sentry/sveltekit';
import * as path from 'path';
import glob from 'vite-plugin-glob';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import preload from 'vite-plugin-preload';
import { partytownVite } from '@builder.io/partytown/utils';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@atoms': path.resolve('./src/components/atoms'),
      '@molecules': path.resolve('./src/components/molecules'),
      '@organisms': path.resolve('./src/components/organisms'),
      '@templates': path.resolve('./src/components/templates')
    }
  },
  plugins: [
    sentrySvelteKit(),
    glob(),
    sveltekit(),
    preload(),
    partytownVite({
      dest: path.join(process.cwd(), 'static', '~partytown')
    }),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN
    })
  ],
  build: {
    sourcemap: true
  }
});
