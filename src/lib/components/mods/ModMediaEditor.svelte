<script lang="ts">
	import { onDestroy } from 'svelte'
	import OutlinedInput from '~/lib/components/createLevel/OutlinedInput.svelte'
	import { Icon, getGlobalContext, translateKey, toast, type TranslationKey } from '@adofai-gg/ui'
	import { api, ky } from '~/lib'
	import type { APIModImage } from '~/lib/types/mod'
	import ModMediaGallery from './ModMediaGallery.svelte'
	let {
		modId,
		images = $bindable<APIModImage[]>([]),
		videoUrl = $bindable(''),
		uploading = $bindable(false),
		disabled = false
	}: {
		modId: string
		images?: APIModImage[]
		videoUrl?: string
		uploading?: boolean
		disabled?: boolean
	} = $props()
	const { language } = getGlobalContext()
	const t = (key: TranslationKey, params = {}) => translateKey($language, key, params, false)
	const controller = new AbortController()
	let dragging = $state(false)
	let dragIndex = $state<number | null>(null)
	let activeIndex = $state(0)
	let completed = $state(0)
	let total = $state(0)
	onDestroy(() => {
		controller.abort()
		uploading = false
	})
	async function upload(files: File[]) {
		if (disabled || uploading || !files.length) return
		const remaining = 10 - images.length
		if (files.length > remaining) toast.error(t('mod:media-limit'))
		const selected = files.slice(0, Math.max(0, remaining))
		if (!selected.length) return
		if (
			selected.some(
				(file) =>
					file.size > 10 * 1024 * 1024 || !file.size || !/\.(png|jpe?g|gif|webp)$/i.test(file.name)
			)
		) {
			toast.error(t('mod:media-upload-error'))
			return
		}
		uploading = true
		completed = 0
		total = selected.length
		try {
			for (const file of selected) {
				const body = new FormData()
				body.set('file', file)
				const image = await ky
					.post(api.forum(`mods/${encodeURIComponent(modId)}/images`), {
						body,
						signal: controller.signal,
						retry: 0
					})
					.json<APIModImage>()
				if (controller.signal.aborted) return
				if (!images.some((item) => item.id === image.id)) images = [...images, image]
				completed += 1
			}
			toast.success(t('mod:media-uploaded'))
		} catch {
			if (!controller.signal.aborted) toast.error(t('mod:media-upload-error'))
		} finally {
			uploading = false
		}
	}
	function move(from: number, to: number) {
		if (disabled || uploading || to < 0 || to >= images.length) return
		const next = [...images]
		const [image] = next.splice(from, 1)
		next.splice(to, 0, image)
		images = next
		activeIndex = 0
	}
	function remove(index: number) {
		images = images.filter((_, at) => at !== index)
		activeIndex = 0
	}
</script>

<section class="media-editor" aria-label={t('mod:media-editor')}>
	<div class="editor-heading">
		<div>
			<h2>{t('mod:media-editor')}</h2>
		</div>
		<span class="image-count">{images.length}<span> / 10</span></span>
	</div>
	<div class="video-field">
		<label for="mod-video">{t('mod:manage-video-url')}</label>
		<OutlinedInput
			id="mod-video"
			type="url"
			maxlength={2000}
			placeholder="https://youtu.be/..."
			bind:value={videoUrl}
			disabled={disabled || uploading}
		/>
		<p>{t('mod:media-video-first')}</p>
	</div>
	<label
		class="dropzone"
		class:dragging
		class:busy={uploading}
		ondragover={(event) => {
			event.preventDefault()
			if (!disabled && !uploading) dragging = true
		}}
		ondragleave={() => (dragging = false)}
		ondrop={(event) => {
			event.preventDefault()
			dragging = false
			upload([...(event.dataTransfer?.files ?? [])])
		}}
	>
		<Icon icon="plusFilled" size={28} alt="" />
		<span class="drop-title"
			>{uploading ? t('mod:media-uploading', { completed, total }) : t('mod:media-add')}</span
		>
		<span class="drop-hint">{t('mod:media-formats')}</span>
		<input
			type="file"
			multiple
			accept="image/png,image/jpeg,image/gif,image/webp"
			aria-label={t('mod:media-add')}
			disabled={disabled || uploading || images.length >= 10}
			onchange={(event) => {
				upload([...(event.currentTarget.files ?? [])])
				event.currentTarget.value = ''
			}}
		/>
	</label>
	{#if images.length}
		<ol class="image-grid">
			{#each images as image, index (image.id)}
				<li
					class="image-card"
					draggable={!disabled && !uploading}
					ondragstart={(event) => {
						dragIndex = index
						event.dataTransfer?.setData('text/plain', String(index))
					}}
					ondragend={() => (dragIndex = null)}
					ondragover={(event) => event.preventDefault()}
					ondrop={(event) => {
						event.preventDefault()
						if (dragIndex !== null) move(dragIndex, index)
						dragIndex = null
					}}
				>
					<div class="image-preview">
						<img src={api.forum(image.path)} alt={image.alt || image.name} /><span class="number"
							>{index + 1}</span
						>
						<button
							type="button"
							class="remove"
							aria-label={t('mod:media-remove', { index: index + 1 })}
							disabled={disabled || uploading}
							onclick={() => remove(index)}><Icon icon="trash" size={16} alt="" /></button
						>
					</div>
					<div class="card-details">
						<span class="filename" title={image.name}>{image.name}</span>
						<input
							type="text"
							maxlength={500}
							value={image.alt}
							aria-label={t('mod:media-caption', { index: index + 1 })}
							placeholder={t('mod:media-caption-placeholder')}
							disabled={disabled || uploading}
							oninput={(event) => {
								images = images.map((item, at) =>
									at === index ? { ...item, alt: event.currentTarget.value } : item
								)
							}}
						/>
						<div class="order-controls">
							<button
								type="button"
								disabled={disabled || uploading || index === 0}
								aria-label={t('mod:media-move-left', { index: index + 1 })}
								onclick={() => move(index, index - 1)}
								><Icon icon="chevronLeft" size={16} alt="" /></button
							><span>{t('mod:media-order')}</span><button
								type="button"
								disabled={disabled || uploading || index === images.length - 1}
								aria-label={t('mod:media-move-right', { index: index + 1 })}
								onclick={() => move(index, index + 1)}
								><Icon icon="chevronRight" size={16} alt="" /></button
							>
						</div>
					</div>
				</li>
			{/each}
		</ol>
	{/if}
</section>

<style>
	.video-field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.video-field label {
		font-size: 14px;
		font-weight: 600;
	}
	.video-field p {
		margin: 0;
		font-size: 12px;
		color: rgb(255 255 255 / 55%);
		line-height: 1.6;
	}

	.media-editor {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
		border: 1px solid rgb(255 255 255 / 13%);
		border-radius: 16px;
		background: rgb(3 6 28 / 15%);
		min-width: 0;
	}
	.editor-heading {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
	}
	h2 {
		margin: 0;
		font-size: 17px;
		font-weight: 600;
	}
	p {
		margin: 5px 0 0;
		font-size: 12px;
		line-height: 1.6;
		color: rgb(255 255 255 / 50%);
	}
	.image-count {
		flex-shrink: 0;
		padding: 5px 10px;
		border-radius: 20px;
		background: rgb(255 255 255 / 6%);
		font-size: 13px;
		font-variant-numeric: tabular-nums;
	}
	.image-count > span {
		opacity: 0.5;
	}
	.dropzone {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 28px 16px;
		border: 1px dashed rgb(59 132 241 / 55%);
		border-radius: 12px;
		background: rgb(59 132 241 / 5%);
		cursor: pointer;
		text-align: center;
		transition:
			background 0.15s,
			border-color 0.15s;
	}
	.dropzone:hover,
	.dropzone.dragging {
		background: rgb(59 132 241 / 15%);
		border-color: #3b84f1;
	}
	.dropzone:focus-within {
		outline: 2px solid #3b84f1;
		outline-offset: 2px;
	}
	.dropzone.busy {
		cursor: progress;
	}
	.drop-title {
		font-size: 14px;
		font-weight: 500;
	}
	.drop-hint {
		font-size: 12px;
		color: rgb(255 255 255 / 45%);
	}
	.dropzone > input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: inherit;
	}
	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 12px;
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.image-card {
		min-width: 0;
		overflow: hidden;
		border: 1px solid rgb(255 255 255 / 12%);
		border-radius: 12px;
		background: #12152c;
		cursor: grab;
	}
	.image-card:active {
		cursor: grabbing;
	}
	.image-preview {
		position: relative;
		aspect-ratio: 16 / 9;
		background: #080c20;
	}
	.image-preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.number {
		position: absolute;
		top: 8px;
		left: 8px;
		display: grid;
		place-items: center;
		min-width: 24px;
		height: 24px;
		border-radius: 7px;
		background: rgb(3 6 28 / 80%);
		font-size: 12px;
		font-weight: 600;
	}
	.remove {
		position: absolute;
		top: 8px;
		right: 8px;
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border: 0;
		border-radius: 7px;
		color: white;
		background: rgb(3 6 28 / 80%);
		cursor: pointer;
	}
	.remove:hover {
		background: #bb3b47;
	}
	.card-details {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
	}
	.filename {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 12px;
		color: rgb(255 255 255 / 60%);
	}
	.card-details input {
		box-sizing: border-box;
		width: 100%;
		padding: 8px;
		border: 1px solid rgb(255 255 255 / 15%);
		border-radius: 6px;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 12px;
		cursor: text;
	}
	.order-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: rgb(255 255 255 / 40%);
		font-size: 11px;
	}
	.order-controls button {
		display: grid;
		place-items: center;
		width: 28px;
		height: 24px;
		padding: 0;
		border: 1px solid rgb(255 255 255 / 12%);
		border-radius: 6px;
		background: transparent;
		color: white;
		cursor: pointer;
	}
	button:disabled {
		opacity: 0.3;
		cursor: default;
	}
	.preview-heading {
		font-size: 12px;
		color: rgb(255 255 255 / 60%);
		font-weight: 500;
	}
	@media (max-width: 640px) {
		.media-editor {
			padding: 14px;
		}
		.image-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
