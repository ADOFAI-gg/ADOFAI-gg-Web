<script lang="ts">
	import type { APILevel } from '$lib/types/api';
	import Icon from '@iconify/svelte';
	import LevelListItemDetail from './level-list-item-detail.svelte';
	import { getDifficultyIconName, getDownloadUrl, getTags, tagIconName } from '$lib/utils/level';
	import TagIcon from '../tag-icon.svelte';

	type Props = {
		level: APILevel;
		showDownload?: boolean;
	};

	const { level, showDownload = true }: Props = $props();

	const tags = $derived(getTags(level.tags));
</script>

<a
	href={`/levels/${level.id}`}
	class="flex items-center gap-3 border-b border-b-white/10 bg-transparent px-4 py-4.5 transition hover:bg-black/10 active:bg-black/20"
>
	<div class="flex flex-col gap-1">
		<Icon icon={getDifficultyIconName(level.difficulty)} class="size-12" />
		<div class="text-center text-xs opacity-40 before:content-['#']">{level.id}</div>
	</div>
	<div class="flex grow flex-col gap-1">
		<div class="text-[1.375rem] font-medium">{level.title}</div>
		<div>
			<LevelListItemDetail icon="gg:music">
				{level.music.artists.map((x) => x.displayName).join(' & ')}
			</LevelListItemDetail>
			<LevelListItemDetail icon="gg:tile2">
				{level.creatorAlias || level.creators.map((x) => x.displayName).join(' & ')}
			</LevelListItemDetail>
		</div>
	</div>
	<div class="hidden gap-2 md:flex">
		{#if level.quality === 'FEATURED'}
			<TagIcon tag="FEATURED" class="size-6 text-gg-blue" />
		{/if}
		{#if level.quality === 'LEGENDARY'}
			<TagIcon tag="LEGENDARY" class="size-6 text-gg-yellow" />
		{/if}
		{#each tags.danger as tag}
			<TagIcon {tag} class="size-6 text-gg-red" />
		{/each}
		{#each tags.warning as tag}
			<TagIcon {tag} class="size-6 text-gg-yellow" />
		{/each}
		{#each tags.normal as tag}
			<TagIcon {tag} class="size-6" />
		{/each}
	</div>
	{#if showDownload}
		<button
			class="hidden md:block"
			onclick={(e) => {
				e.preventDefault();
				window.open(getDownloadUrl(level), '_blank');
			}}
		>
			<Icon icon="gg:arrow-down-with-file" class="size-12" />
		</button>
	{/if}
</a>
