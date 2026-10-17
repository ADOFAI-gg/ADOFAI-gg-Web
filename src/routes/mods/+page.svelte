<script lang="ts">
	import {
		Container,
		SearchBar,
		SearchOptionsBar,
		Button,
		LoadingSpinner,
		Translation,
		getGlobalContext,
		translateKey,
		type TranslationKey,
		type SearchOptionScheme,
		type SearchOptionsData
	} from '@adofai-gg/ui'
	import { untrack } from 'svelte'
	import { page } from '$app/state'
	import { createInfiniteQuery, infiniteQueryOptions } from '@tanstack/svelte-query'
	import { toStore } from 'svelte/store'
	import { api, ky } from '~/lib'
	import type { APIModList } from '~/lib/types/mod'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import ModListItem from '~/lib/components/mods/ModListItem.svelte'
	let { data }: { data: PageData } = $props()
	let search = $state(page.url.searchParams.get('q') ?? '')
	const { language } = getGlobalContext()
	const t = (key: TranslationKey) => translateKey($language, key, {}, false)
	const optionsFromUrl = (): SearchOptionsData => ({
		sort: page.url.searchParams.get('sort') ?? 'latest',
		filter: page.url.searchParams.get('author')
			? [{ id: 'author', key: 'author', value: page.url.searchParams.get('author') }]
			: []
	})
	let searchOptions = $state<SearchOptionsData>(optionsFromUrl())
	const scheme: SearchOptionScheme = $derived({
		filter: {
			author: {
				type: 'string',
				icon: 'creator',
				name: 'mod:developer',
				label: 'mod:developer',
				default: ''
			}
		},
		sort: [
			{ objective: 'latest', name: t('mod:sort-latest'), icon: 'sort' },
			{ objective: 'oldest', name: t('mod:sort-oldest'), icon: 'sort' },
			{ objective: 'name', name: t('mod:sort-name'), icon: 'sort' }
		]
	})
	$effect(() => {
		search = page.url.searchParams.get('q') ?? ''
		searchOptions = optionsFromUrl()
	})
	$effect(() => {
		const author = String(
			searchOptions.filter.find((filter) => filter.key === 'author')?.value ?? ''
		).trim()
		const sort = searchOptions.sort
		untrack(() => {
			if (
				author === (page.url.searchParams.get('author') ?? '').trim() &&
				sort === (page.url.searchParams.get('sort') ?? 'latest')
			)
				return
			goto(searchUrl(), { keepFocus: true, noScroll: true })
		})
	})
	const query = createInfiniteQuery(
		toStore(() =>
			infiniteQueryOptions({
				queryKey: ['mods', data.modSearch],
				queryFn: async ({ pageParam, queryKey, signal }) => {
					const params = new URLSearchParams(queryKey[1])
					params.set('offset', String(pageParam))
					return ky.get(api.forum(`mods/?${params}`), { signal }).json<APIModList>()
				},
				initialPageParam: 0,
				initialData: { pages: [data.mods], pageParams: [0] },
				getNextPageParam: (lastPage, _pages, lastOffset) =>
					lastPage.hasMore && lastPage.items.length
						? lastOffset + lastPage.items.length
						: undefined,
				staleTime: 60_000,
				refetchOnMount: false,
				refetchOnWindowFocus: false
			})
		)
	)
	const mods = $derived([
		...new Map(
			($query.data?.pages ?? [data.mods]).flatMap((part) => part.items).map((mod) => [mod.id, mod])
		).values()
	])
	let loadTrigger = $state<HTMLDivElement>()
	$effect(() => {
		if (
			!loadTrigger ||
			!$query.hasNextPage ||
			$query.isFetchingNextPage ||
			$query.isFetchNextPageError ||
			typeof IntersectionObserver === 'undefined'
		)
			return
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting))
					$query.fetchNextPage({ cancelRefetch: false })
			},
			{ rootMargin: '400px' }
		)
		observer.observe(loadTrigger)
		return () => observer.disconnect()
	})
	function searchUrl() {
		const params = new URLSearchParams()
		if (search.trim()) params.set('q', search.trim())
		const author = String(
			searchOptions.filter.find((filter) => filter.key === 'author')?.value ?? ''
		).trim()
		if (author) params.set('author', author)
		if (searchOptions.sort !== 'latest') params.set('sort', searchOptions.sort)
		return `/mods?${params}`
	}
	function submit(event: SubmitEvent) {
		event.preventDefault()
		goto(searchUrl(), { keepFocus: true, noScroll: true })
	}
</script>

<svelte:head><title>{t('mod:title')}</title></svelte:head>

<Container topMargin>
	<div class="mods-page">
		<h1 class="sr-only"><Translation key="mod:list-title" /></h1>
		<form onsubmit={submit} role="search" aria-label={t('mod:search')}>
			<div class="search-input">
				<SearchBar bind:value={search} placeholder="mod:search-placeholder" />
			</div>
			<Button type="submit" variant="ghost-light" leftIcon="search"
				><Translation key="mod:search" /></Button
			>
		</form>
		<SearchOptionsBar {scheme} bind:data={searchOptions} />
		<div class="results" aria-live="polite" aria-busy={$query.isFetchingNextPage}>
			{#each mods as mod (mod.id)}<ModListItem {mod} />{:else}
				<div class="empty">
					<h2><Translation key="mod:no-results" /></h2>
					<p><Translation key="mod:no-results-hint" /></p>
					<Button link href="/mods" variant="outlined"><Translation key="mod:view-all" /></Button>
				</div>
			{/each}
		</div>
		{#if $query.hasNextPage}
			<div class="load-more" bind:this={loadTrigger}>
				{#if $query.isFetchingNextPage}<LoadingSpinner />
				{:else if $query.isFetchNextPageError}
					<p role="alert"><Translation key="mod:load-more-error" /></p>
					<Button variant="outlined" onclick={() => $query.fetchNextPage({ cancelRefetch: false })}
						><Translation key="mod:retry" /></Button
					>
				{:else}
					<Button variant="outlined" onclick={() => $query.fetchNextPage({ cancelRefetch: false })}
						><Translation key="mod:load-more" /></Button
					>
				{/if}
			</div>
		{/if}
	</div>
</Container>

<style>
	.mods-page {
		max-width: 1152px;
		margin: 0 auto;
		min-height: 65vh;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
	form {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}
	.search-input {
		flex: 1;
		min-width: 0;
	}

	.results {
		margin-top: 48px;
	}
	.empty {
		padding: 64px 16px;
		text-align: center;
	}
	.empty p {
		margin: 12px 0 24px;
		opacity: 0.6;
	}
	.load-more {
		min-height: 56px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		margin-top: 32px;
	}
</style>
