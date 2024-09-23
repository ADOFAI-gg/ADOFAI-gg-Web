<script lang="ts">
	import { browser } from '$app/environment'
	import { parseVideoUrl } from '../utils/parser'

	interface Props {
		url: string
	}

	const { url }: Props = $props()

	let data = $derived(parseVideoUrl(url))

	let origin = $derived.by(() => {
		if (!browser) return ''

		return `${window.location.protocol}//${window.location.host}`
	})
</script>

<div class="video">
	{#if data === null}
		<div class="not-found">video not detected</div>
	{:else if data.type === 'youtube'}
		<iframe
			class="video-iframe"
			width="100%"
			height="100%"
			title="Video"
			src="https://www.youtube.com/embed/{data.videoId}?enablejsapi=1&origin={origin}&start={data.start}"
			allow="fullscreen"
			frameborder="0"
		></iframe>
	{/if}
</div>

<style lang="scss">
	@import '@adofai-gg/ui/dist/stylesheets/system/colors';

	.video {
		aspect-ratio: 16/9;
	}

	.not-found {
		width: 100%;
		height: 100%;
		background-color: $red;
	}

	.video-iframe:focus {
		outline: none;
	}
</style>
