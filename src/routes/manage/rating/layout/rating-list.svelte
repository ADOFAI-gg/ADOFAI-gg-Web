<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import RatingItem from './rating-item.svelte'
	import Searchbar from './searchbar.svelte'
	import { api, ky, type APILevelRating } from '~/lib'
	import { pageSize } from '~/routes/levels/search'
	import { createVirtualizer } from '~/lib/utils/virtualizer.svelte'
	import { LoadingSpinner } from '@adofai-gg/ui'
	import { browser } from '$app/environment'
	import type { ListResponse } from '~/types'

	const query = createInfiniteQuery({
		queryKey: ['levels', 'ratings'],
		queryFn: async ({ pageParam }) =>
			await ky
				.get(api.forum('levels/ratings'), {
					searchParams: new URLSearchParams({
						offset: `${pageParam * pageSize}`,
						limit: `${pageSize}`
					})
				})
				.json<ListResponse<APILevelRating>>()
				.then((x) => x.results),
		initialPageParam: 0,
		getNextPageParam: (prevPage, _allPages, prevParam) => {
			if (prevPage.length < pageSize) return undefined
			return prevParam + 1
		}
	})

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
	<Searchbar />
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
</style>
