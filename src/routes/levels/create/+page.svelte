<script lang="ts">
	import { dev } from '$app/environment'
	import { getGlobalContext, Panel, translateKey, Translation } from '@adofai-gg/ui'
	import { derived, writable } from 'svelte/store'
	import {
		api,
		ky,
		type APILevel,
		type APIMember,
		type APIMusic,
		type LevelCreatePayload,
		type LevelUploadInfo,
		type MemberIdOrCreate,
		type MusicIdOrCreate,
		type PartialLevelCreatePayload,
		type UploadState
	} from '~/lib'
	import BasicInformation from './BasicInformation.step.svelte'
	import SelectFile from './SelectFile.step.svelte'
	import DisplayInformation from './DisplayInformation.step.svelte'
	import LevelInformation from './LevelInformation.step.svelte'
	import { beforeNavigate, goto } from '$app/navigation'
	import { md5 } from 'js-md5'
	import { onDestroy } from 'svelte'
	import axios from 'axios'
	import Progress from '~/lib/components/Progress.svelte'
	import type { PageData } from './$types'
	import { getAvatarUrl } from '~/lib/utils/avatar'

	enum UploadStep {
		FileUpload,
		BasicInformation,
		DisplayInformation,
		LevelInformation
	}

	let { data: pageData }: { data: PageData } = $props()

	const step = writable(UploadStep.FileUpload)
	const uploadState = writable<UploadState>({ status: 'idle' })

	const { language } = getGlobalContext()

	let payload = writable<PartialLevelCreatePayload>({
		music: undefined,
		thumbnail: undefined,

		creators: [
			{
				exists: true,
				id: pageData.currentUser!.id,
				data: {
					name: pageData.currentUser!.displayName,
					avatarUrl: getAvatarUrl(
						pageData.currentUser!.authUserId,
						pageData.currentUser!.avatar,
						'creator'
					),
					locked: true
				}
			}
		],
		appendingTitle: '',
		creatorAlias: '',
		description: '',

		videoUrl: '',
		workshopUrl: '',

		tiles: null,
		minBPM: null,
		maxBPM: null,

		expectedDifficulty: null,
		limits: {
			neoCosmos: false,
			seizure: false
		}
	})

	beforeNavigate((nav) => {
		if (nav.type === 'leave') {
			nav.cancel()
		}
		if (nav.type === 'link' || nav.type === 'popstate') {
			if (!confirm(translateKey($language, 'level-create:leave-alert', {}))) {
				nav.cancel()
			}
		}
	})

	const createMember = async (member: MemberIdOrCreate): Promise<number> => {
		if (member.exists) return member.id

		const res = await ky.post(api.forum('members/forum'), {
			json: {
				name: member.data.name
			},
			credentials: 'include'
		})

		if (!res.ok) {
			throw new Error(
				`Failed to create member ${member.data.name}: server returned status code ${res.status}`
			)
		}

		const data: APIMember = await res.json()

		return data.id
	}

	const createMusic = async (music: MusicIdOrCreate): Promise<number> => {
		if (music.exists) return music.id

		const artists = await Promise.all(music.data.artists.map(createMember))

		const res = await ky.post(api.forum('music'), {
			json: {
				name: music.data.name,
				artists
			},
			credentials: 'include'
		})

		if (!res.ok) {
			throw new Error(
				`Failed to create music ${music.data.name}: server returned status code ${res.status}`
			)
		}

		const data: APIMusic = await res.json()

		return data.id
	}

	const uploadThumbnail = async (file: LevelCreatePayload['thumbnail']) => {
		if (!file) return null

		const f = file.file

		const buffer = await f.arrayBuffer()
		const hash = md5.create().update(buffer).base64()

		const res = await ky.post(api.forum('levels/files/pre-signed-url'), {
			json: {
				fileName: f.name,
				contentMD5: hash,
				contentLength: f.size
			},
			credentials: 'include'
		})

		if (!res.ok) {
			console.error(res)
			throw new Error(
				'failed to upload thumbnail: server returned invalid status code: ' + res.status
			)
		}

		const data: LevelUploadInfo = await res.json()

		await axios.request({
			// withCredentials: true,
			url: data.url,
			data: buffer,
			method: 'PUT',
			headers: {
				'Content-MD5': hash
			}
		})

		return {
			fileName: file.file.name,
			s3ObjectKey: data.s3ObjectKey
		}
	}

	onDestroy(() => {
		if ($uploadState.status === 'uploading') {
			$uploadState.abort.abort()
		}
	})

	const submitLevel = async () => {
		const data: LevelCreatePayload = JSON.parse(JSON.stringify($payload))

		if ($uploadState.status !== 'complete') throw new Error('download is not complete')

		const musicId = await createMusic(data.music)
		const creators = data.creators.map((x) => {
			if (!x.exists) throw new Error('what')
			return { id: x.id }
		})
		const appendingTitle = data.appendingTitle || null
		const creatorAlias = data.creatorAlias || null
		const workshopUrl = data.workshopUrl || null
		const videoUrl = data.videoUrl
		const description = data.description || null
		const tile = data.tiles!
		const minBpm = data.minBPM!
		const maxBpm = data.maxBPM!
		const expectedDifficulty = data.expectedDifficulty!
		const thumbnail = await uploadThumbnail($payload.thumbnail)
		const file = {
			s3ObjectKey: $uploadState.fileId,
			fileName: $uploadState.fileName
		}
		const dlc = data.limits.neoCosmos
		const epilepsyWarning = data.limits.seizure

		const res = await ky.post(api.forum('levels'), {
			json: {
				musicId,
				creators,
				appendingTitle,
				creatorAlias,
				workshopUrl,
				videoUrl,
				description,
				tile,
				minBpm,
				maxBpm,
				expectedDifficulty,
				thumbnail,
				file,
				dlc,
				epilepsyWarning
			},
			credentials: 'include'
		})

		if (!res.ok) {
			throw new Error(`Failed to create level: server returned status code ${res.status}`)
		}

		const level: APILevel = await res.json()

		await goto(`/levels/${level.id}`)
	}

	const progress = derived(uploadState, (x) => {
		if (x.status !== 'uploading') return 0
		return Math.floor(x.progress * 100)
	})
</script>

<div class="create-level-root">
	{#if $uploadState.status === 'uploading'}
		<Panel noPadding>
			<div class="uploading">
				<div class="uploading-text-area">
					<Translation key="level-create:uploading" />

					<div class="uploading-progress-text">{$progress}%</div>
				</div>
				<div class="uploading-content">
					<div class="uploading-progress">
						<Progress max={100} value={$progress} />
					</div>
				</div>
			</div>
		</Panel>
	{/if}

	<Panel noPadding>
		{#if $step === UploadStep.FileUpload}
			<SelectFile
				{payload}
				{uploadState}
				onFail={() => step.set(UploadStep.FileUpload)}
				onNext={() => {
					step.set(UploadStep.BasicInformation)
				}}
			/>
		{:else if $step === UploadStep.BasicInformation}
			<BasicInformation
				{payload}
				onNext={() => {
					step.set(UploadStep.DisplayInformation)
				}}
			/>
		{:else if $step === UploadStep.DisplayInformation}
			<DisplayInformation
				{payload}
				onNext={() => {
					step.set(UploadStep.LevelInformation)
				}}
			/>
		{:else if $step === UploadStep.LevelInformation}
			<LevelInformation {payload} onNext={submitLevel} />
		{/if}

		{#if dev}
			<pre><code>{JSON.stringify($payload, null, 2)}</code></pre>
		{/if}
	</Panel>
</div>

<style lang="scss">
	.uploading {
		display: flex;
		flex-direction: column;
		gap: 2px;

		&-text-area {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: 500;
			font-size: 16px;
		}

		&-progress-text {
			font-weight: 500;
			font-size: 12px;
			opacity: 0.4;
		}

		&-progress {
			flex-grow: 1;
		}
	}

	.create-level-root {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		gap: 16px;
		align-items: center;
		justify-content: center;
		padding: 16px;

		> :global(.panel) {
			display: flex;
			flex-direction: column;
			gap: 24px;
			width: 100%;
			max-width: 564px;
			padding: 32px;
		}

		:global(.form-field-content > .content) {
			margin-top: 8px;
		}
	}
</style>
