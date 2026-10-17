<script lang="ts">
	import {
		LabeledCheckbox,
		getGlobalContext,
		translateKey,
		type TranslationKey
	} from '@adofai-gg/ui'
	import type { ModPlatform, ModPlatformFiles } from '~/lib/types/mod'
	let {
		crossPlatform = $bindable(false),
		commonFile = $bindable<File | null>(null),
		selected = $bindable<Partial<Record<ModPlatform, File>>>({}),
		files = {},
		disabled = false
	}: {
		crossPlatform?: boolean
		commonFile?: File | null
		selected?: Partial<Record<ModPlatform, File>>
		files?: ModPlatformFiles
		disabled?: boolean
	} = $props()
	const platforms: { key: ModPlatform; label: string }[] = [
		{ key: 'windows', label: 'Windows' },
		{ key: 'macos', label: 'MacOS' },
		{ key: 'linux', label: 'Linux' }
	]
	const { language } = getGlobalContext()
	const t = (key: TranslationKey) => translateKey($language, key, {}, false)
</script>

<div class="upload-fields">
	<LabeledCheckbox bind:checked={crossPlatform} {disabled}
		>{t('mod:manage-cross-platform')}</LabeledCheckbox
	>
	<div class="file-fields">
		{#if crossPlatform}
			{#each platforms as platform}
				<label class="file-field">
					<span class="os">{platform.label}</span>
					<span
						class="file-control"
						class:placeholder={!selected[platform.key] && !files[platform.key]}
					>
						<span class="filename"
							>{selected[platform.key]?.name ??
								files[platform.key]?.name ??
								t('mod:manage-file-select')}</span
						>
						<input
							type="file"
							accept=".zip,application/zip"
							aria-label={platform.label}
							{disabled}
							onchange={(event) => {
								const file = event.currentTarget.files?.[0]
								if (file) selected[platform.key] = file
							}}
						/>
					</span>
				</label>
			{/each}
		{:else}
			<label class="file-field">
				<span class="os">{t('mod:manage-all-platforms')}</span>
				<span class="file-control" class:placeholder={!commonFile}>
					<span class="filename">{commonFile?.name ?? t('mod:manage-file-select')}</span>
					<input
						type="file"
						accept=".zip,application/zip"
						aria-label={t('mod:manage-all-platforms')}
						{disabled}
						onchange={(event) => (commonFile = event.currentTarget.files?.[0] ?? null)}
					/>
				</span>
			</label>
		{/if}
	</div>
</div>

<style>
	.upload-fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.file-fields {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.file-field {
		display: flex;
		align-items: center;
		gap: 18px;
		height: 38px;
		min-width: 0;
		font-size: 16px;
		line-height: 1.4;
	}
	.os {
		flex-shrink: 0;
		font-weight: 500;
	}
	.file-control {
		position: relative;
		box-sizing: border-box;
		height: 38px;
		display: flex;
		align-items: center;
		flex: 1;
		min-width: 0;
		padding: 8px 0;
		border-bottom: 1px solid rgb(255 255 255 / 20%);
		cursor: pointer;
	}
	.file-control:focus-within {
		outline: 2px solid #3b84f1;
		outline-offset: 2px;
	}
	.file-control.placeholder {
		color: rgb(255 255 255 / 50%);
	}
	.filename {
		display: block;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
</style>
