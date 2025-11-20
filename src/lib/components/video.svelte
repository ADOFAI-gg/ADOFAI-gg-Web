<script lang="ts">
	import { browser } from '$app/environment';
	import { parseVideoUrl } from '$lib/utils/level';

	type Props = {
		url?: string;
	};

	const { url }: Props = $props();

	const data = $derived(url ? parseVideoUrl(url) : null);

	const origin = $derived.by(() => {
		if (!browser) return '';

		return `${window.location.protocol}//${window.location.host}`;
	});
</script>

<div class="flex aspect-video items-center justify-center bg-black/20 text-center">
	{#if !data}
		<div class="text-3xl font-bold select-none">VIDEO NOT DETECTED</div>
	{:else if data.type === 'youtube'}
		<iframe
			class="aspect-video size-full"
			title="Video"
			src="https://www.youtube.com/embed/{data.videoId}?enablejsapi=1&origin={origin}&start={data.start}"
			allow="fullscreen"
			frameborder="0"
		></iframe>
	{/if}
</div>
