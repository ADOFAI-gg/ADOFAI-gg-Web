<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: Snippet;
		children: Snippet;
	};

	const { children, title }: Props = $props();
</script>

<div>
	<div class="text-sm opacity-60">
		{@render title()}
	</div>

	<div class="text-[26px] font-medium">
		{@render children()}
	</div>
</div>
