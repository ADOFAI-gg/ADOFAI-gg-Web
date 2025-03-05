<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children?: Snippet
	}

	const { children }: Props = $props()
</script>

<div class="fake-outlined-input">
	{@render children?.()}
</div>

<style lang="scss">
	.fake-outlined-input {
		padding: 8px 16px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		font-size: 16px;
	}
</style>
