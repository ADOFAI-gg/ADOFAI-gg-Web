<script lang="ts">
	import { Container, LoadingSpinner, Translation } from '@adofai-gg/ui'
	import { createInfiniteQuery, infiniteQueryOptions } from '@tanstack/svelte-query'
	import * as store from 'svelte/store'
	import { pageSize } from '../levels/search'
	import { api, ky, type APILevel } from '~/lib'
	import { browser } from '$app/environment'
	import { createWindowVirtualizer } from '~/lib/utils/virtualizer.svelte'
	import LevelListItem from '~/lib/components/levelList/LevelListItem.svelte'
	import type { ListResponse } from '~/types'

	const queryParams = store.writable({
		sort: 'RECENT_DESC'
	})

	const fetchMyLevels = async (skip: number, take: number, sort: string) => {
		const url = new URL(api.forum('members/@me/levels'))
		url.searchParams.set('limit', take.toString())
		url.searchParams.set('offset', skip.toString())
		url.searchParams.set('sort', sort)
		const res = await ky.get(url, {
			credentials: 'include'
		})

		if (!res.ok) throw new Error(`Request failed with status code: ${res.status}`)

		const data = await res.json<ListResponse<APILevel>>()

		return data.results
	}

	const query = createInfiniteQuery(
		store.derived([queryParams], ([$queryParams]) =>
			infiniteQueryOptions({
				queryKey: ['members', '@me', 'levels', $queryParams] as const,
				queryFn: ({ pageParam, queryKey }) =>
					fetchMyLevels(pageSize * pageParam, pageSize, queryKey[3].sort),
				initialPageParam: 0,
				getNextPageParam: (prevPage, _allPages, prevParam) => {
					if (prevPage.length < pageSize) return undefined
					return prevParam + 1
				}
			})
		)
	)

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
	<h1 class="title">
		<Translation key="my-levels:title" />
	</h1>

	<div class="level-list">
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
	.title {
		margin-top: 24px;
		font-weight: 700;
		font-size: 32px;
	}

	.level-list {
		position: relative;
		margin-top: 16px;
	}
</style>
