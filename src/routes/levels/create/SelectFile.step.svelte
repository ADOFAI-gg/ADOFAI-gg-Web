<script lang="ts">
	import type { Writable } from 'svelte/store'
	import {
		api,
		ky,
		type LevelUploadInfo,
		type PartialLevelCreatePayload,
		type UploadState
	} from '~/lib'
	import { FileUpload } from 'melt/builders'
	import FormTitle from '~/lib/components/form/FormTitle.svelte'
	import {
		Icon,
		LoadingSpinner,
		Translation,
		getGlobalContext,
		toast,
		translateKey
	} from '@adofai-gg/ui'
	import axios from 'axios'
	import { md5 } from 'js-md5'

	interface Props {
		payload: Writable<PartialLevelCreatePayload>
		uploadState: Writable<UploadState>
		onNext: () => void
		onFail: () => void
	}

	const { uploadState, onNext, onFail }: Props = $props()

	const { language } = getGlobalContext()

	let uploading = $state(false)

	const startUpload = async (file: File) => {
		uploading = true

		try {
			const ac = new AbortController()

			const buffer = await file.arrayBuffer()

			const hash = md5.create().update(buffer).base64()
			console.log(hash)

			const res = await ky.post(api.forum('levels/files/pre-signed-url'), {
				json: {
					fileName: file.name,
					contentMD5: hash,
					contentLength: file.size
				},
				credentials: 'include'
			})

			if (!res.ok) {
				console.error(res)
				throw new Error('server returned invalid status code: ' + res.status)
			}

			const data: LevelUploadInfo = await res.json()

			$uploadState = {
				abort: ac,
				status: 'uploading',
				progress: 0
			}

			onNext()

			await axios.request({
				// withCredentials: true,
				url: data.url,
				data: buffer,
				method: 'PUT',
				headers: {
					'Content-MD5': hash
				},
				onUploadProgress: (ev) => {
					$uploadState = {
						status: 'uploading',
						abort: ac,
						progress: ev.progress || 0
					}
				},
				signal: ac.signal
			})

			$uploadState = {
				status: 'complete',
				fileId: data.s3ObjectKey,
				fileName: file.name
			}
		} catch (e) {
			console.error(e)
			toast.error(
				translateKey($language, 'errors:level-upload-failed', { message: (e as Error).message })
			)
			$uploadState = {
				status: 'fail',
				error: e as Error
			}
			onFail()
		} finally {
			uploading = false
		}
	}

	const fileUpload = new FileUpload({
		onAccept: (file) => {
			startUpload(file)
		},
		onError: (e) => {
			console.error(e.message)
			switch (e.type) {
				case 'type':
					toast.error(translateKey($language, 'errors:invalid-file-type', {}))
					break
				case 'size':
					toast.error(translateKey($language, 'errors:file-too-big', { size: '3GB' }))
					break
			}
		},
		accept: 'application/zip,application/x-zip-compressed',
		maxSize: 1024 * 1024 * 1024 * 2,
		disabled: () => uploading
	})
</script>

<FormTitle>
	<Translation key="level-create:create-level" />
</FormTitle>

<div class="file-upload">
	<input {...fileUpload.input} />

	<div
		class="dropzone"
		class:uploading
		class:dragging={fileUpload.isDragging}
		{...fileUpload.dropzone}
	>
		{#if uploading}
			<LoadingSpinner />
		{:else}
			<Icon icon="fileWithUpArrow" alt="icon" size={48} />
			<div class="text-area">
				<div class="title">
					<Translation key="level-create:upload-level-title" />
				</div>

				<div class="subtitle">
					<Translation key="level-create:upload-level-subtitle" />
				</div>
			</div>
		{/if}
	</div>
</div>

<div class="disclaimer">
	<Translation key="level-create:upload-level-disclaimer" />
</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.dropzone {
		--outline-opacity: 0.2;

		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: center;
		justify-content: center;
		min-height: 240px;
		border: 1px solid rgba(255, 255, 255, var(--outline-opacity));
		border-radius: 8px;
		cursor: pointer;
		transition: border ease 0.2s;

		&:hover {
			--outline-opacity: 0.4;
		}

		&.dragging {
			border-color: $blue;
		}

		&.uploading {
			border-color: rgba(white, 0.2);
			cursor: default;
		}
	}

	.text-area {
		text-align: center;

		.title {
			font-size: 24px;
		}

		.subtitle {
			font-size: 16px;
		}
	}

	.disclaimer {
		color: rgba(white, 0.6);
		font-size: 12px;
		text-align: center;
	}
</style>
