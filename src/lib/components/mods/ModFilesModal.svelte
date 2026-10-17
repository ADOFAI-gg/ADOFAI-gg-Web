<script lang="ts">
	import {
		Button,
		Modal,
		ModalTitle,
		ModalActions,
		getGlobalContext,
		translateKey,
		toast,
		type TranslationKey
	} from '@adofai-gg/ui'
	import ModUploadFields from './ModUploadFields.svelte'
	import { api, ky } from '~/lib'
	import type { ModPlatform, ModPlatformFiles } from '~/lib/types/mod'
	let {
		open = $bindable(false),
		modId,
		version,
		files = {},
		onSaved
	}: {
		open?: boolean
		modId: string
		version: string
		files?: ModPlatformFiles
		onSaved: () => Promise<void>
	} = $props()
	const { language } = getGlobalContext()
	const t = (key: TranslationKey) => translateKey($language, key, {}, false)
	let selected = $state<Partial<Record<ModPlatform, File>>>({})
	let saving = $state(false)
	let crossPlatform = $state(false)
	let commonFile = $state<File | null>(null)
	$effect(() => {
		if (!open) {
			selected = {}
			crossPlatform = false
			commonFile = null
		}
	})
	async function save(close: () => void) {
		const uploads: [string, File][] = crossPlatform
			? (Object.entries(selected) as [ModPlatform, File][])
			: commonFile
				? [['file', commonFile]]
				: []
		if (saving) return
		if (!uploads.length) {
			close()
			return
		}
		if (uploads.reduce((size, [, file]) => size + file.size, 0) > 100 * 1024 * 1024) {
			toast.error(t('mod:manage-upload-error'))
			return
		}
		saving = true
		try {
			const body = new FormData()
			for (const [platform, file] of uploads) body.set(platform, file)
			await ky.post(
				api.forum(`mods/${encodeURIComponent(modId)}/${encodeURIComponent(version)}/files`),
				{ body, retry: 0 }
			)
			await onSaved()
			toast.success(t('mod:manage-saved'))
			close()
		} catch {
			toast.error(t('mod:manage-upload-error'))
		} finally {
			saving = false
		}
	}
</script>

<Modal
	bind:open
	options={{ escapeBehavior: saving ? 'ignore' : 'close', closeOnOutsideClick: !saving }}
>
	{#snippet children({ close })}
		<ModalTitle>{t('mod:manage-upload-file-label')}</ModalTitle>
		<form
			class="files-form"
			onsubmit={(event) => {
				event.preventDefault()
				save(close)
			}}
		>
			<ModUploadFields bind:crossPlatform bind:commonFile bind:selected {files} disabled={saving} />
			<ModalActions>
				{#snippet left()}<Button
						type="button"
						variant="ghost-light"
						size="md"
						disabled={saving}
						onclick={close}>{t('mod:cancel')}</Button
					>{/snippet}
				{#snippet right()}<Button type="submit" size="md" disabled={saving}
						>{t('mod:manage-save')}</Button
					>{/snippet}
			</ModalActions>
		</form>
	{/snippet}
</Modal>

<style>
	.files-form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
</style>
