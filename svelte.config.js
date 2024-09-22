import nodeAdapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: nodeAdapter(),

		alias: {
			'~/*': './src/*'
		}
	}
}

export default config
