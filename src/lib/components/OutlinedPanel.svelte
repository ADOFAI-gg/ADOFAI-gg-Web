<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children?: Snippet
	}

	const { children }: Props = $props()
</script>

<div class="outlined-panel">
	{@render children?.()}
</div>

<style lang="scss">
	.outlined-panel {
		padding: 16px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		font-size: 16px;
	}
</style>
