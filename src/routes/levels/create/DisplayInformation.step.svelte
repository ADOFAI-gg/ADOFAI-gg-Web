<script lang="ts">
	import {
		Button,
		FormField,
		getGlobalContext,
		ModalActions,
		toast,
		translateKey,
		Translation,
		type TranslationKey
	} from '@adofai-gg/ui'
	import { FileUpload } from 'melt/builders'
	import type { Writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import {
		getYoutubeThumbnail,
		isWorkshopLink,
		isYouTubeLink,
		type PartialLevelCreatePayload
	} from '~/lib'
	import OutlinedInput from '~/lib/components/createLevel/OutlinedInput.svelte'
	import OutlinedTextarea from '~/lib/components/createLevel/OutlinedTextarea.svelte'
	import FormTitle from '~/lib/components/form/FormTitle.svelte'

	interface Props {
		payload: Writable<PartialLevelCreatePayload>
		onNext: () => void
	}

	let { payload, onNext }: Props = $props()

	const { language } = getGlobalContext()

	let errors = $state<Record<string, TranslationKey | undefined>>({})
	let submitted = $state(false)
	let hasErrors = $derived(submitted && Object.keys(errors).length > 0)
	let submitting = $state(false)

	let thumbnailDisplay = $state<string | null>(null)

	$effect(() => {
		if ($payload.thumbnail) {
			thumbnailDisplay = $payload.thumbnail.url
			return
		}
		thumbnailDisplay = getYoutubeThumbnail($payload.videoUrl)
	})

	const validate = (p: PartialLevelCreatePayload): boolean => {
		const newErrors: Record<string, TranslationKey> = {}
		let hasErrors = false

		if (!p.videoUrl) {
			newErrors.videoUrl = 'form:required'
			hasErrors = true
		} else if (!isYouTubeLink(p.videoUrl)) {
			newErrors.videoUrl = 'form:invalid-youtube-link'
			hasErrors = true
		}

		if (p.workshopUrl && !isWorkshopLink(p.workshopUrl)) {
			newErrors.workshopUrl = 'form:invalid-workshop-link'
			hasErrors = true
		}

		if (submitted) {
			errors = newErrors
		}

		return !hasErrors
	}

	const onSubmit = async () => {
		submitted = true
		submitting = true

		try {
			const p = $payload
			if (!validate(p)) {
				return
			}

			onNext()
		} finally {
			submitting = false
		}
	}

	$effect(() => {
		validate($payload)
	})

	const thumbnailUpload = new FileUpload({
		accept: 'image/png,image/jpeg,image/webp',
		maxSize: 1024 * 1024 * 4,
		disabled: () => submitting,
		onAccept: async (file) => {
			submitting = true

			try {
				if ($payload.thumbnail) {
					URL.revokeObjectURL($payload.thumbnail.url)
				}
				const bytes = await file.arrayBuffer()
				const blob = new Blob([bytes])
				$payload.thumbnail = {
					file,
					url: URL.createObjectURL(blob)
				}
			} finally {
				submitting = false
			}
		},
		onError: (e) => {
			switch (e.type) {
				case 'size':
					toast.error(translateKey($language, 'errors:file-too-big', { size: '4MB' }))
					return
				case 'type':
					toast.error(translateKey($language, 'errors:thumbnail-invalid-file-type', {}))
					return
				default:
					console.error(e)
					toast.error(e.message)
					return
			}
		}
	})
</script>

<form
	class="form"
	onsubmit={(e) => {
		e.preventDefault()
		onSubmit()
	}}
>
	<FormTitle>
		<Translation key="level-create:display-information" />
	</FormTitle>

	<FormField required label="level-create:video-url" subtitle="level-create:video-url-subtitle">
		<OutlinedInput
			disabled={submitting}
			error={errors.videoUrl}
			bind:value={$payload.videoUrl}
			placeholder={translateKey($language, 'level-create:video-url-placeholder', {})}
		/>
	</FormField>

	<FormField label="level-create:workshop-url">
		<OutlinedInput
			disabled={submitting}
			error={errors.workshopUrl}
			bind:value={$payload.workshopUrl}
			placeholder={translateKey($language, 'level-create:workshop-url-placeholder', {})}
		/>
	</FormField>

	<FormField label="level-create:thumbnail" subtitle="level-create:thumbnail-subtitle" noLabel>
		<div class="thumbnail-dropzone" {...thumbnailUpload.dropzone}>
			{#if thumbnailDisplay}
				<img src={thumbnailDisplay} alt="Thumbnail" class="thumbnail-image" draggable="false" />
			{:else}
				<div class="thumbnail-fallback"></div>
			{/if}

			{#if thumbnailUpload.isDragging}
				<div class="dropping-display" transition:fade={{ duration: 150 }}>
					<Translation key="level-create:thumbnail-drop-to-change" />
				</div>
			{/if}
		</div>

		<div class="field-actions">
			<input {...thumbnailUpload.input} />
			<Button size="md" type="button" {...thumbnailUpload.trigger}>
				<Translation key="level-create:change-thumbnail" />
			</Button>

			{#if $payload.thumbnail}
				<Button
					size="md"
					type="button"
					variant="outlined"
					onclick={() => {
						if ($payload.thumbnail) {
							URL.revokeObjectURL($payload.thumbnail.url)
						}

						$payload.thumbnail = undefined
					}}
				>
					<Translation key="level-create:reset-thumbnail" />
				</Button>
			{/if}
		</div>
	</FormField>

	<FormField label="level-create:description" subtitle="level-create:description-subtitle">
		<OutlinedTextarea
			bind:value={$payload.description}
			rows={6}
			placeholder={translateKey($language, 'level-create:description-placeholder', {})}
			maxlength={2000}
		/>
	</FormField>

	<ModalActions>
		{#snippet right()}
			<Button size="md" type="submit" disabled={hasErrors || submitting}>
				<Translation key="common:next" />
			</Button>
		{/snippet}
	</ModalActions>
</form>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.thumbnail-dropzone {
		position: relative;
		width: 100%;
		border-radius: 8px;
		aspect-ratio: 16 / 9;
	}

	.thumbnail-image {
		object-fit: cover;
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}

	.thumbnail-fallback {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.2);
		inset: 0;
	}

	.dropping-display {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: 8px;
		background-color: rgba($blue, 0.8);
		inset: 0;
	}

	.field-actions {
		display: flex;
		gap: 8px;
		margin-top: 8px;
	}
</style>
