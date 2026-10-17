<script lang="ts">
	import {
		Button,
		Modal,
		ModalTitle,
		ModalActions,
		Translation,
		getGlobalContext,
		translateKey,
		type TranslationKey
	} from '@adofai-gg/ui'
	import { modDownloadUrl, type APIModVersion, type APIMod } from '~/lib/types/mod'
	let {
		open = $bindable(false),
		mod,
		versions,
		version = $bindable('')
	}: { open?: boolean; mod: APIMod; versions: APIModVersion[]; version?: string } = $props()
	const { language } = getGlobalContext()
	const t = (key: TranslationKey) => translateKey($language, key, {}, false)
	const releases = $derived(versions.length ? versions : [{ ...mod, version: mod.version ?? '' }])
	const selected = $derived(releases.find((release) => release.version === version))
	const url = $derived(selected ? modDownloadUrl(selected) : null)
</script>

<Modal bind:open>
	{#snippet children({ close })}
		<ModalTitle><Translation key="mod:download-title" params={{ name: mod.name }} /></ModalTitle>
		<div class="field">
			<label for="download-game"><Translation key="mod:game-version" /></label>
			<p><Translation key="mod:compatibility-hint" /></p>
			<select id="download-game" disabled><option>{t('mod:compatibility-unknown')}</option></select>
		</div>
		<div class="field">
			<label for="download-version"
				><Translation key="mod:version" /> <span><Translation key="mod:required" /></span></label
			>
			<select id="download-version" bind:value={version} required>
				{#each releases as release}<option value={release.version}
						>{release.version || t('mod:no-version')}</option
					>{/each}
			</select>
		</div>
		<!--
		<div class="field">
			<label for="download-os"><Translation key="mod:os" /></label>
			<p><Translation key="mod:os-unknown" /></p>
			<select id="download-os" disabled><option>{t('mod:compatibility-unknown')}</option></select>
		</div>
		-->
		<ModalActions>
			{#snippet left()}<Button variant="ghost-light" size="sm" onclick={close}
					><Translation key="mod:cancel" /></Button
				>{/snippet}
			{#snippet right()}
				{#if url}<Button
						link
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						size="sm"
						onclick={close}><Translation key="mod:download" /></Button
					>
				{:else}<Button disabled size="sm"><Translation key="mod:no-download" /></Button>{/if}
			{/snippet}
		</ModalActions>
	{/snippet}
</Modal>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	label {
		font-weight: 500;
	}
	label span {
		color: #f54f51;
		font-size: 12px;
	}
	p {
		color: rgb(255 255 255 / 80%);
		line-height: 1.4;
	}
	select {
		width: 100%;
		min-height: 38px;
		padding: 8px 16px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
		color: white;
		background: #03061c;
		font: inherit;
	}
	select:disabled {
		opacity: 0.6;
	}
</style>
