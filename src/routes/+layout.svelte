<script lang="ts">
	import '@adofai-gg/ui/dist/stylesheets/globals.scss'
	import { IconProvider, Nav, setGlobalContext } from '@adofai-gg/ui'

	import type { Snippet } from 'svelte'
	import { writable } from 'svelte/store'

	interface Props {
		children: Snippet
	}

	const { children }: Props = $props()

	const language = writable('ko')

	setGlobalContext({
		language,
		links: [
			{
				href: '/levels',
				key: 'nav:levels'
			},
			{ href: '/lb', key: 'nav:rankings' },
			{
				href: '/references',
				key: 'nav:references'
			}
		],
		setLanguage: (lang) => {
			language.set(lang)
		},
		urls: {
			main: '/',
			signIn: '', // TODO
			signUp: ''
		}
	})
</script>

<Nav user={null} />

{@render children()}
<IconProvider />
