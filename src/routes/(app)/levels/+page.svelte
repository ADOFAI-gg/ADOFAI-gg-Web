<script lang="ts">
	import { createLevelSearchQuery } from '$lib/api/queries/levels.svelte';
	import { LoadingSpinner, SearchInput } from '@adofai-gg/ui';
	import LevelListItem from '$lib/components/level-list-item/level-list-item.svelte';
	import { createWindowVirtualizer } from '$lib/virtualizer.svelte';
	import { browser } from '$app/environment';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';

	const query = createLevelSearchQuery(
		() => ({
			filter: null,
			sort: []
		}),
		() => 50
	);

	let allItems = $derived((query.data && query.data.pages.flat()) || []);

	const virtualizer = $derived(
		createWindowVirtualizer({
			count: query.hasNextPage ? allItems.length + 1 : allItems.length,
			estimateSize: () => 108,
			overscan: 3
		})
	);

	const virtualItems = $derived(virtualizer.getVirtualItems());

	let elements: HTMLElement[] = $state([]);

	$effect(() => {
		elements.forEach((element) => virtualizer.measureElement(element));
	});

	$effect(() => {
		const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

		if (
			lastItem &&
			lastItem.index > allItems.length - 1 &&
			query.hasNextPage &&
			!query.isFetchingNextPage
		) {
			query.fetchNextPage();
		}
	});
</script>

<!-- SEARCH -->
<section>
	<Localized id="level-search-placeholder">
		{#snippet children({ text })}
			<SearchInput placeholder={text} />
		{/snippet}
	</Localized>
	<div class="mt-2 px-4">asdfasdfd</div>
</section>

<!-- LIST -->
<div class="mt-4">
	{#if query.isPending}
		<div>
			<LoadingSpinner />
		</div>
	{/if}

	{#if browser}
		<div style="height: {virtualizer.getTotalSize()}px;" class="relative">
			{#each virtualItems as { index, start }, i (index)}
				<div
					bind:this={elements[i]}
					data-index={index}
					class="absolute top-0 left-0 w-full"
					style="transform: translateY({start}px)"
				>
					{#if index === allItems.length}
						<div class="py-8">
							<LoadingSpinner />
						</div>
					{:else}
						<LevelListItem level={allItems[index]} />
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
