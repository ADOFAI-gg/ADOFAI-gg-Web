<script lang="ts">
	import { Panel } from '@adofai-gg/ui'
	import type { APILevel } from '~/lib'
	import TagIcon from '../TagIcon.svelte'

	interface Props {
		level: APILevel
	}

	const { level }: Props = $props()

	let tags = $derived.by(() => {
		const dangerTags: string[] = []
		const warningTags: string[] = []
		const result: string[] = []

		for (const tag of level.tags) {
			if (['NSFW', 'EPILEPSY_WARNING'].includes(tag.name)) {
				dangerTags.push(tag.name)
				continue
			}
			if (['DLC'].includes(tag.name)) {
				warningTags.push(tag.name)
				continue
			}
			result.push(tag.name)
		}

		return [...dangerTags, ...warningTags, ...result]
	})
</script>

<Panel>
	<div class="tags">
		{#each tags as tag}
			<TagIcon size={26} {tag} />
		{/each}
	</div>
</Panel>

<style lang="scss">
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
