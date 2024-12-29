<script lang="ts" module>
	import type { SearchOptionScheme, SearchOptionsData } from '@adofai-gg/ui'
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { api, type APILevel } from '$lib'
	import type { Filter, SearchQuery } from '$lib/utils/advanced-query'

	const scheme: SearchOptionScheme = {
		filter: {
			title: {
				default: '',
				icon: 'music',
				label: 'level:filter-title',
				name: 'level:filter-title',
				type: 'string'
			},
			artist: {
				default: '',
				icon: 'creator',
				label: 'level:filter-artist',
				name: 'level:filter-artist',
				type: 'string'
			},
			creator: {
				default: '',
				icon: 'creator',
				label: 'level:filter-creator',
				name: 'level:filter-creator',
				type: 'string'
			}
		},
		sort: []
	} satisfies SearchOptionScheme

	const pageSize = 50

	const fetchLevels = async (offset: number, limit: number) => {
		const url = new URL(api.forum('levels'))
		url.searchParams.set('offset', `${offset}`)
		url.searchParams.set('limit', `${limit}`)

		const res = await fetch(url)

		if (!res.ok) throw new Error(`Request failed with status code: ${res.status}`)

		const data = await res.json()

		return data.results as APILevel[]
	}

	const buildQuery = (search: string, searchOptions: SearchOptionsData): SearchQuery => {
		const rootFilter: Filter = {
			op: 'and',
			data: []
		}

		const hasSearchQuery = search.length >= 1
		const hasOptionalFilter = searchOptions.filter.length >= 1

		if (hasSearchQuery) {
			rootFilter.data.push({
				op: 'or',
				data: [
					{
						op: 'stringContains',
						key: 'title',
						value: search,
						ignoreCase: true
					},
					{
						op: 'stringContains',
						key: 'music.title',
						value: search,
						ignoreCase: true
					},
					{
						op: 'stringContains',
						key: 'music.artists.displayName',
						value: search,
						ignoreCase: true
					},
					{
						op: 'stringContains',
						key: 'creators.displayName',
						value: search,
						ignoreCase: true
					}
				]
			} satisfies Filter)
		}

		if (hasOptionalFilter) {
			for (const filter of searchOptions.filter) {
				const schemeData = scheme.filter[filter.key]
				if (!schemeData) continue

				if (schemeData.type === 'string') {
					rootFilter.data.push({
						op: 'stringContains',
						key: filter.key,
						value: filter.value as string,
						ignoreCase: false
					})
				}
			}
		}

		return {
			filter: hasSearchQuery || hasOptionalFilter ? rootFilter : null,
			sort: []
		}
	}
</script>

<script lang="ts">
	import { Container, SearchBar, SearchOptionsBar } from '@adofai-gg/ui'
	import { createWindowVirtualizer, type VirtualItem } from '@tanstack/svelte-virtual'
	import LevelListItem from '~/lib/components/levelList/LevelListItem.svelte'
	import { onMount } from 'svelte'

	let searchOptions: SearchOptionsData = $state({
		filter: [],
		sort: []
	})
	let searchQuery = $state('')

	const query = createInfiniteQuery({
		queryKey: ['levels', 'search', { filter: [], sort: [] } as SearchOptionsData],
		queryFn: ({ pageParam }) => fetchLevels(pageSize * pageParam, pageSize),
		initialPageParam: 0,
		getNextPageParam: (prevPage, _allPages, prevParam) => {
			if (prevPage.length < pageSize) return undefined
			return prevParam + 1
		}
	})

	const virtualizer = createWindowVirtualizer({
		count: 0,
		overscan: 3,
		estimateSize: () => 108
	})

	let allItems = $derived(($query.data && $query.data.pages.flat()) || [])
	let items = $state<VirtualItem[]>([])

	onMount(() => {
		const params = new URLSearchParams(window.location.search)
		if (params.get('q')) searchQuery = params.get('q')!
	})

	$effect(() => {
		$virtualizer.setOptions({
			count: $query.hasNextPage ? allItems.length + 1 : allItems.length
		})

		items = $virtualizer.getVirtualItems()

		const [lastItem] = [...$virtualizer.getVirtualItems()].reverse()

		if (
			lastItem &&
			lastItem.index > allItems.length - 1 &&
			$query.hasNextPage &&
			!$query.isFetchingNextPage
		) {
			$query.fetchNextPage()
		}
	})

	let elements = $state<HTMLDivElement[]>([])

	$effect(() => {
		elements.forEach((el) => $virtualizer.measureElement(el))
	})

	$effect(() => {
		console.log(buildQuery(searchQuery, searchOptions))
	})
</script>

<Container>
	<div class="search-area">
		<SearchBar bind:value={searchQuery} placeholder="level:search-placeholder" />
		<SearchOptionsBar {scheme} bind:data={searchOptions} />
	</div>
	<div class="list-area">
		{#if $query.isPending}
			loading
		{/if}

		{#if $query.isSuccess}
			<div class="level-list" style="height: {$virtualizer.getTotalSize()}px;">
				<div
					style="position: absolute; top: 0; left: 0; width: 100%; transform: translateY({items[0]
						? items[0].start - $virtualizer.options.scrollMargin
						: 0}px);"
				>
					{#each items as item, i (item.index)}
						<div class="item" bind:this={elements[i]} data-index={item.index}>
							{#if $query.hasNextPage && item.index === allItems.length}
								loading
							{:else}
								<LevelListItem level={allItems[item.index]} />
							{/if}
						</div>
					{/each}
				</div>
			</div>
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
