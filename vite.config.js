import { sentrySvelteKit } from '@sentry/sveltekit'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, loadEnv } from 'vite'
import preload from 'vite-plugin-preload'
import { execSync } from 'child_process'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const apiProxyTarget = env.API_PROXY_TARGET ?? env.INTERNAL_API_BASE

	return {
		plugins: [
			sentrySvelteKit({
				sourceMapsUploadOptions: {
					org: 'adofaigg',
					project: 'forum-web',
					url: 'https://trace.afg.ink/'
				},
				debug: true
			}),
			tailwindcss(),
			sveltekit(),
			preload()
		],
		server: apiProxyTarget
			? {
					proxy: {
						'/forum': {
							target: apiProxyTarget,
							changeOrigin: true
						},
						'/auth': {
							target: apiProxyTarget,
							changeOrigin: true
						}
					}
				}
			: undefined,
		ssr: {
			noExternal: ['@adofai-gg/ui', '@nubolab-ffwd/svelte-fluent']
		},
		optimizeDeps: {
			noDiscovery: true,
			exclude: ['@adofai-gg/ui', '@nubolab-ffwd/svelte-fluent']
		},
		build: {
			sourcemap: true
		}
	}
})

const commitDate = new Date(execSync('git log -1 --format=%cd --date=iso').toString().trim())
process.env.VITE_COMMIT_DATE = `${commitDate.getFullYear()}. ${commitDate.getMonth() + 1}. ${commitDate.getDate()}.`
process.env.VITE_COMMIT_HASH = execSync('git rev-parse --short HEAD').toString().trim()
