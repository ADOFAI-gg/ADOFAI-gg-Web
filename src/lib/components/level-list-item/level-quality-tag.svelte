<script lang="ts">
	import type { APILevel } from '$lib/types/api';
	import { cn } from '@adofai-gg/ui';
	import { tv } from 'tailwind-variants';

	type Props = {
		quality: APILevel['quality'];
	};

	const { quality }: Props = $props();

	const styles = tv({
		base: 'inline-block rounded-lg px-2 text-lg font-semibold uppercase select-none',
		variants: {
			quality: {
				LEGENDARY: 'bg-gg-yellow text-[#3A3208]',
				FEATURED: 'bg-gg-blue text-white',
				HIDDEN: 'bg-gg-gray text-white',
				UNLISTED: 'bg-white text-black',
				LISTED: 'bg-gg-darkblue/20 text-white/80'
			}
		}
	});

	const text = $derived.by(() => {
		if (quality === 'FEATURED') return 'recommended';
		return quality;
	});
</script>

<div class={cn(styles({ quality }))}>
	{text}
</div>
