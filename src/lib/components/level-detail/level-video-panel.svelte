<script lang="ts">
	import type { APILevel } from '$lib/types/api';
	import { getDifficultyIconName } from '$lib/utils/level';
	import Icon from '@iconify/svelte';
	import LevelStatItem from './level-stat-item.svelte';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import Video from '../video.svelte';

	type Props = {
		level: APILevel;
	};

	const { level }: Props = $props();

	const bpm = $derived.by(() => {
		if (level.minBpm === 0 && level.maxBpm === 0) return null;
		if (level.minBpm === level.maxBpm) return `${level.minBpm}`;

		return `${level.minBpm}-${level.maxBpm}`;
	});
</script>

<div class="overflow-hidden rounded-2xl bg-gg-darkblue/20">
	<!-- <div class="aspect-video bg-black">YAHO</div> -->
	<Video url={level.videoUrl} />

	<div class="flex items-center gap-6 p-4">
		<Icon icon={getDifficultyIconName(level.difficulty, false)} class="size-12" />
		<LevelStatItem>
			{#snippet title()}
				<Localized id="level-meta-bpm" />
			{/snippet}

			{#if bpm}
				{bpm}
			{:else}
				<Localized id="unknown" />
			{/if}
		</LevelStatItem>
		<LevelStatItem>
			{#snippet title()}
				<Localized id="level-meta-tiles" />
			{/snippet}

			{#if level.tile > 0}
				{level.tile}
			{:else}
				<Localized id="unknown" />
			{/if}
		</LevelStatItem>
	</div>
</div>
