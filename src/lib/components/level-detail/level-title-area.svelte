<script lang="ts">
	import LevelQualityTag from '$lib/components/level-list-item/level-quality-tag.svelte';
	import type { APILevel } from '$lib/types/api';

	type Props = {
		level: APILevel;
	};

	const { level }: Props = $props();
</script>

<div>
	{#if level.quality !== 'LISTED'}
		<div class="mb-1.5">
			<LevelQualityTag quality={level.quality} />
		</div>
	{/if}

	<h1 class="text-[2rem] font-medium">{level.title}</h1>
</div>
