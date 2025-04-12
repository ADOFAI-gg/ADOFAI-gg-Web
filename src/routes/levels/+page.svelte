<script lang="ts">
	import * as store from 'svelte/store'
	import type {
		SearchFilter,
		SearchOptionScheme,
		SearchOptionsData,
		SelectOption
	} from '@adofai-gg/ui'
	import { createInfiniteQuery, infiniteQueryOptions } from '@tanstack/svelte-query'
	import { api, localizeOptions, type APILevel } from '$lib'
	import type { AndFilter, Filter, SearchQuery, Sort } from '@adofai-gg/query-types'
	import {
		Container,
		getGlobalContext,
		LoadingSpinner,
		SearchBar,
		SearchOptionsBar,
		translateKey
	} from '@adofai-gg/ui'
	import { createWindowVirtualizer, type VirtualItem } from '~/lib/utils/virtualizer.svelte'
	import LevelListItem from '~/lib/components/levelList/LevelListItem.svelte'
	import { onMount, type Snippet } from 'svelte'
	import { goto } from '$app/navigation'
	import { parseFilter } from '~/lib/utils/filter'
	import { difficultyOptions } from '~/lib/utils/difficulty'
	import { difficultyIconTemplate } from '~/lib/utils/difficultySnippets.svelte'
	import { tagOptions } from '~/lib/utils/tags'
	import TagIcon from '~/lib/components/TagIcon.svelte'
	import TagIconContent from '~/lib/components/TagIconContent.svelte'

	const { language } = getGlobalContext()

	const scheme: SearchOptionScheme = $derived({
		filter: {
			'music.name': {
				default: '',
				icon: 'music',
				label: 'level:filter-music',
				name: 'level:filter-music',
				type: 'string'
			},
			'music.artists.name': {
				default: '',
				icon: 'creator',
				label: 'level:filter-artist',
				name: 'level:filter-artist',
				type: 'string'
			},
			'creators.name': {
				default: '',
				icon: 'creator',
				label: 'level:filter-creator',
				name: 'level:filter-creator',
				type: 'string'
			},
			quality: {
				type: 'select',
				name: 'level:filter-quality',
				icon: 'category',
				default: ['LISTED', 'FEATURED', 'LEGENDARY'],
				options: localizeOptions($language, [
					{
						value: 'LISTED',
						label: 'level:quality-listed'
					},
					{
						value: 'FEATURED',
						label: 'level:quality-featured'
					},
					{
						value: 'LEGENDARY',
						label: 'level:quality-legendary'
					}
				]),
				label: 'level:filter-quality',
				multiple: true
			},
			difficulty: {
				type: 'rangeSelect',
				name: 'level:filter-difficulty',
				icon: 'difficulty',
				minLabel: 'level:filter-difficulty-min',
				maxLabel: 'level:filter-difficulty-max',
				default: [],
				options: difficultyOptions,
				optionIconSnippet: difficultyIconTemplate as Snippet<[]>
			},
			'tags.name': {
				type: 'select',
				options: localizeOptions($language, tagOptions),
				default: [],
				multiple: true,
				name: 'level:filter-tags',
				icon: 'tag',
				label: 'level:filter-tags',
				optionIconSnippet: tagIconTemplate as Snippet<[]>
			}
		},
		sort: [
			{
				name: translateKey($language, 'level:sort-id-desc', {}),
				objective: 'id:desc'
			},
			{
				name: translateKey($language, 'level:sort-id-asc', {}),
				objective: 'id:asc'
			},
			{
				name: translateKey($language, 'level:sort-difficulty-desc', {}),
				objective: 'difficulty:desc'
			},
			{
				name: translateKey($language, 'level:sort-difficulty-asc', {}),
				objective: 'difficulty:asc'
			}
		]
	} satisfies SearchOptionScheme)

	const pageSize = 50

	let searchOptions = $state<SearchOptionsData>({
		filter: [],
		sort: 'id:desc'
	})

	const fetchLevels = async (skip: number, take: number, query: SearchQuery) => {
		const url = new URL(api.forum('levels/search'))

		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				skip,
				take,
				query
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (!res.ok) throw new Error(`Request failed with status code: ${res.status}`)

		const data = await res.json()

		return data.results as APILevel[]
	}

	const buildQuery = (search: string, searchOptions: SearchOptionsData): SearchQuery => {
		const rootFilter: Filter = {
			op: 'and',
			data: []
		}
		const sort: Sort[] = []

		const hasSearchQuery = search.length >= 1
		const hasOptionalFilter = searchOptions.filter.length >= 1

		if (hasSearchQuery) {
			rootFilter.data.push({
				op: 'or',
				data: [
					{
						op: 'stringContains',
						key: 'music.name',
						value: search,
						ignoreCase: true
					},
					{
						op: 'stringContains',
						key: 'music.artists.name',
						value: search,
						ignoreCase: true
					},
					{
						op: 'stringContains',
						key: 'creators.name',
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

				switch (schemeData.type) {
					case 'string':
						rootFilter.data.push({
							op: 'stringContains',
							key: filter.key,
							value: filter.value as string,
							ignoreCase: true
						})
						break
					case 'select':
						if (schemeData.multiple) {
							if (filter.key === 'tags.name') {
								// rootFilter.data.push({
								// 	op: 'and',
								// 	data: (filter.value as string[]).map((x) => ({
								// 		op: 'eq',
								// 		key: filter.key,
								// 		value: x
								// 	}))
								// })
								rootFilter.data.push({
									op: 'containsAll',
									key: filter.key,
									values: filter.value as string[]
								})
							} else
								rootFilter.data.push({
									op: 'or',
									data: (filter.value as string[]).map((x) => ({
										op: 'eq',
										key: filter.key,
										value: x
									}))
								})
						} else {
							// TODO make this
						}

						break
					case 'rangeSelect': {
						const v = filter.value as number[]
						const min = v[0]
						const max = v[1]

						const q = {
							op: 'and',
							data: []
						} as AndFilter

						if (min !== undefined) {
							q.data.push({
								op: 'gte',
								key: filter.key,
								value: min
							} satisfies Filter)
						}

						if (max !== undefined) {
							q.data.push({
								op: 'lte',
								key: filter.key,
								value: max
							} satisfies Filter)
						}

						rootFilter.data.push(q)
					}
					default:
						break
				}
			}
		}

		if (searchOptions.sort) {
			const [objective, direction] = searchOptions.sort.split(':')
			if (['asc', 'desc'].includes(direction)) {
				sort.push({
					objective,
					direction: direction as 'asc' | 'desc'
				})
			}
		}

		return {
			filter: hasSearchQuery || hasOptionalFilter ? rootFilter : null,
			sort
		}
	}

	let searchQuery = $state('')

	let virtualizer = createWindowVirtualizer({
		count: 0,
		overscan: 3,
		estimateSize: () => 108
	})

	let elements = $state<HTMLDivElement[]>([])

	$effect(() => {
		elements.forEach((el) => virtualizer.measureElement(el))
	})

	let debouncedSearchText = store.writable('')
	let searchOptionsWritable = store.writable<SearchOptionsData>({
		filter: [],
		sort: 'recent-desc'
	})

	let queryParams = store.derived(
		[debouncedSearchText, searchOptionsWritable],
		([$debouncedSearchText, $searchOptions]) => {
			return buildQuery($debouncedSearchText, $searchOptions)
		}
	)

	let mounted = false

	onMount(() => {
		const url = new URL(window.location.href)
		const params = url.searchParams

		searchOptions.filter = parseFilter(params.get('f'), scheme)
		searchQuery = $debouncedSearchText = params.get('q') || ''

		mounted = true
	})

	$effect(() => {
		if (!mounted) return
		const searchText = $debouncedSearchText
		const filter = JSON.stringify(searchOptions.filter.map(({ id, ...x }) => ({ ...x })))

		const prevUrl = new URL(window.location.href)

		if (prevUrl.searchParams.get('q') !== searchText || prevUrl.searchParams.get('f') !== filter) {
			goto(
				`${prevUrl.pathname}?q=${encodeURIComponent(searchText)}&f=${encodeURIComponent(filter)}&psize=${pageSize}`,
				{ replaceState: true, keepFocus: true }
			)
		}
	})

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

{#snippet tagIconTemplate(option: SelectOption<string>)}
	<TagIcon noTooltip tag={option.value} size={18} />
{/snippet}

<Container>
	<div class="search-area">
		<SearchBar bind:value={searchQuery} placeholder="level:search-placeholder" />
		<SearchOptionsBar {scheme} bind:data={searchOptions} />
	</div>
	<div class="list-area">
		{#if $query.isPending}
			<LoadingSpinner />
		{/if}

		{#if $query.isSuccess}
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
