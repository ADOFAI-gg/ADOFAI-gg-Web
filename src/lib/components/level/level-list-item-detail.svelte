<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		icon: string;
		children?: Snippet;
	};

	const { icon, children }: Props = $props();
</script>

<div class="flex items-center gap-1">
	<Icon {icon} class="size-4.5 opacity-40" />
	<span class="opacity-80">
		{@render children?.()}
	</span>
</div>
