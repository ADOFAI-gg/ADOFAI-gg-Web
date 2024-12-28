<script lang="ts">
	import '$lib'

	import '@adofai-gg/ui/globals.scss'

	import '@fontsource/ibm-plex-sans-kr/300.css'
	import '@fontsource/ibm-plex-sans-kr/400.css'
	import '@fontsource/ibm-plex-sans-kr/500.css'
	import '@fontsource/ibm-plex-sans-kr/600.css'
	import '@fontsource/ibm-plex-sans-kr/700.css'

	import { IconProvider, Nav, Footer, setGlobalContext } from '@adofai-gg/ui'
	import { env } from '$env/dynamic/public'

	import type { Snippet } from 'svelte'
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { browser } from '$app/environment'

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
			signIn: `${env.PUBLIC_ACCOUNT_SERVICE_URL}/auth/signin`, // TODO
			signUp: `${env.PUBLIC_ACCOUNT_SERVICE_URL}/auth/signup`
		}
	})

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	})
</script>

<svelte:head>
	<title>{$page.data.pageTitle}</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="layout">
		<Nav user={null} />

		<main class="content">
			{@render children()}
		</main>

		<Footer />
	</div>

	<IconProvider />
</QueryClientProvider>

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
