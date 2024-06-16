import { sentrySvelteKit } from '@sentry/sveltekit';
import * as path from 'path';
import glob from 'vite-plugin-glob';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import preload from 'vite-plugin-preload';
import { partytownVite } from '@builder.io/partytown/utils';

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
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        url: process.env.SENTRY_URL,
        cleanArtifacts: true,
        setCommits: {
          auto: true
        }
      }
    }),
    glob(),
    sveltekit(),
    preload(),
    partytownVite({
      dest: path.join(process.cwd(), 'static', '~partytown')
    })
  ],
  build: {
    sourcemap: true
  },
  server: {
    proxy: {
      '/api': 'https://adofai.gg'
    }
  }
});
