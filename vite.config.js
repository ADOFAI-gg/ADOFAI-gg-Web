import * as path from 'path'
import glob from 'vite-plugin-glob'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import preload from 'vite-plugin-preload'
import { partytownVite } from '@qwik.dev/partytown/utils'

export default defineConfig({
	plugins: [glob(), sveltekit(), preload(), partytownVite({})],
	build: {
		sourcemap: true
	}
})
