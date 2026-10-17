<script lang="ts">
	import type { APIMod } from '~/lib/types/mod'
	import { safeModUrl } from '~/lib/types/mod'
	import defaultImage from '~/lib/assets/defaultAvatars/dark.png'
	let { mod, size = 72 }: { mod: APIMod; size?: number } = $props()
	const src = $derived(safeModUrl(mod.imageUrl) ?? defaultImage)
</script>

<img
	class="mod-image"
	style:width="{size}px"
	style:height="{size}px"
	{src}
	alt=""
	loading="lazy"
	onerror={(event) => {
		const target = event.currentTarget as HTMLImageElement
		if (target.src !== new URL(defaultImage, window.location.href).href) target.src = defaultImage
	}}
/>

<style>
	.mod-image {
		flex-shrink: 0;
		border-radius: 16px;
		object-fit: cover;
		background: #171a30;
	}
</style>
