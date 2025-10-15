<script lang="ts">
	import { createInfiniteQuery, infiniteQueryOptions } from '@tanstack/svelte-query'
	import RatingItem from './rating-item.svelte'
	import { api, ky, type APILevelRating } from '~/lib'
	import { pageSize } from '~/routes/levels/search'
	import { createVirtualizer } from '~/lib/utils/virtualizer.svelte'
	import {
		getGlobalContext,
		LoadingSpinner,
		SearchBar,
		SearchOptionsBar,
		translateKey,
		type SearchOptionScheme,
		type SearchOptionsData
	} from '@adofai-gg/ui'
	import { browser } from '$app/environment'
	import type { ListResponse } from '~/types'
	import { difficultyOptions } from '~/lib/utils/difficulty'
	import { difficultyIconTemplate } from '~/lib/utils/difficultySnippets.svelte'
	import type { Snippet } from 'svelte'
	import { derived, writable } from 'svelte/store'

	const { language } = getGlobalContext()

	const scheme: SearchOptionScheme = $derived({
		filter: {
			expectedDifficulty: {
				type: 'rangeSelect',
				name: 'manage:rating-filter-expected-difficulty',
				icon: 'difficulty',
				minLabel: 'manage:rating-filter-expected-difficulty-min',
				maxLabel: 'manage:rating-filter-expected-difficulty-max',
				default: [],
				options: difficultyOptions,
				optionIconSnippet: difficultyIconTemplate as Snippet<[]>
			}
		},
		sort: [
			{ name: translateKey($language, 'manage:rating-sort-recent'), objective: 'ID_DESC' },
			{
				name: translateKey($language, 'manage:rating-sort-incomplete'),
				objective: 'SELF_INCOMPLETE_DESC'
			},
			{
				name: translateKey($language, 'manage:rating-sort-requires-discussion'),
				objective: 'REQUIRES_DISCUSSION_DESC'
			},
			{
				name: translateKey($language, 'manage:rating-sort-completed'),
				objective: 'COMPLETED_DESC'
			},
			{
				name: translateKey($language, 'manage:rating-sort-difficulty-range'),
				objective: 'DIFFICULTY_RANGE'
			}
		],
		pageSize: false
	})

	let searchOptionsState = $state<SearchOptionsData>({
		filter: [],
		sort: 'ID_DESC'
	})

	// svelte-ignore state_referenced_locally
	const searchOptionsStore = writable($state.snapshot(searchOptionsState))

	$effect(() => {
		searchOptionsStore.set($state.snapshot(searchOptionsState))
	})

	const query = createInfiniteQuery(
		derived([searchOptionsStore], ([searchOptions]) =>
			infiniteQueryOptions({
				queryKey: ['levels', 'ratings', searchOptions] as const,
				queryFn: async ({ pageParam, queryKey }) => {
					const query = queryKey[2]

					const params = new URLSearchParams({
						offset: `${pageParam * pageSize}`,
						limit: `${pageSize}`,
						sort: query.sort
					})

					const expectedDifficulty = query.filter.find((x) => x.key === 'expectedDifficulty')
					console.log(query.filter.map((x) => x.value))

					if (expectedDifficulty) {
						const [min, max] = expectedDifficulty.value as [number | undefined, number | undefined]
						if (min !== undefined) params.set('minExpectDifficulty', min.toString())
						if (max !== undefined) params.set('maxExpectDifficulty', max.toString())
					}

					return await ky
						.get(api.forum('levels/ratings'), {
							searchParams: params
						})
						.json<ListResponse<APILevelRating>>()
						.then((x) => x.results)
				},
				initialPageParam: 0,
				getNextPageParam: (prevPage, _allPages, prevParam) => {
					if (prevPage.length < pageSize) return undefined
					return prevParam + 1
				}
			})
		)
	)

	let scrollContainer = $state<Element | null>(null)

	const virtualizer = createVirtualizer({
		count: 0,
		estimateSize: () => 80,
		overscan: 3,
		getScrollElement: () => scrollContainer
	})

	let allItems = $derived(($query.data && $query.data.pages.flat()) || [])

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

<div class="level-list">
	<SearchBar placeholder="manage:rating-search-placeholder" />

	<div class="search-options-bar">
		<SearchOptionsBar {scheme} bind:data={searchOptionsState} />
	</div>
	<div class="level-list-content" bind:this={scrollContainer}>
		{#if $query.isPending}
			<LoadingSpinner />
		{/if}

		{#if $query.isSuccess}
			{#if browser}
				{@const items = virtualizer.getVirtualItems()}
				<div class="level-list-virtualizer" style="height: {virtualizer.getTotalSize()}px;">
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
									<RatingItem rating={allItems[item.index]} />
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	.level-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 400px;

		&-content {
			position: relative;
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			overflow-y: auto;
			height: 100%;
			margin-top: 16px;
		}
	}

	.search-options-bar {
		margin-top: 8px;
	}
</style>
