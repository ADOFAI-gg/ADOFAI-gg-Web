import { sentrySvelteKit } from '@sentry/sveltekit'
import * as path from 'path'
import glob from 'vite-plugin-glob'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import preload from 'vite-plugin-preload'
import { partytownVite } from '@qwik.dev/partytown/utils'

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'adofaigg',
				project: 'forum-web',
				url: 'https://trace.afg.ink/',
				authToken: process.env.SENTRY_AUTH_TOKEN
			}
		}),
		glob(),
		sveltekit(),
		preload(),
		partytownVite({ dest: path.join(process.cwd(), 'build', 'client', '~partytown') })
	],
	build: {
		sourcemap: true
	}
})
