<script lang="ts" module>
	import type { SelectOption } from '@adofai-gg/ui'
	import DifficultyIcon from '../components/DifficultyIcon.svelte'

	export { difficultyIconTemplate }
</script>

{#snippet difficultyIconTemplate(option: SelectOption<number>)}
	<DifficultyIcon difficulty={option.value} size={18} />
{/snippet}
