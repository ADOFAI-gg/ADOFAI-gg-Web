<script lang="ts">
	import { Panel } from '@adofai-gg/ui'
	import type { APILevel } from '~/lib'
	import TagIcon from '../TagIcon.svelte'
	import { getTags } from '~/lib/utils/level'

	interface Props {
		level: APILevel
	}

	const { level }: Props = $props()

	let tags = $derived(getTags(level))
</script>

{#if tags.length}
	<Panel>
		<div class="tags">
			{#each tags as tag}
				<TagIcon size={26} {tag} />
			{/each}
		</div>
	</Panel>
{/if}

<style lang="scss">
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
