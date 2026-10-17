<script lang="ts">
	import {
		Avatar,
		Tag,
		Modal,
		ModalTitle,
		ModalActions,
		Button,
		Icon,
		LabeledCheckbox,
		toast,
		getGlobalContext,
		translateKey,
		type TranslationKey
	} from '@adofai-gg/ui'
	import { api, ky } from '~/lib'
	import { isForumAdmin } from '~/lib/utils/perm'
	import type {
		APIModListItem,
		APIModTag,
		ModDeveloper,
		ModPlatform,
		APIModImage
	} from '~/lib/types/mod'
	import { invalidateAll, replaceState } from '$app/navigation'
	import type { PageProps } from './$types'
	import { page } from '$app/state'
	import { untrack, tick } from 'svelte'

	import ModMediaEditor from '~/lib/components/mods/ModMediaEditor.svelte'
	import ModUploadFields from '~/lib/components/mods/ModUploadFields.svelte'
	import ModFilesModal from '~/lib/components/mods/ModFilesModal.svelte'
	import ModDescriptionEditor from '~/lib/components/mods/ModDescriptionEditor.svelte'
	import defaultImage from '~/lib/assets/defaultAvatars/dark.png'
	import searchIcon from '~/lib/assets/mod-manage/search.svg'
	import uploadIcon from '~/lib/assets/mod-manage/upload.svg'
	import pencilIcon from '~/lib/assets/mod-manage/pencil.svg'
	import dateIcon from '~/lib/assets/mod-manage/date.svg'
	import { safeModUrl } from '~/lib/types/mod'
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import OutlinedInput from '~/lib/components/createLevel/OutlinedInput.svelte'

	const { language } = getGlobalContext()
	const t = (key: TranslationKey, params = {}) => translateKey($language, key, params, false)

	let { data }: PageProps = $props()
	const initialMod = untrack(() => data.mod)

	const tagLabels: Record<APIModTag, string> = $derived({
		OFFICIAL: t('mod:tag-official'),
		LIBRARY: 'Library',
		LEVEL_EDITOR_ADD_ON: 'Level Editor Add-On',
		OVERLAY: 'Overlay',
		MISCELLANEOUS: 'Miscellaneous'
	})
	const tagChipLabels: Record<APIModTag, string> = {
		OFFICIAL: 'ADOFAI.gg OFFICIAL',
		LIBRARY: 'LIBRARY',
		LEVEL_EDITOR_ADD_ON: 'LEVEL EDITOR ADD-ON',
		OVERLAY: 'OVERLAY',
		MISCELLANEOUS: 'MISCELLANEOUS'
	}

	const isAdminUser = $derived(isForumAdmin(page.data.currentUser as { roleFlag?: number } | null))
	const mod = $derived(data.mod)
	const modVersions = $derived(mod.versions)

	let list = $state<APIModListItem[]>(untrack(() => data.list ?? []))
	let listLoading = $state(false)
	let saving = $state(false)

	// ---- info form -----------------------------------------------------------
	let nameInput = $state(initialMod.name)
	let descriptionInput = $state(initialMod.description ?? '')
	let licenseInput = $state(initialMod.license ?? '')
	let licenseUrlInput = $state(initialMod.licenseUrl ?? '')
	let selectedTags = $state<APIModTag[]>([...initialMod.tags])
	let hideFromSearch = $state(initialMod.hideFromSearch ?? false)
	let currentVersion = $state(initialMod.version ?? '')
	let isBetaInput = $state(initialMod.isBeta ?? false)
	let videoUrlInput = $state(initialMod.videoUrl ?? '')
	let imagesInput = $state<APIModImage[]>([...(initialMod.images ?? [])])
	let imagesUploading = $state(false)
	let licenseModal = $state(false)
	let licenseDraft = $state('')
	let licenseUrlDraft = $state('')
	let editingVersion = $state<string | null>(null)
	let loadedModId = $state(initialMod.id)
	const selectedRelease = $derived(
		modVersions.find((release) => release.version === editingVersion)
	)
	const displayedFiles = $derived(
		editingVersion ? (selectedRelease?.files ?? {}) : (mod.files ?? {})
	)
	const displayedDownloadUrl = $derived(
		editingVersion ? (selectedRelease?.downloadUrl ?? null) : mod.downloadUrl
	)
	const displayedDownloadName = $derived(
		editingVersion ? (selectedRelease?.downloadName ?? null) : mod.downloadName
	)
	let filesVersion = $state<string | null>(null)
	let tagSearch = $state('')
	let search = $state(untrack(() => data.search ?? ''))
	let mineOnly = $state(untrack(() => data.mineOnly ?? false))
	let devSaving = $state(false)

	$effect.pre(() => {
		const { mod } = data
		const key = untrack(() => (loadedModId === mod.id ? editingVersion : null))
		const release = key ? mod.versions.find((release) => release.version === key) : null
		if (!release) editingVersion = null
		loadedModId = mod.id
		list = data.list ?? []
		mineOnly = data.mineOnly ?? false
		search = data.search ?? ''
		nameInput = release?.name ?? mod.name
		descriptionInput = release ? (release.description ?? '') : (mod.description ?? '')
		licenseInput = mod.license ?? ''
		licenseUrlInput = mod.licenseUrl ?? ''
		selectedTags = [...mod.tags]
		hideFromSearch = mod.hideFromSearch ?? false
		currentVersion = release?.version ?? mod.version ?? ''
		isBetaInput = release ? (release.isBeta ?? false) : (mod.isBeta ?? false)
		videoUrlInput = release ? (release.videoUrl ?? '') : (mod.videoUrl ?? '')
		imagesInput = [...(release ? (release.images ?? []) : (mod.images ?? []))]
	})

	async function saveInfo() {
		if (editingVersion) {
			await saveVersion(editingVersion)
			return
		}
		if (
			saving ||
			imagesUploading ||
			!nameInput.trim() ||
			!currentVersion.trim() ||
			descriptionInput.length > 5000
		)
			return
		if (
			currentVersion.trim() !== mod.version &&
			modVersions.some((version) => version.version === currentVersion.trim())
		) {
			toast.error(t('mod:manage-version-exists'))
			return
		}
		saving = true
		try {
			await ky.patch(api.forum(`mods/${encodeURIComponent(mod.id)}/manage`), {
				json: {
					name: nameInput,
					description: descriptionInput,
					hideFromSearch,
					...(currentVersion.trim() !== (mod.version ?? '')
						? { renameVersion: currentVersion.trim() }
						: {}),
					videoUrl: videoUrlInput,
					isBeta: isBetaInput,
					images: imagesInput.map(({ id, name, alt }) => ({ id, name, alt })),
					license: licenseInput,
					licenseUrl: licenseUrlInput,
					...(selectedTags.join(',') !== mod.tags.join(',') ? { tags: selectedTags } : {})
				},
				retry: 0
			})
			toast.success(t('mod:manage-saved'))
			editingVersion = null
			await invalidateAll()
		} catch {
			toast.error(t('mod:manage-save-error'))
		} finally {
			saving = false
		}
	}

	// ---- selected release editing -------------------------------------------
	function editVersion(version: string) {
		if (saving || imagesUploading) return
		const release = modVersions.find((release) => release.version === version)
		if (!release) return
		editingVersion = version
		nameInput = release.name
		descriptionInput = release.description ?? ''
		isBetaInput = release.isBeta ?? false
		currentVersion = release.version
		videoUrlInput = release.videoUrl ?? ''
		imagesInput = [...(release.images ?? [])]
		tagsPopover = false
		devPopover = false
		const main = document.querySelector('.manage-main')
		main?.scrollTo({ top: 0 })
		if (window.innerWidth <= 760) main?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}
	async function refreshFiles() {
		const id = mod.id
		const draft = {
			nameInput,
			descriptionInput,
			isBetaInput,
			currentVersion,
			videoUrlInput,
			licenseInput,
			licenseUrlInput,
			hideFromSearch,
			selectedTags: [...selectedTags],
			imagesInput: [...imagesInput]
		}
		await invalidateAll()
		await tick()
		if (mod.id !== id) return
		nameInput = draft.nameInput
		descriptionInput = draft.descriptionInput
		isBetaInput = draft.isBetaInput
		currentVersion = draft.currentVersion
		videoUrlInput = draft.videoUrlInput
		licenseInput = draft.licenseInput
		licenseUrlInput = draft.licenseUrlInput
		hideFromSearch = draft.hideFromSearch
		selectedTags = draft.selectedTags
		imagesInput = draft.imagesInput
	}
	function showModInfo() {
		if (saving || imagesUploading) return
		editingVersion = null
		resetInfo()
	}
	async function saveVersion(version: string) {
		if (saving || imagesUploading || !nameInput.trim() || !currentVersion.trim()) return
		if (
			currentVersion.trim() !== version &&
			modVersions.some((release) => release.version === currentVersion.trim())
		) {
			toast.error(t('mod:manage-version-exists'))
			return
		}
		saving = true
		try {
			await ky.patch(
				api.forum(`mods/${encodeURIComponent(mod.id)}/${encodeURIComponent(version)}/manage`),
				{
					json: {
						name: nameInput,
						description: descriptionInput,
						renameVersion: currentVersion.trim(),
						videoUrl: videoUrlInput,
						isBeta: isBetaInput,
						images: imagesInput.map(({ id, name, alt }) => ({ id, name, alt }))
					},
					retry: 0
				}
			)
			editingVersion = currentVersion.trim()
			toast.success(t('mod:manage-saved'))
			await invalidateAll()
		} catch {
			toast.error(t('mod:manage-save-error'))
		} finally {
			saving = false
		}
	}

	async function setCurrentVersion(version: string) {
		if (saving || imagesUploading) return
		saving = true
		try {
			await ky.patch(api.forum(`mods/${encodeURIComponent(mod.id)}/manage`), {
				json: { version },
				retry: 0
			})
			toast.success(t('mod:manage-saved'))
			await invalidateAll()
		} catch {
			toast.error(t('mod:manage-save-error'))
		} finally {
			saving = false
		}
	}

	// ---- tabs ----------------------------------------------------------------
	let tab: 'info' | 'versions' = $state('info')

	// ---- tags popover --------------------------------------------------------
	let tagsPopover = $state(false)
	function toggleTag(tag: APIModTag) {
		if (tag === 'OFFICIAL' && !isAdminUser) {
			toast.error(t('mod:manage-tag-admin-only'))
			return
		}
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((value) => value !== tag)
		} else {
			selectedTags = [...selectedTags, tag]
		}
	}

	// ---- developers ----------------------------------------------------------
	let developers = $state<ModDeveloper[]>(
		initialMod.developers.map((developer) => ({ ...developer }))
	)
	$effect.pre(() => {
		developers = data.mod.developers.map((developer) => ({ ...developer }))
	})
	let devPopover = $state(false)
	let devSearch = $state('')
	let devResults = $state<ModDeveloper[]>([])
	let devSearching = $state(false)
	$effect(() => {
		const query = devSearch.trim()
		if (!devPopover || !query) {
			devResults = []
			return
		}
		devSearching = true
		const controller = new AbortController()
		ky.get(
			api.forum(
				`mods/${encodeURIComponent(mod.id)}/developers/search?q=${encodeURIComponent(query)}`
			),
			{
				signal: controller.signal,
				retry: 0
			}
		)
			.json<{ items: ModDeveloper[] }>()
			.then((result) => {
				if (controller.signal.aborted) return
				devResults = result.items.filter(
					(item) => !developers.some((developer) => developer.authUserId === item.authUserId)
				)
			})
			.catch(() => {
				if (!controller.signal.aborted) toast.error(t('mod:manage-developers-search-error'))
			})
			.finally(() => {
				if (!controller.signal.aborted) devSearching = false
			})
		return () => controller.abort()
	})

	async function patchDevelopers(next: typeof developers) {
		if (devSaving) return
		devSaving = true
		const previous = developers
		developers = next
		try {
			await ky.patch(api.forum(`mods/${encodeURIComponent(mod.id)}/manage`), {
				json: { developerAuthUserIds: next.map((developer) => developer.authUserId) },
				retry: 0
			})
			toast.success(t('mod:manage-saved'))
		} catch {
			developers = previous
			toast.error(t('mod:manage-save-error'))
		} finally {
			devSaving = false
		}
	}

	function addDeveloper(developer: ModDeveloper) {
		if (developers.some((item) => item.authUserId === developer.authUserId)) return
		devPopover = false
		patchDevelopers([...developers, developer])
	}
	function removeDeveloper(authUserId: string) {
		patchDevelopers(developers.filter((developer) => developer.authUserId !== authUserId))
	}

	// ---- upload --------------------------------------------------------------
	let uploadModal = $state(false)
	let uploadVersion = $state('')
	let uploadName = $state('')
	let uploadDescription = $state('')
	let uploadFile = $state<File | null>(null)
	let uploadCrossPlatform = $state(false)
	let uploadPlatformFiles = $state<Partial<Record<ModPlatform, File>>>({})
	const uploadFiles = $derived<[string, File][]>(
		uploadCrossPlatform
			? (Object.entries(uploadPlatformFiles) as [ModPlatform, File][])
			: uploadFile
				? [['file', uploadFile]]
				: []
	)
	$effect(() => {
		if (!uploadModal) {
			uploadCrossPlatform = false
			uploadFile = null
			uploadPlatformFiles = {}
		}
	})
	let uploading = $state(false)

	async function upload() {
		if (!uploadFiles.length || !uploadVersion.trim() || uploading) return
		if (uploadFiles.reduce((size, [, file]) => size + file.size, 0) > 100 * 1024 * 1024) {
			toast.error(t('mod:manage-upload-error'))
			return
		}
		uploading = true
		try {
			const form = new FormData()
			for (const [platform, file] of uploadFiles) form.set(platform, file)
			form.set('version', uploadVersion.trim())
			if (uploadName.trim()) form.set('name', uploadName.trim())
			if (uploadDescription.trim()) form.set('description', uploadDescription.trim())
			await ky.post(api.forum(`mods/${encodeURIComponent(mod.id)}/upload`), {
				body: form,
				retry: 0
			})
			toast.success(t('mod:manage-uploaded'))
			uploadModal = false
			uploadFile = null
			uploadVersion = ''
			uploadName = ''
			uploadDescription = ''
			await invalidateAll()
		} catch {
			toast.error(t('mod:manage-upload-error'))
		} finally {
			uploading = false
		}
	}

	function managePath(id: string) {
		const params = new URLSearchParams()
		if (search.trim()) params.set('q', search.trim())
		if (isAdminUser) params.set('mine', String(mineOnly))
		return `/mods/${encodeURIComponent(id)}/manage${params.size ? `?${params}` : ''}`
	}
	let searchSequence = 0
	async function searchMods() {
		const url = new URL(page.url)
		if (search.trim()) url.searchParams.set('q', search.trim())
		else url.searchParams.delete('q')
		if (isAdminUser) url.searchParams.set('mine', String(mineOnly))
		replaceState(url, page.state)
		const sequence = ++searchSequence
		listLoading = true
		try {
			const result = await ky
				.get(api.forum('mods/manage-list'), {
					searchParams: { q: search, mine: String(isAdminUser && mineOnly) },
					retry: 0
				})
				.json<APIModListItem[] | { items: APIModListItem[] }>()
			if (sequence === searchSequence) list = Array.isArray(result) ? result : result.items
		} catch {
			if (sequence === searchSequence) toast.error(t('mod:manage-list-load-error'))
		} finally {
			if (sequence === searchSequence) listLoading = false
		}
	}
	function resetInfo() {
		if (editingVersion) {
			editVersion(editingVersion)
			return
		}
		nameInput = mod.name
		descriptionInput = mod.description ?? ''
		licenseInput = mod.license ?? ''
		licenseUrlInput = mod.licenseUrl ?? ''
		videoUrlInput = mod.videoUrl ?? ''
		imagesInput = [...(mod.images ?? [])]
		selectedTags = [...mod.tags]
		hideFromSearch = mod.hideFromSearch ?? false
		currentVersion = mod.version ?? ''
		isBetaInput = mod.isBeta ?? false
	}
</script>

<svelte:window
	onclick={(event) => {
		const target = event.target
		if (target instanceof Element && !target.closest('.popover, .tag-add, .dev-add')) {
			tagsPopover = false
			devPopover = false
		}
	}}
	onkeydown={(event) => {
		if (event.key === 'Escape') {
			tagsPopover = false
			devPopover = false
		}
	}}
/>

<div class="manage-shell">
	<aside class="mods-side">
		<form
			class="side-search"
			role="search"
			onsubmit={(event) => {
				event.preventDefault()
				searchMods()
			}}
		>
			<img src={searchIcon} alt="" />
			<input
				aria-label={t('mod:manage-search-placeholder')}
				placeholder={t('mod:manage-search-placeholder')}
				bind:value={search}
			/>
		</form>
		{#if isAdminUser}
			<div class="mine-filter">
				<LabeledCheckbox
					bind:checked={mineOnly}
					aria-label={t('mod:manage-mine-only')}
					onchange={() => searchMods()}>{t('mod:manage-mine-only')}</LabeledCheckbox
				>
			</div>
		{/if}
		<nav aria-label={t('mod:manage-title')} aria-busy={listLoading}>
			{#each list as item (item.id)}
				<a
					class="mod-item"
					class:selected={item.id === mod.id}
					class:draft={item.hideFromSearch}
					aria-current={item.id === mod.id ? 'page' : undefined}
					href={managePath(item.id)}
				>
					<span class="names"
						>{#if item.hideFromSearch}<span class="draft-label">{t('mod:manage-draft')}</span
							>{/if}<strong>{item.name}</strong></span
					>
					<span class="version">{item.version ? `v${item.version.replace(/^v/, '')}` : '—'}</span>
				</a>
			{:else}
				<p class="empty">{listLoading ? t('mod:manage-loading') : t('mod:no-results')}</p>
			{/each}
		</nav>
	</aside>

	<form
		id="mod-info"
		class="manage-main"
		onsubmit={(event) => {
			event.preventDefault()
			saveInfo()
		}}
	>
		{#if editingVersion}
			<div class="version-context">
				<span aria-live="polite"
					>{t('mod:manage-editing-version', { version: editingVersion })}</span
				>
				{#if editingVersion !== mod.version}<Button
						type="button"
						size="sm"
						variant="ghost-light"
						disabled={saving || imagesUploading}
						onclick={() => {
							if (editingVersion) setCurrentVersion(editingVersion)
						}}>{t('mod:manage-set-current')}</Button
					>{/if}
				<Button
					type="button"
					size="sm"
					variant="ghost-light"
					disabled={saving || imagesUploading}
					onclick={showModInfo}>{t('mod:manage-back-to-info')}</Button
				>
			</div>
		{/if}
		<header class="mod-head">
			<img
				class="mod-avatar"
				src={safeModUrl(mod.imageUrl) ?? defaultImage}
				alt=""
				onerror={(event) => {
					const image = event.currentTarget as HTMLImageElement
					if (image.src !== new URL(defaultImage, window.location.href).href)
						image.src = defaultImage
				}}
			/>
			<div class="head-text">
				<div class="tag-row">
					{#each selectedTags as tag (tag)}
						<Tag color={tag === 'OFFICIAL' ? 'blue' : 'darkblue'}
							>{#if tag === 'OFFICIAL'}<Icon icon="check" size={16} alt="" />{/if}{tagChipLabels[
								tag
							]}</Tag
						>
					{/each}
					<button
						class="tag-add"
						type="button"
						disabled={editingVersion !== null}
						aria-expanded={tagsPopover}
						aria-controls="tag-options"
						aria-label={t('mod:manage-tag-add')}
						onclick={() => {
							tagsPopover = !tagsPopover
							devPopover = false
						}}>+</button
					>
					{#if tagsPopover}
						<div class="popover tag-popover" id="tag-options">
							<OutlinedInput
								aria-label={t('mod:manage-tag-search')}
								placeholder={t('mod:manage-tag-search')}
								bind:value={tagSearch}
							/>
							{#each Object.entries(tagLabels).filter(([, label]) => label
									.toLowerCase()
									.includes(tagSearch.toLowerCase())) as [tag, label] (tag)}
								<button
									type="button"
									aria-pressed={selectedTags.includes(tag as APIModTag)}
									disabled={tag === 'OFFICIAL' && !isAdminUser}
									onclick={() => toggleTag(tag as APIModTag)}>{label}</button
								>
							{/each}
						</div>
					{/if}
				</div>
				<input
					class="title-input"
					aria-label={t(editingVersion ? 'mod:manage-version-name' : 'mod:manage-name')}
					maxlength={200}
					required
					bind:value={nameInput}
				/>
				<div class="version-row">
					<span>{t('mod:version')} {editingVersion ?? mod.version ?? '—'}</span><a
						href={editingVersion
							? `/mods/${encodeURIComponent(mod.id)}/${encodeURIComponent(editingVersion)}`
							: `/mods/${encodeURIComponent(mod.id)}`}
						target="_blank"
						rel="noopener noreferrer"
						>{t(editingVersion ? 'mod:manage-view-version' : 'mod:manage-view-latest')}</a
					>
				</div>
			</div>
		</header>
		{#if editingVersion}
			<div class="video-field">
				<label for="selected-version-number">{t('mod:version')}</label>
				<OutlinedInput
					id="selected-version-number"
					bind:value={currentVersion}
					required
					maxlength={40}
					disabled={saving || imagesUploading}
				/>
			</div>
		{/if}
		<label class="beta-toggle"
			><input
				type="checkbox"
				role="switch"
				bind:checked={isBetaInput}
				disabled={saving || imagesUploading || !currentVersion.trim()}
			/><span>{t('mod:manage-beta')}</span>{#if isBetaInput}<Tag color="yellow">BETA</Tag
				>{/if}</label
		>
		{#key `${mod.id}:${editingVersion ?? 'mod'}`}
			<ModMediaEditor
				modId={mod.id}
				bind:images={imagesInput}
				bind:videoUrl={videoUrlInput}
				bind:uploading={imagesUploading}
				disabled={saving}
			/>
		{/key}
		<div class="description-field">
			<label for="mod-description">{t('mod:manage-description')}</label>
			<ModDescriptionEditor bind:value={descriptionInput} disabled={saving || imagesUploading} />
		</div>
	</form>

	<aside class="right-sidebar">
		<div class="tabs" role="tablist" aria-label={t('mod:manage-title')}>
			<button
				id="info-tab"
				type="button"
				role="tab"
				aria-selected={tab === 'info'}
				aria-controls="info-panel"
				tabindex={tab === 'info' ? 0 : -1}
				onclick={() => (tab = 'info')}
				onkeydown={(event) => {
					if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
						tab = 'versions'
						document.getElementById('versions-tab')?.focus()
					}
				}}>{t('mod:manage-tab-info')}</button
			>
			<button
				id="versions-tab"
				type="button"
				role="tab"
				aria-selected={tab === 'versions'}
				aria-controls="versions-panel"
				tabindex={tab === 'versions' ? 0 : -1}
				onclick={() => (tab = 'versions')}
				onkeydown={(event) => {
					if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
						tab = 'info'
						document.getElementById('info-tab')?.focus()
					}
				}}>{t('mod:manage-tab-versions')}</button
			>
		</div>
		{#if tab === 'info'}
			<div id="info-panel" class="info-panel" role="tabpanel" aria-labelledby="info-tab">
				<button class="reset" type="button" disabled={saving || imagesUploading} onclick={resetInfo}
					>{t('mod:manage-reset')}</button
				>
				<section class="side-panel">
					<label for="current-version">{t('mod:version')}</label>
					<OutlinedInput
						id="current-version"
						form="mod-info"
						required
						maxlength={40}
						bind:value={currentVersion}
						disabled={saving || imagesUploading}
					/>
				</section>
				<section class="side-panel">
					<h2>
						{t('mod:manage-upload-file-label')}
						<button
							type="button"
							class="text-edit"
							disabled={!(editingVersion ?? mod.version) ||
								!modVersions.some((version) => version.version === (editingVersion ?? mod.version))}
							onclick={() => {
								filesVersion = editingVersion ?? mod.version
							}}>{t('mod:edit')}</button
						>
					</h2>
					{#if Object.keys(displayedFiles).length}
						{#each Object.entries(displayedFiles) as [platform, file]}
							{#if safeModUrl(file.download)}<a
									class="file-row"
									href={safeModUrl(file.download)!}
									target="_blank"
									rel="noopener noreferrer"
									><span>{file.name}</span><img src={uploadIcon} alt="" /></a
								>{/if}
						{/each}
					{:else if safeModUrl(displayedDownloadUrl ?? null)}
						<a
							class="file-row"
							href={safeModUrl(displayedDownloadUrl ?? null)!}
							target="_blank"
							rel="noopener noreferrer"
							><span>{displayedDownloadName ?? `${nameInput}.zip`}</span><img
								src={uploadIcon}
								alt=""
							/></a
						>
					{:else}<p class="side-hint">{t('mod:no-download')}</p>{/if}
				</section>
				<section class="side-panel">
					<h2>{t('mod:manage-developers')}</h2>
					{#each developers as developer (developer.memberId ?? developer.authUserId)}
						<div class="developer-row">
							<Avatar
								src={getAvatarUrl(developer.authUserId, developer.avatar, null, 64)}
								size={20}
							/><span>{developer.displayName}</span><button
								type="button"
								class="dev-remove"
								disabled={devSaving || editingVersion !== null}
								aria-label={t('mod:manage-developers-remove')}
								onclick={() => removeDeveloper(developer.authUserId)}>×</button
							>
						</div>
					{:else}<p class="side-hint">{t('mod:manage-developers-empty')}</p>{/each}
					<div class="dev-add">
						<button
							type="button"
							disabled={devSaving || editingVersion !== null}
							aria-expanded={devPopover}
							aria-controls="developer-options"
							onclick={() => {
								devPopover = !devPopover
								tagsPopover = false
							}}>+ {t('mod:manage-developers-add')}</button
						>
						{#if devPopover}<div class="popover dev-popover" id="developer-options">
								<OutlinedInput
									aria-label={t('mod:manage-developers-search')}
									placeholder={t('mod:manage-developers-search')}
									bind:value={devSearch}
								/>
								{#each devResults as member (member.authUserId)}<button
										type="button"
										disabled={devSaving || editingVersion !== null}
										onclick={() => addDeveloper(member)}
										><Avatar
											src={getAvatarUrl(member.authUserId, member.avatar, null, 64)}
											size={18}
										/>{member.displayName}</button
									>
								{:else}{#if devSearching}<p class="side-hint">
											{t('mod:manage-loading')}
										</p>{:else if devSearch.trim()}<p class="side-hint">
											{t('mod:no-results')}
										</p>{/if}{/each}
							</div>{/if}
					</div>
				</section>
				<section class="side-panel">
					<h2>
						{t('mod:manage-license')}
						<button
							class="text-edit"
							type="button"
							disabled={editingVersion !== null}
							onclick={() => {
								licenseDraft = licenseInput
								licenseUrlDraft = licenseUrlInput
								licenseModal = true
							}}>{t('mod:edit')}</button
						>
					</h2>
					<strong>{licenseInput || t('mod:license-unregistered')}</strong>
					{#if licenseUrlInput}<span class="license-url" title={licenseUrlInput}
							>{licenseUrlInput.replace(/^https?:\/\//, '')}</span
						>{/if}
				</section>
				<LabeledCheckbox bind:checked={hideFromSearch} disabled={editingVersion !== null}
					>{t('mod:manage-hide-from-search')}</LabeledCheckbox
				>
			</div>
		{:else}
			<div id="versions-panel" class="version-list" role="tabpanel" aria-labelledby="versions-tab">
				{#each modVersions as version (version.version)}
					<button
						class="version-card"
						class:current={version.version === mod.version}
						class:selected={version.version === editingVersion}
						aria-pressed={version.version === editingVersion}
						disabled={saving || imagesUploading}
						type="button"
						onclick={() => editVersion(version.version)}
					>
						<strong title={version.version}>v{version.version.replace(/^v/, '')}</strong>
						{#if version.isBeta}<Tag color="yellow">BETA</Tag>{/if}
						{#if version.version === mod.version}<span class="current-label"
								>{t('mod:manage-current-version')}</span
							>{/if}
						{#if version.uploadedAt}<span class="version-date"
								><img src={dateIcon} alt="" /><time datetime={version.uploadedAt}
									>{new Date(version.uploadedAt).toLocaleDateString($language)}</time
								></span
							>{/if}
					</button>
				{:else}<p class="side-hint">{t('mod:no-version')}</p>{/each}
			</div>
		{/if}
		<div class="sidebar-actions">
			<Button
				type="submit"
				form="mod-info"
				variant="outlined"
				disabled={saving || uploading || imagesUploading || !nameInput.trim()}
				><img src={pencilIcon} alt="" />{t(
					editingVersion ? 'mod:manage-save-version' : 'mod:manage-save-current'
				)}</Button
			>
			<Button
				type="button"
				disabled={saving || uploading}
				onclick={() => {
					uploadModal = true
					tagsPopover = false
					devPopover = false
				}}><img src={uploadIcon} alt="" />{t('mod:manage-new-version')}</Button
			>
		</div>
	</aside>
</div>

<Modal bind:open={licenseModal}>
	{#snippet children({ close })}
		<ModalTitle>{t('mod:manage-license-title')}</ModalTitle>
		<form
			class="dialog-form"
			onsubmit={(event) => {
				event.preventDefault()
				licenseInput = licenseDraft
				licenseUrlInput = licenseUrlDraft
				close()
			}}
		>
			<label for="license-input">{t('mod:manage-license')}</label><OutlinedInput
				id="license-input"
				maxlength={200}
				bind:value={licenseDraft}
			/>
			<label for="license-url-input">{t('mod:manage-license-url')}</label><OutlinedInput
				id="license-url-input"
				type="url"
				maxlength={2000}
				bind:value={licenseUrlDraft}
			/>
			<ModalActions
				>{#snippet left()}<Button variant="ghost-light" type="button" onclick={close}
						>{t('mod:cancel')}</Button
					>{/snippet}{#snippet right()}<Button type="submit">{t('mod:manage-apply')}</Button
					>{/snippet}</ModalActions
			>
		</form>
	{/snippet}
</Modal>

<Modal
	bind:open={uploadModal}
	options={{ escapeBehavior: uploading ? 'ignore' : 'close', closeOnOutsideClick: !uploading }}
>
	{#snippet children({ close })}
		<ModalTitle>{t('mod:manage-upload-title')}</ModalTitle>
		<form
			class="dialog-form"
			onsubmit={(event) => {
				event.preventDefault()
				upload()
			}}
		>
			<ModUploadFields
				bind:crossPlatform={uploadCrossPlatform}
				bind:commonFile={uploadFile}
				bind:selected={uploadPlatformFiles}
				disabled={uploading}
			/>
			<label for="upload-version">{t('mod:manage-upload-version')}</label><OutlinedInput
				id="upload-version"
				maxlength={40}
				required
				disabled={uploading}
				bind:value={uploadVersion}
			/>
			{#if modVersions.some((version) => version.version === uploadVersion.trim())}<p
					class="field-error"
				>
					{t('mod:manage-version-exists')}
				</p>{/if}
			<label for="upload-name">{t('mod:manage-upload-name')}</label><OutlinedInput
				id="upload-name"
				maxlength={200}
				disabled={uploading}
				bind:value={uploadName}
			/>
			<label for="upload-description">{t('mod:manage-upload-description')}</label><textarea
				id="upload-description"
				rows="4"
				maxlength={5000}
				disabled={uploading}
				bind:value={uploadDescription}
			></textarea>
			<ModalActions
				>{#snippet left()}<Button
						type="button"
						variant="ghost-light"
						disabled={uploading}
						onclick={close}>{t('mod:cancel')}</Button
					>{/snippet}{#snippet right()}<Button
						type="submit"
						disabled={uploading ||
							!uploadFiles.length ||
							!uploadVersion.trim() ||
							modVersions.some((version) => version.version === uploadVersion.trim())}
						>{t('mod:manage-upload-submit')}</Button
					>{/snippet}</ModalActions
			>
		</form>
	{/snippet}
</Modal>

<ModFilesModal
	bind:open={
		() => filesVersion !== null,
		(open) => {
			if (!open) filesVersion = null
		}
	}
	modId={mod.id}
	version={filesVersion ?? ''}
	files={modVersions.find((version) => version.version === filesVersion)?.files ?? {}}
	onSaved={refreshFiles}
/>

<style lang="scss">
	.manage-shell {
		display: grid;
		grid-template-columns: 400px minmax(0, 1fr) 400px;
		grid-template-rows: minmax(0, 1fr);
		height: calc(100dvh - 56px);
		min-height: 0;
		overflow: hidden;
	}
	.mods-side {
		display: flex;
		flex-direction: column;
		padding: 24px;
		border-right: 1px solid rgb(255 255 255 / 10%);
		min-width: 0;
		min-height: 0;
	}
	.mine-filter {
		flex-shrink: 0;
		margin-bottom: 16px;
	}

	.mods-side > nav {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	.side-search {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 12px;
		border: 2px solid rgb(255 255 255 / 20%);
		border-radius: 200px;
		padding: 10px 16px;
		margin-bottom: 16px;
	}
	.side-search input {
		width: 100%;
		min-width: 0;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		outline: none;
	}
	.side-search:focus-within {
		border-color: #3b84f1;
	}
	.mod-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		overflow-wrap: anywhere;
	}
	.mod-item:hover {
		background: rgb(3 6 28 / 20%);
	}
	.mod-item.selected {
		background: rgb(3 6 28 / 40%);
	}
	.mod-item.draft {
		opacity: 0.4;
	}
	.names {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.names strong {
		color: #ccc;
	}
	.draft-label {
		flex-shrink: 0;
	}
	.manage-main {
		scroll-margin-top: 56px;
		min-width: 0;
		min-height: 0;
		overflow-y: auto;
		padding: 48px 46px 64px 60px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.manage-main > * {
		flex-shrink: 0;
	}
	.version-context {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		padding: 12px 16px;
		border: 1px solid rgb(59 132 241 / 40%);
		border-radius: 8px;
		background: rgb(59 132 241 / 10%);
	}
	.version-context > span {
		flex: 1;
		font-weight: 500;
	}
	.tag-add:disabled,
	.text-edit:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.mod-head {
		display: flex;
		gap: 16px;
		align-items: center;
	}
	.mod-avatar {
		width: 121px;
		height: 121px;
		object-fit: cover;
		border-radius: 16px;
		flex-shrink: 0;
	}
	.head-text {
		min-width: 0;
		flex: 1;
	}
	.tag-row {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 8px;
	}
	.tag-row :global(.tag) {
		align-items: center;
		gap: 4px;
		font-size: 18px;
	}
	.tag-add {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		border: 0;
		border-radius: 8px;
		padding: 0 8px;
		background: rgb(3 6 28 / 20%);
		color: rgb(255 255 255 / 80%);
		font: inherit;
		font-size: 18px;
		line-height: 1.4;
		font-weight: 600;
	}
	.tag-add {
		cursor: pointer;
	}
	.title-input {
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		padding: 4px 0;
		margin: 4px 0 16px;
		border: 0;
		border-bottom: 1px solid transparent;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 32px;
		line-height: 1.4;
		font-weight: 500;
	}
	.title-input:hover,
	.title-input:focus {
		border-bottom-color: rgb(255 255 255 / 30%);
	}
	.version-row {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
		font-size: 16px;
		color: rgb(255 255 255 / 50%);
	}
	.version-row a {
		color: #3b84f1;
		text-decoration: underline;
	}
	.video-field,
	.description-field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.video-field {
		gap: 2px;
	}
	.description-field > label {
		font-size: 14px;
		color: rgb(255 255 255 / 60%);
		font-weight: 600;
	}
	.right-sidebar {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 32px;
		padding: 24px;
		min-width: 0;
		min-height: 0;
	}
	.tabs {
		display: flex;
		flex-wrap: wrap;
		flex-shrink: 0;
	}
	.tabs button {
		border: 0;
		border-radius: 8px;
		padding: 8px 16px;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
	}
	.tabs button[aria-selected='true'] {
		background: rgb(255 255 255 / 10%);
		font-weight: 600;
	}
	.info-panel {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.info-panel,
	.version-list {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	.info-panel > *,
	.version-card {
		flex-shrink: 0;
	}
	.reset {
		align-self: flex-end;
		padding: 0;
		border: 0;
		background: transparent;
		color: rgb(255 255 255 / 60%);
		font: inherit;
		font-size: 14px;
		cursor: pointer;
	}
	.side-panel {
		display: flex;
		flex-direction: column;
		gap: 8px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 12px;
		padding: 16px;
		min-width: 0;
	}
	.side-panel h2,
	.side-panel > label {
		margin: 0;
		color: rgb(255 255 255 / 60%);
		font-size: 14px;
		line-height: 1.2;
		font-weight: 600;
	}
	.file-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 0;
		border-bottom: 1px solid rgb(255 255 255 / 20%);
		font-size: 14px;
		color: inherit;
	}
	.file-row span {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.developer-row {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.developer-row > span {
		flex: 1;
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.dev-remove {
		padding: 4px;
		border: 0;
		background: transparent;
		color: rgb(255 255 255 / 60%);
		font-size: 18px;
		cursor: pointer;
	}
	.dev-remove:disabled {
		opacity: 0.25;
		cursor: default;
	}
	.dev-add {
		position: relative;
	}
	.dev-add > button,
	.text-edit {
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
	}
	.dev-add > button {
		color: rgb(255 255 255 / 60%);
	}
	.text-edit {
		margin-left: 8px;
		color: white;
		text-decoration: underline;
	}
	.license-url {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.popover {
		position: absolute;
		z-index: 30;
		box-sizing: border-box;
		width: 312px;
		max-width: calc(100vw - 32px);
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		border-radius: 16px;
		background: #12152c;
		box-shadow:
			0 0 12px rgb(0 0 0 / 20%),
			0 0 24px rgb(0 0 0 / 20%);
	}
	.tag-popover {
		top: calc(100% + 8px);
		right: 0;
	}
	.dev-popover {
		top: calc(100% + 8px);
		right: 0;
	}
	.popover > button {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border: 0;
		border-radius: 8px;
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.popover > button:hover,
	.popover > button[aria-pressed='true'] {
		background: rgb(255 255 255 / 10%);
	}
	.popover > button:disabled {
		opacity: 0.4;
		cursor: default;
	}
	.side-hint,
	.empty {
		margin: 0;
		color: rgb(255 255 255 / 50%);
		font-size: 14px;
	}
	.version-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.version-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 12px;
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
		min-width: 0;
	}
	.version-card.selected {
		background: rgb(255 255 255 / 20%);
	}
	.version-card:hover {
		border-color: rgb(255 255 255 / 50%);
	}
	.version-card strong {
		max-width: 100%;
		font-size: 22px;
		line-height: 1.2;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.version-date {
		display: flex;
		align-items: center;
		gap: 4px;
		color: rgb(255 255 255 / 80%);
	}
	.current-label {
		color: rgb(255 255 255 / 60%);
		font-size: 12px;
	}
	.sidebar-actions {
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex-shrink: 0;
	}
	.sidebar-actions :global(button) {
		width: 100%;
	}
	.dialog-form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.dialog-form label {
		margin-top: 8px;
		font-size: 14px;
	}
	.dialog-form textarea {
		box-sizing: border-box;
		width: 100%;
		padding: 12px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
		background: transparent;
		color: inherit;
		font: inherit;
		resize: vertical;
	}
	.field-error {
		color: #f54f51;
		font-size: 14px;
	}
	@media (max-width: 1600px) {
		.manage-shell {
			grid-template-columns: 280px minmax(0, 1fr) 340px;
		}
		.manage-main {
			padding: 48px 24px;
		}
		.mod-avatar {
			width: 96px;
			height: 96px;
		}
		.tag-row :global(.tag) {
			font-size: 14px;
		}
	}
	@media (max-width: 1200px) {
		.manage-shell {
			grid-template-columns: minmax(0, 1fr) 320px;
		}
		.mods-side {
			display: none;
		}
	}
	@media (max-width: 760px) {
		.manage-shell {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: auto;
			height: auto;
			overflow: visible;
			padding-bottom: calc(88px + env(safe-area-inset-bottom));
		}
		.manage-main {
			padding: 24px 16px;
			overflow: visible;
		}
		.right-sidebar {
			padding: 0 16px 32px;
			gap: 24px;
		}
		.info-panel,
		.version-list {
			flex: none;
			overflow: visible;
		}
		.title-input {
			font-size: 24px;
			margin-bottom: 8px;
		}
		.mod-avatar {
			width: 72px;
			height: 72px;
		}
		.mod-head {
			align-items: flex-start;
			gap: 12px;
		}
		.tag-row :global(.tag) {
			font-size: 11px;
			border-radius: 4px;
		}
		.version-row {
			font-size: 13px;
			gap: 8px;
		}
		.sidebar-actions {
			position: fixed;
			inset: auto 0 0;
			z-index: 20;
			flex-direction: row;
			gap: 8px;
			padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
			border-top: 1px solid rgb(255 255 255 / 10%);
			background: #12152c;
		}
		.sidebar-actions :global(button) {
			flex: 1;
			min-width: 0;
			padding: 10px 8px;
			font-size: 13px;
			gap: 6px;
		}
	}
</style>
