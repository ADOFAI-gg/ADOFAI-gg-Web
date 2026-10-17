<script lang="ts">
	import { Icon, getGlobalContext, translateKey, type TranslationKey } from '@adofai-gg/ui'
	import Video from '../Video.svelte'
	import { api } from '~/lib'
	import { parseVideoUrl } from '~/lib/utils/parser'
	import { safeModUrl, type APIModImage } from '~/lib/types/mod'
	let {
		images = [],
		videoUrl = null,
		fallbackImage = null,
		label = '',
		activeIndex = $bindable(0)
	}: {
		images?: APIModImage[]
		videoUrl?: string | null
		fallbackImage?: string | null
		label?: string
		activeIndex?: number
	} = $props()
	const { language } = getGlobalContext()
	const t = (key: TranslationKey, params = {}) => translateKey($language, key, params, false)
	const validVideo = $derived(safeModUrl(videoUrl) && parseVideoUrl(videoUrl!) ? videoUrl : null)
	$effect(() => {
		if (validVideo) activeIndex = 0
	})
	const slides = $derived([
		...(validVideo
			? [{ key: 'video', type: 'video' as const, src: validVideo, alt: t('mod:media-video') }]
			: []),
		...images.map((image) => ({
			key: image.id,
			type: 'image' as const,
			src: api.forum(image.path),
			alt: image.alt,
			name: image.name
		})),
		...(!images.length && !validVideo && safeModUrl(fallbackImage)
			? [{ key: 'cover', type: 'image' as const, src: fallbackImage!, alt: label, name: label }]
			: [])
	])
	const current = $derived(slides[activeIndex] ?? slides[0])
	let touchX = 0
	let failed = $state<Record<string, boolean>>({})
	$effect(() => {
		if (activeIndex >= slides.length) activeIndex = Math.max(0, slides.length - 1)
	})
	function move(direction: number) {
		activeIndex = (activeIndex + direction + slides.length) % slides.length
	}
</script>

{#if current}
	<section class="media-gallery" aria-label={t('mod:media-gallery')}>
		<div
			class="stage"
			ontouchstart={(event) => {
				touchX = event.changedTouches[0].clientX
			}}
			ontouchend={(event) => {
				const distance = event.changedTouches[0].clientX - touchX
				if (slides.length > 1 && Math.abs(distance) > 45) move(distance > 0 ? -1 : 1)
			}}
		>
			{#key current.key}
				{#if current.type === 'video'}<Video url={current.src} />
				{:else if failed[current.src]}<div class="image-error">{t('mod:media-image-error')}</div>
				{:else}<img
						class="slide-image"
						src={current.src}
						alt={current.alt || label}
						onerror={() => {
							failed[current.src] = true
						}}
					/>{/if}
			{/key}
			{#if slides.length > 1}
				<span class="counter" aria-live="polite"
					>{activeIndex + 1}<span> / {slides.length}</span></span
				>
				<button
					type="button"
					class="arrow previous"
					aria-label={t('mod:media-previous')}
					onclick={() => move(-1)}><Icon icon="chevronLeft" size={24} alt="" /></button
				>
				<button
					type="button"
					class="arrow next"
					aria-label={t('mod:media-next')}
					onclick={() => move(1)}><Icon icon="chevronRight" size={24} alt="" /></button
				>
			{/if}
			{#if current.type === 'image' && current.alt}<div class="caption">{current.alt}</div>{/if}
		</div>
		{#if slides.length > 1}<div class="thumbnails" aria-label={t('mod:media-slide-select')}>
				{#each slides as slide, index (slide.key)}
					<button
						type="button"
						class="thumbnail"
						class:active={index === activeIndex}
						aria-current={index === activeIndex ? 'true' : undefined}
						aria-label={t('mod:media-slide', { index: index + 1 })}
						onclick={() => (activeIndex = index)}
						onkeydown={(event) => {
							if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
								event.preventDefault()
								move(event.key === 'ArrowLeft' ? -1 : 1)
							}
						}}
					>
						{#if slide.type === 'video'}<span class="video-thumb"
								>▶ <span>{t('mod:media-video')}</span></span
							>{:else}<img src={slide.src} alt="" loading="lazy" />{/if}
					</button>
				{/each}
			</div>{/if}
	</section>
{/if}

<style>
	.media-gallery {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
		border-radius: 16px;
		outline-offset: 4px;
	}
	.stage {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border: 1px solid rgb(255 255 255 / 12%);
		border-radius: 16px;
		background: radial-gradient(ellipse at top, #202847, #080c20);
	}
	.slide-image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.image-error {
		display: grid;
		place-items: center;
		height: 100%;
		color: rgb(255 255 255 / 60%);
	}
	.counter {
		position: absolute;
		top: 14px;
		right: 14px;
		padding: 5px 10px;
		border-radius: 20px;
		background: rgb(3 6 28 / 75%);
		font-size: 13px;
		font-variant-numeric: tabular-nums;
		pointer-events: none;
	}
	.counter > span {
		opacity: 0.6;
	}
	.arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: grid;
		place-items: center;
		width: 38px;
		height: 44px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 12px;
		color: white;
		background: rgb(3 6 28 / 70%);
		cursor: pointer;
		transition: background 0.15s;
	}
	.arrow:hover {
		background: #3b84f1;
	}
	.previous {
		left: 12px;
	}
	.next {
		right: 12px;
	}
	.caption {
		position: absolute;
		inset: auto 0 0;
		padding: 28px 20px 14px;
		background: linear-gradient(transparent, rgb(0 0 0 / 75%));
		font-size: 14px;
		pointer-events: none;
		overflow-wrap: anywhere;
	}
	.thumbnails {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding: 2px 2px 6px;
	}
	.thumbnail {
		box-sizing: border-box;
		flex: 0 0 88px;
		height: 52px;
		padding: 0;
		overflow: hidden;
		border: 2px solid transparent;
		border-radius: 9px;
		background: #12152c;
		opacity: 0.55;
		cursor: pointer;
		transition:
			opacity 0.15s,
			border-color 0.15s;
	}
	.thumbnail.active {
		border-color: #3b84f1;
		opacity: 1;
	}
	.thumbnail:hover {
		opacity: 1;
	}
	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.video-thumb {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		height: 100%;
		color: white;
		font-size: 15px;
	}
	.video-thumb > span {
		font-size: 12px;
	}
	@media (max-width: 640px) {
		.stage {
			border-radius: 12px;
		}
		.arrow {
			width: 30px;
			height: 36px;
		}
		.previous {
			left: 8px;
		}
		.next {
			right: 8px;
		}
		.thumbnail {
			flex-basis: 72px;
			height: 44px;
		}
	}
</style>
