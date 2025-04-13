import { preprocessMeltUI, sequence } from '@melt-ui/pp'
import nodeAdapter from '@sveltejs/adapter-node'
import { sveltePreprocess } from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import slug from 'rehype-slug'
import headings from 'rehype-autolink-headings'

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sequence([
		sveltePreprocess({
			postcss: true
		}),
		preprocessMeltUI(),
		mdsvex({
			extensions: ['.md', '.svx'],
			rehypePlugins: [slug, headings]
		})
	]),
	extensions: ['.svelte', '.md', '.svx'],
	kit: {
		adapter: nodeAdapter(),
		alias: {
			'~/*': './src/*'
		}
	}
}
export default config
