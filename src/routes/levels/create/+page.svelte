<script lang="ts">
	import { dev } from '$app/environment'
	import { getGlobalContext, Panel, translateKey } from '@adofai-gg/ui'
	import { writable } from 'svelte/store'
	import {
		api,
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

	enum UploadStep {
		FileUpload,
		BasicInformation,
		DisplayInformation,
		LevelInformation
	}

	const step = writable(UploadStep.FileUpload)
	const uploadState = writable<UploadState>({ status: 'idle' })

	const { language } = getGlobalContext()

	let payload = writable<PartialLevelCreatePayload>({
		music: undefined,
		thumbnail: undefined,

		creators: [],
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

		const res = await fetch(api.forum('members/forum'), {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: member.data.name
			}),
			credentials: 'include',
			method: 'POST'
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

		const res = await fetch(api.forum('music'), {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: music.data.name,
				artists
			}),
			credentials: 'include',
			method: 'POST'
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

		const buffer = await file.file.arrayBuffer()

		const hash = md5.create().update(buffer).base64()
		console.log(hash)

		const res = await fetch(api.forum('levels/files/pre-signed-url'), {
			body: JSON.stringify({
				fileName: file.file.name,
				contentMD5: hash,
				contentLength: file.file.size
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
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
			withCredentials: true,
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
		const thumbnail = await uploadThumbnail(data.thumbnail)
		const file = {
			s3ObjectKey: $uploadState.fileId,
			fileName: $uploadState.fileName
		}

		const res = await fetch(api.forum('levels'), {
			body: JSON.stringify({
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
				file
			}),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})

		if (!res.ok) {
			throw new Error(`Failed to create level: server returned status code ${res.status}`)
		}

		const level: APILevel = await res.json()

		await goto(`/levels/${level.id}`)
	}
</script>

<div class="create-level-root">
	{#if $uploadState.status === 'uploading'}
		<Panel noPadding>
			Uploading: {$uploadState.progress}
		</Panel>
	{/if}

	<Panel noPadding>
		{#if $step === UploadStep.FileUpload}
			<SelectFile
				{payload}
				{uploadState}
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
	.create-level-root {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		gap: 32px;
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
