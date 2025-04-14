<script lang="ts" module>
	import type { SelectOption } from '@adofai-gg/ui'
	import TagIcon from '~/lib/components/TagIcon.svelte'

	export { tagIconTemplate }
</script>

{#snippet tagIconTemplate(option: SelectOption<string>)}
	<TagIcon noTooltip tag={option.value} size={18} />
{/snippet}
