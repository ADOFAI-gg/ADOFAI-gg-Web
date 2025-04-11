<script lang="ts">
	import '$lib'

	import '@adofai-gg/ui/globals.scss'

	import '@fontsource/ibm-plex-sans-kr/300.css'
	import '@fontsource/ibm-plex-sans-kr/400.css'
	import '@fontsource/ibm-plex-sans-kr/500.css'
	import '@fontsource/ibm-plex-sans-kr/600.css'
	import '@fontsource/ibm-plex-sans-kr/700.css'

	import '@fontsource/ibm-plex-sans-jp/300.css'
	import '@fontsource/ibm-plex-sans-jp/400.css'
	import '@fontsource/ibm-plex-sans-jp/500.css'
	import '@fontsource/ibm-plex-sans-jp/600.css'
	import '@fontsource/ibm-plex-sans-jp/700.css'

	import '../stylesheets/docs.scss'

	import {
		IconProvider,
		Nav,
		Footer,
		setGlobalContext,
		type User,
		NavMenuGroup,
		NavMenuItem,
		Translation,
		NavLanguageSwitcher,
		Button,
		Toaster
	} from '@adofai-gg/ui'
	import { env } from '$env/dynamic/public'

	import type { Snippet } from 'svelte'
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { browser } from '$app/environment'
	import type { LayoutData } from './$types'
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import Cookies from 'js-cookie'

	interface Props {
		children: Snippet
		data: LayoutData
	}

	const { children, data }: Props = $props()

	const language = writable(data.lang)

	const setRedirect = () => {
		Cookies.set('redirectTo', window.location.href, {
			domain: env.PUBLIC_COOKIE_DOMAIN,
			path: '/',
			secure: true
		})
	}

	setGlobalContext({
		language,
		links: [
			{
				href: '/levels',
				key: 'common:levels'
			},
			{
				href: '/references',
				key: 'common:references'
			}
		],
		setLanguage: (lang) => {
			language.set(lang)
			fetch('/api/set-lang', {
				method: 'POST',
				body: JSON.stringify({ lang })
			})
			Cookies.set('adofaigg.lang', lang, {
				domain: env.PUBLIC_COOKIE_DOMAIN,
				expires: 60 * 60 * 24 * 365,
				path: '/',
				secure: true,
				sameSite: 'Lax'
			})
		},
		urls: {
			main: '/'
		},
		callbacks: {
			signIn: () => {
				setRedirect()
				window.location.href = `${env.PUBLIC_ACCOUNT_SERVICE_URL}/auth/signin`
			},
			signUp: () => {
				setRedirect()
				window.location.href = `${env.PUBLIC_ACCOUNT_SERVICE_URL}/auth/signup`
			}
		}
	})

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	})

	let user: User | null = $derived.by(() => {
		if (!data.currentUser) return null

		return {
			displayName: data.currentUser.displayName,
			avatarURL: getAvatarUrl(data.currentUser.authUserId, data.currentUser.avatar, null, 64),
			isAdmin: false
		} as User
	})

	const onLogout = () => {
		setRedirect()

		window.location.href = `${env.PUBLIC_ACCOUNT_SERVICE_URL}/auth/signout`
	}
</script>

<svelte:head>
	<title>{$page.data.pageTitle}</title>
</svelte:head>

<Toaster />

<QueryClientProvider client={queryClient}>
	<div class="layout">
		<div class="nav-position-fixer">
			<Nav {user}>
				{#snippet menu()}
					<!-- <MenuItem variant="danger" onclick={onLogout}>
						<Translation key="ui-common:sign-out" />
					</MenuItem> -->
					<NavMenuGroup id="default">
						<NavMenuItem switchGroup="language">
							<Translation key="ui-common:language" />
						</NavMenuItem>

						{#if user}
							<NavMenuItem
								link
								href={env.PUBLIC_ACCOUNT_SERVICE_URL + '/settings/account'}
								target="_blank"
							>
								<Translation key="common:account-settings" />
							</NavMenuItem>
							<NavMenuItem onclick={() => onLogout()} type="danger">
								<Translation key="ui-common:sign-out" />
							</NavMenuItem>
						{/if}
					</NavMenuGroup>

					<NavMenuGroup id="language">
						<NavLanguageSwitcher />
					</NavMenuGroup>
				{/snippet}

				{#snippet rightSlot()}
					{#if user}
						<div class="right-actions-area">
							<Button size="md" variant="outlined" link href="/levels/create">
								<Translation key="common:upload-level" />
							</Button>
						</div>
					{/if}
				{/snippet}
			</Nav>
		</div>
		<main class="content">
			{@render children()}
		</main>

		<Footer />
	</div>
</QueryClientProvider>

<IconProvider />

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		width: fit-content;

		:global(.footer) {
			position: sticky;
			left: 0;
			width: var(--client-width);
		}
	}

	.nav-position-fixer {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 9999;
		width: var(--client-width);

		/* :global(.nav-container) {
			position: static;
		} */
	}

	.content {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		min-height: calc(100vh - 56px);
		margin-bottom: 64px;
	}

	.right-actions-area {
		margin-right: 12px;
	}
</style>
