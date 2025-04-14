<script lang="ts">
	import * as store from 'svelte/store'
	import type { SearchOptionScheme, SearchOptionsData } from '@adofai-gg/ui'
	import { createInfiniteQuery, infiniteQueryOptions } from '@tanstack/svelte-query'
	import type { SearchQuery } from '@adofai-gg/query-types'
	import {
		Container,
		getGlobalContext,
		LoadingSpinner,
		SearchBar,
		SearchOptionsBar
	} from '@adofai-gg/ui'
	import { createWindowVirtualizer, type VirtualItem } from '~/lib/utils/virtualizer.svelte'
	import LevelListItem from '~/lib/components/levelList/LevelListItem.svelte'
	import { onMount, type Snippet } from 'svelte'
	import { goto } from '$app/navigation'
	import { parseFilter } from '~/lib/utils/filter'
	import { page } from '$app/state'
	import {
		buildLevelQuery,
		buildLevelSearchScheme,
		fetchLevels,
		getLevelSearchOptions,
		pageSize
	} from './search'
	import type { PageData } from './$types'
	import { browser } from '$app/environment'

	const { language } = getGlobalContext()

	const scheme: SearchOptionScheme = $derived(buildLevelSearchScheme($language))

	// svelte-ignore state_referenced_locally
	let searchOptionsState = $state(getLevelSearchOptions(page.url, scheme))
	const searchOptions = $derived(getLevelSearchOptions(page.url, scheme))

	$effect(() => {
		searchOptionsState = searchOptions
	})

	$effect(() => {
		updateQuery($debouncedSearchText, searchOptionsState)
	})

	let searchQuery = $state(page.url.searchParams.get('q') || '')

	// svelte-ignore state_referenced_locally
	let debouncedSearchText = store.writable(searchQuery)
	// svelte-ignore state_referenced_locally
	let searchOptionsWritable = store.writable<SearchOptionsData>(searchOptions)

	let queryParams = store.derived(
		[debouncedSearchText, searchOptionsWritable],
		([$debouncedSearchText, $searchOptions]) => {
			return buildLevelQuery($debouncedSearchText, $searchOptions, scheme)
		}
	)

	const updateQuery = (searchText: string, { filter, sort }: SearchOptionsData) => {
		const filterStr = JSON.stringify(filter.map(({ ...x }) => ({ ...x })))

		const prevUrl = new URL(window.location.href)

		if (
			prevUrl.searchParams.get('q') === searchText &&
			prevUrl.searchParams.get('f') === filterStr
		) {
			return
		}

		goto(
			`${prevUrl.pathname}?q=${encodeURIComponent(searchText)}&f=${encodeURIComponent(filterStr)}`,
			{ replaceState: true, keepFocus: true }
		)
	}

	const query = createInfiniteQuery(
		store.derived([queryParams], ([$queryParams]) =>
			infiniteQueryOptions({
				queryKey: ['levels', 'search', $queryParams],
				queryFn: ({ pageParam, queryKey }) =>
					fetchLevels(pageSize * pageParam, pageSize, queryKey[2] as SearchQuery),
				initialPageParam: 0,
				getNextPageParam: (prevPage, _allPages, prevParam) => {
					if (prevPage.length < pageSize) return undefined
					return prevParam + 1
				}
			})
		)
	)

	$effect(() => {
		$searchOptionsWritable = $state.snapshot(searchOptions)
	})

	$effect(() => {
		const t = searchQuery
		const timeout = setTimeout(() => {
			$debouncedSearchText = t
		}, 200)

		return () => {
			clearTimeout(timeout)
		}
	})

	let allItems = $derived(($query.data && $query.data.pages.flat()) || [])

	let virtualizer = createWindowVirtualizer({
		count: 0,
		overscan: 3,
		estimateSize: () => 108
	})

	let elements = $state<HTMLDivElement[]>([])

	$effect(() => {
		elements.forEach((el) => virtualizer.measureElement(el))
	})

	$effect(() => {
		virtualizer.setOptions({
			...virtualizer.options,
			count: $query.hasNextPage ? allItems.length + 1 : allItems.length
		})
		virtualizer.measure()
	})

	$effect(() => {
		const [lastItem] = [...virtualizer.getVirtualItems()].reverse()

		if (
			lastItem &&
			lastItem.index > allItems.length - 1 &&
			$query.hasNextPage &&
			!$query.isFetchingNextPage
		) {
			$query.fetchNextPage()
		}
	})
</script>

<Container>
	<div class="search-area">
		<SearchBar bind:value={searchQuery} placeholder="level:search-placeholder" />
		<SearchOptionsBar {scheme} bind:data={searchOptionsState} />
	</div>
	<div class="list-area">
		{#if $query.isPending}
			<LoadingSpinner />
		{/if}

		{#if $query.isSuccess}
			{#if browser}
				{@const items = virtualizer.getVirtualItems()}
				<div class="level-list" style="height: {virtualizer.getTotalSize()}px;">
					<div
						style="position: absolute; top: 0; left: 0; width: 100%; transform: translateY({items[0]
							? items[0].start - virtualizer.options.scrollMargin
							: 0}px);"
					>
						{#each items as item, i (item.index)}
							<div class="item" bind:this={elements[i]} data-index={item.index}>
								{#if $query.hasNextPage && item.index === allItems.length}
									<LoadingSpinner />
								{:else}
									<LevelListItem level={allItems[item.index]} />
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="level-list">
					{#each allItems as level}
						<LevelListItem {level} />
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</Container>

<style lang="scss">
	.search-area {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 32px;
	}

	.list-area {
		margin-top: 16px;
	}

	.level-list {
		position: relative;
	}

	.item {
		box-sizing: border-box;
	}
</style>
