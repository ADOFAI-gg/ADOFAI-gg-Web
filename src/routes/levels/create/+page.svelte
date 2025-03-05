<script lang="ts">
	import { dev } from '$app/environment'
	import { Panel } from '@adofai-gg/ui'
	import { writable } from 'svelte/store'
	import type { PartialLevelCreatePayload, UploadState } from '~/lib'
	import BasicInformation from './BasicInformation.step.svelte'
	import SelectFile from './SelectFile.step.svelte'

	enum UploadStep {
		FileUpload,
		BasicInformation
	}

	const step = writable(UploadStep.FileUpload)
	const uploadState = writable<UploadState>({ status: 'idle' })

	let payload = writable<PartialLevelCreatePayload>({
		creators: [],
		appendingTitle: '',
		creatorAlias: ''
	})
</script>

<div class="create-level-root">
	<Panel noPadding>
		{#if $step === UploadStep.FileUpload}
			<SelectFile
				{payload}
				{uploadState}
				onNext={() => {
					$step = UploadStep.BasicInformation
				}}
			/>
		{:else if $step === UploadStep.BasicInformation}
			<BasicInformation {payload} />
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
