<script lang="ts">
	import { createLevelSearchQuery } from '$lib/api/queries/levels.svelte';
	import {
		LoadingSpinner,
		SearchInput,
		SearchOptionsBar,
		type FilterItem,
		type FilterScheme
	} from '@adofai-gg/ui';
	import LevelListItem from '$lib/components/level-list-item/level-list-item.svelte';
	import { createWindowVirtualizer } from '$lib/virtualizer.svelte';
	import { browser } from '$app/environment';
	import { getFluentContext, Localized } from '@nubolab-ffwd/svelte-fluent';

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

	const { localize } = getFluentContext();

	const filterScheme = $derived({
		filter: {
			'music.name': {
				default: '',
				name: localize('level-filter-music'),
				type: 'text',
				options: {
					label: localize('level-filter-music')
				},
				icon: 'gg:music'
			},
			'music.artists.name': {
				type: 'text',
				default: '',
				icon: 'gg:creator',
				name: localize('level-filter-artist'),
				options: {
					label: localize('level-filter-artist')
				}
			},
			'creators.name': {
				type: 'text',
				default: '',
				icon: 'gg:creator',
				name: localize('level-filter-creator'),
				options: {
					label: localize('level-filter-creator')
				}
			}
		},
		sort: [
			{
				id: 'id:desc',
				name: localize('level-sort-id-desc')
			},
			{
				id: 'id:asc',
				name: localize('level-sort-id-asc')
			},
			{
				id: 'difficulty:desc',
				name: localize('level-sort-difficulty-desc')
			},
			{
				id: 'difficulty:asc',
				name: localize('level-sort-difficulty-asc')
			}
		]
	} satisfies FilterScheme);

	let sort = $state('id:desc');
	let filters = $state<FilterItem[]>([]);
</script>

<!-- SEARCH -->
<section>
	<Localized id="level-search-placeholder">
		{#snippet children({ text })}
			<SearchInput placeholder={text} />
		{/snippet}
	</Localized>
	<div class="mt-2 px-4">
		<SearchOptionsBar {filterScheme} bind:sort bind:filters />
	</div>
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
