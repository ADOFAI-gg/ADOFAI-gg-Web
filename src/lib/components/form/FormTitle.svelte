<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children?: Snippet
	}

	const { children }: Props = $props()
</script>

<h2 class="form-title">
	{@render children?.()}
</h2>

<style lang="scss">
	.form-title {
		font-weight: 500;
		font-size: 28px;
		text-align: center;
	}
</style>
