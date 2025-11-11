<script lang="ts">
	import type { LayoutProps } from './$types';

	const { children }: LayoutProps = $props();
</script>

<div class="px-4">
	<main class="mx-auto gg-container pt-8 pb-32">
		{@render children?.()}
	</main>
</div>
