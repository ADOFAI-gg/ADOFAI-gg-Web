<script lang="ts">
	import '$lib'
	import '@adofai-gg/ui/dist/stylesheets/globals.scss'
	import { IconProvider, Nav, Footer, setGlobalContext } from '@adofai-gg/ui'

	import type { Snippet } from 'svelte'
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'

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

<svelte:head>
	<title>{$page.data.pageTitle}</title>
</svelte:head>

<div class="layout">
	<Nav user={null} />

	<main class="content">
		{@render children()}
	</main>

	<Footer />
</div>

<IconProvider />

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		flex-grow: 1;
		margin-bottom: 64px;
	}
</style>
