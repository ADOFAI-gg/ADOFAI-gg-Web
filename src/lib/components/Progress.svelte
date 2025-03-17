<script lang="ts">
	import type { Readable } from 'svelte/store'

	interface Props {
		value: number
		max: number
	}

	const { value, max }: Props = $props()

	const progress = $derived(value / max)
</script>

<div class="progress">
	<div class="progress-value" style="width: {progress * 100}%;"></div>
</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.progress {
		width: 100%;
		height: 8px;
		border-radius: 4px;
		background-color: rgba($darkblue, 0.2);
	}

	.progress-value {
		height: 8px;
		border-radius: 4px;
		background-color: $blue;
		transition: width ease 0.2s;
	}
</style>
