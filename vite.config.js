import { sentrySvelteKit } from '@sentry/sveltekit'
import * as path from 'path'
import glob from 'vite-plugin-glob'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import preload from 'vite-plugin-preload'
import { partytownVite } from '@qwik.dev/partytown/utils'
import { execSync } from 'child_process'

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'adofaigg',
				project: 'forum-web',
				url: 'https://trace.afg.ink/'
			},
			debug: true
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

const commitDate = new Date(execSync('git log -1 --format=%cd --date=iso').toString().trim())
process.env.VITE_COMMIT_DATE = `${commitDate.getFullYear()}. ${commitDate.getMonth() + 1}. ${commitDate.getDate()}.`
process.env.VITE_COMMIT_HASH = execSync('git rev-parse --short HEAD').toString().trim()
