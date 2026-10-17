<script lang="ts">
	import {
		Avatar,
		Button,
		Icon,
		LabeledCheckbox,
		Translation,
		toast,
		getGlobalContext,
		translateKey,
		type TranslationKey
	} from '@adofai-gg/ui'
	import { api, ky, type APIMember } from '~/lib'
	import { isForumAdmin } from '~/lib/utils/perm'
	import type {
		APIModListItem,
		APIModTag,
		ModDeveloper
	} from '~/lib/types/mod'
	import { invalidate, invalidateAll } from '$app/navigation'
	import type { PageProps } from './$types'
	import { page } from '$app/state'

	const { language } = getGlobalContext()
	const t = (key: TranslationKey, params = {}) =>
		translateKey($language, key, params, false)

	let { data }: PageProps = $props()

	const tagLabels: Record<APIModTag, string> = {
		OFFICIAL: t('mod:tag-official'),
		LIBRARY: 'Library',
		LEVEL_EDITOR_ADD_ON: 'Level Editor Add-On',
		OVERLAY: 'Overlay',
		MISCELLANEOUS: 'Miscellaneous'
	}
	const tagChipLabels: Record<APIModTag, string> = {
		OFFICIAL: 'ADOFAI.gg OFFICIAL',
		LIBRARY: 'LIBRARY',
		LEVEL_EDITOR_ADD_ON: 'LEVEL EDITOR ADD-ON',
		OVERLAY: 'OVERLAY',
		MISCELLANEOUS: 'MISCELLANEOUS'
	}

	const isAdminUser = $derived(
		isForumAdmin(page.data.currentUser as { roleFlag?: number } | null)
	)
	const mod = $derived(data.mod)
	const modVersions = $derived(mod.versions)

	let list = $state<APIModListItem[]>(data.list ?? [])
	let listLoading = $state(false)
	let saving = $state(false)

	// ---- info form -----------------------------------------------------------
	let nameInput = $state('')
	let descriptionInput = $state('')
	let licenseInput = $state('')
	let licenseUrlInput = $state('')
	let selectedTags = $state<APIModTag[]>([])
	let hideFromSearch = $state(false)
	let currentVersion = $state('')

	$effect.pre(() => {
		const { mod } = data
		list = data.list ?? list
		nameInput = mod.name
		descriptionInput = mod.description ?? ''
		licenseInput = mod.license ?? ''
		licenseUrlInput = mod.licenseUrl ?? ''
		selectedTags = [...mod.tags]
		hideFromSearch = mod.hideFromSearch ?? false
		currentVersion = mod.version ?? ''
	})

	async function saveInfo() {
		if (saving) return
		saving = true
		try {
			await ky.patch(api.forum(`mods/${encodeURIComponent(mod.id)}/manage`), {
				json: {
					name: nameInput,
					description: descriptionInput,
					hideFromSearch,
					version: currentVersion,
					license: licenseInput,
					licenseUrl: licenseUrlInput,
					tags: selectedTags
				},
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

	// ---- versions ------------------------------------------------------------
	let versionForms = $state<Record<string, { name: string; description: string }>>({})
	$effect.pre(() => {
		const next: Record<string, { name: string; description: string }> = {}
		for (const version of data.mod.versions) {
			next[version.version] = {
				name: versionForms[version.version]?.name ?? version.name,
				description:
					versionForms[version.version]?.description ?? version.description ?? ''
			}
		}
		versionForms = next
	})

	async function saveVersion(version: string) {
		if (saving) return
		saving = true
		try {
			await ky.patch(
				api.forum(
					`mods/${encodeURIComponent(mod.id)}/${encodeURIComponent(version)}/manage`
				),
				{
					json: {
						name: versionForms[version].name,
						description: versionForms[version].description
					},
					retry: 0
				}
			)
			toast.success(t('mod:manage-saved'))
			await invalidateAll()
		} catch {
			toast.error(t('mod:manage-save-error'))
		} finally {
			saving = false
		}
	}

	async function setCurrentVersion(version: string) {
		if (saving) return
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
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((value) => value !== tag)
		} else if (tag === 'OFFICIAL' && !isAdminUser) {
			toast.error(t('mod:manage-tag-admin-only'))
		} else {
			selectedTags = [...selectedTags, tag]
		}
	}

	// ---- developers ----------------------------------------------------------
	let developers = $state<ModDeveloper[]>([])
	$effect.pre(() => {
		developers = data.mod.developers.map((developer) => ({ ...developer }))
	})
	let devPopover = $state(false)
	let devSearch = $state('')
	let devResults = $state<APIMember[]>([])
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
			api.forum(`members/all?name=${encodeURIComponent(query)}&amount=8&offset=0`),
			{ signal: controller.signal, retry: 0 }
		)
			.json<{ items: APIMember[] }>()
			.then((result) => {
				devResults = result.items.filter(
					(item) => !developers.some((developer) => developer.memberId === item.id)
				)
			})
			.catch(() => null)
			.finally(() => {
				devSearching = false
			})
		return () => controller.abort()
	})

	async function patchDevelopers(next: typeof developers) {
		const previous = developers
		developers = next
		try {
			await ky.patch(api.forum(`mods/${encodeURIComponent(mod.id)}/manage`), {
				json: { developers: next.map((developer) => developer.memberId!) },
				retry: 0
			})
			await invalidateAll()
		} catch {
			developers = previous
			toast.error(t('mod:manage-save-error'))
		}
	}

	function addDeveloper(member: APIMember) {
		if (developers.some((developer) => developer.memberId === member.id)) return
		devPopover = false
		patchDevelopers([
			...developers,
			{
				authUserId: member.authUserId ?? '',
				username: member.username ?? member.displayName,
				displayName: member.displayName,
				avatar: member.avatar,
				memberId: member.id
			}
		])
	}

	function removeDeveloper(memberId: number | undefined) {
		if (memberId === undefined) return
		patchDevelopers(developers.filter((developer) => developer.memberId !== memberId))
	}

	// ---- upload --------------------------------------------------------------
	let uploadModal = $state(false)
	let uploadVersion = $state('')
	let uploadName = $state('')
	let uploadDescription = $state('')
	let uploadFile = $state<File | null>(null)
	let uploading = $state(false)

	async function upload() {
		if (!uploadFile || !uploadVersion.trim() || uploading) return
		if (uploadFile.size > 100 * 1024 * 1024) {
			toast.error(t('mod:manage-upload-error'))
			return
		}
		uploading = true
		try {
			const form = new FormData()
			form.set('file', uploadFile)
			form.set('version', uploadVersion.trim())
			if (uploadName.trim()) form.set('name', uploadName.trim())
			if (uploadDescription.trim())
				form.set('description', uploadDescription.trim())
			await ky.post(
				api.forum(`mods/${encodeURIComponent(mod.id)}/upload`),
				{ body: form, retry: 0 }
			)
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
</script>

<svelte:window
	onclick={(event) => {
		const target = event.target as HTMLElement
		if (!target.closest('.popover, .tag-add, .dev-add')) {
			tagsPopover = false
			devPopover = false
		}
	}}
/>
<div class="manage-shell">
	<aside class="mods-side">
		<div class="side-search">
			<input
				aria-label={t('mod:manage-search-placeholder')}
				placeholder={t('mod:manage-search-placeholder')}
				onkeydown={(event) => {
					if (event.key !== 'Enter') return
					listLoading = true
					ky.get(
						api.forum(
							`mods/manage-list?q=${encodeURIComponent((event.target as HTMLInputElement).value)}`
						),
						{ retry: 0 }
					)
						.json<{ items: APIModListItem[] }>()
						.then((result) => (list = result.items))
						.catch(() => toast.error(t('mod:manage-list-load-error')))
						.finally(() => (listLoading = false))
				}}
			/>
		</div>
		<nav aria-label={t('mod:title')}>
			{#each list as item (item.id)}
				<a
					class="mod-item"
					class:selected={item.id === mod.id}
					class:draft={item.hideFromSearch}
					href="/mods/{encodeURIComponent(item.id)}/manage"
				>
					<span class="names">
						{#if item.hideFromSearch}<span class="draft-label">{t('mod:manage-draft')}</span>{/if}<strong
							>{item.name}</strong
						>
					</span>
					<span class="version">v{item.version ?? '-'}</span>
				</a>
			{:else}
				{#if !listLoading}<p class="empty">{t('mod:no-results')}</p>{/if}
			{/each}
		</nav>
	</aside>

	<div class="manage-main">
		<header class="mod-head">
			<div class="head-avatar"><Avatar src={mod.imageUrl} size={121} /></div>
			<div class="head-text">
				<div class="tag-row">
					{#each selectedTags as tag (tag)}
						{#if tag === 'OFFICIAL'}
							<span class="official-badge"
								><Icon icon="check" size={16} alt="" />ADOFAI.gg OFFICIAL</span
							>
						{:else}
							<span class="tag-chip">{tagChipLabels[tag]}</span>
						{/if}
					{/each}
					<button
						type="button"
						class="tag-add"
						aria-label={t('mod:manage-tag-add')}
						onclick={() => {
							tagsPopover = !tagsPopover
							devPopover = false
						}}
					>
						+
					</button>
					{#if tagsPopover}
						<div class="popover tag-popover">
							{#each Object.entries(tagLabels) as [tag, label] (tag)}
								<button type="button" class:selected={selectedTags.includes(tag as APIModTag)}
									onclick={() => toggleTag(tag as APIModTag)}>
									{label}{tag === 'OFFICIAL' ? ' ★' : ''}
									{#if selectedTags.includes(tag as APIModTag)} ✓{/if}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<input
					class="title-input"
					type="text"
					maxlength="200"
					required
					bind:value={nameInput}
					onkeydown={(event) => {
						if (event.key === 'Enter') event.preventDefault()
					}}
				/>
				<div class="version-row">
					<span class="current-badge">{t('mod:manage-current-version')}</span>
					<select bind:value={currentVersion} aria-label={t('mod:manage-current-version')}>
						{#each modVersions as version (version.version)}
							<option value={version.version}>{version.version}</option>
						{/each}
					</select>
				</div>
			</div>
		</header>

		<div class="columns">
			<section class="content">
				<div class="tabs" role="tablist">
					<button
						type="button"
						role="tab"
						aria-selected={tab === 'info'}
						onclick={() => (tab = 'info')}>{t('mod:manage-tab-info')}</button
					><button
						type="button"
						role="tab"
						aria-selected={tab === 'versions'}
						onclick={() => (tab = 'versions')}>{t('mod:manage-tab-versions')}</button
					>
				</div>

				{#if tab === 'info'}
					{#if mod.imageUrl}
						<div class="image-block">
							<img src={mod.imageUrl} alt="" />
						</div>
					{/if}
					<form
						aria-labelledby="info-form-title"
						onsubmit={(event) => {
							event.preventDefault()
							saveInfo()
						}}
					>
						<h2 id="info-form-title" class="visually-hidden">{t('mod:manage-title')}</h2>
						<textarea
							aria-label={t('mod:manage-description')}
							rows="10"
							maxlength="5000"
							bind:value={descriptionInput}></textarea>
						<LabeledCheckbox bind:checked={hideFromSearch}
							>{t('mod:manage-hide-from-search')}</LabeledCheckbox
						>
						<div class="form-actions">
							<Button type="submit" disabled={saving}
								><Translation key="mod:manage-save" /></Button
							>
						</div>
					</form>
				{:else}
					<div class="version-list">
						{#each modVersions as version (version.version)}
							<form
								aria-label={t('mod:manage-version-of', { version: version.version })}
								onsubmit={(event) => {
									event.preventDefault()
									saveVersion(version.version)
								}}
							>
								<div class="version-heading">
									{#if version.version === mod.version}<span class="latest"
											>{t('mod:manage-current-version')}</span
										>{/if}
									<span>{version.version}</span>
									{#if version.uploadedAt}<time
											datetime={version.uploadedAt}>{new Date(version.uploadedAt).toLocaleDateString($language)}</time
										>{/if}
									<Button
										type="button"
										variant="ghost-light"
										disabled={version.version === mod.version || saving}
										onclick={() => setCurrentVersion(version.version)}
										>{t('mod:manage-set-current')}</Button
									>
								</div>
								<label for={'version-name-' + version.version}>
									{t('mod:manage-version-name')}
								</label>
								<input
									id={'version-name-' + version.version}
									type="text"
									maxlength="200"
									bind:value={versionForms[version.version].name}
								/>
								<label for={'version-desc-' + version.version}>
									{t('mod:manage-version-description')}
								</label>
								<textarea
									id={'version-desc-' + version.version}
									rows="4"
									maxlength="5000"
									bind:value={versionForms[version.version].description}></textarea>
								<div class="form-actions">
									<Button type="submit" disabled={saving} variant="ghost-light"
										><Translation key="mod:manage-save" /></Button
									>
								</div>
							</form>
						{/each}
					</div>
				{/if}
			</section>

			<aside class="side-col">
				<Button
					variant="outlined"
					leftIcon="fileWithUpArrow"
					disabled={saving}
					onclick={() => {
						uploadModal = true
						tagsPopover = false
						devPopover = false
					}}
					><Translation key="mod:manage-update" /></Button
				>

				<div class="side-panel">
					<h3>{t('mod:manage-developers')}</h3>
					{#each developers as developer (developer.memberId ?? developer.authUserId)}
						<div class="developer-row">
							<Avatar src={developer.avatar} size={20} />
							<span>{developer.displayName}</span>
							<button
								type="button"
								class="dev-remove"
								aria-label={t('mod:manage-developers-remove')}
								onclick={() => removeDeveloper(developer.memberId)}
							>
								×
							</button>
						</div>
					{/each}
					{#if !developers.length}
						<p class="side-hint">{t('mod:manage-developers-empty')}</p>
					{/if}
					<div class="dev-add">
						<button
							type="button"
							onclick={() => {
								devPopover = !devPopover
								tagsPopover = false
							}}
						>
							+ {t('mod:manage-developers-add')}
						</button>
						{#if devPopover}
							<div class="popover dev-popover">
								<input
									type="text"
									placeholder={t('mod:manage-developers-search')}
									bind:value={devSearch}
								/>
								{#each devResults as member (member.id)}
									<button type="button" onclick={() => addDeveloper(member)}>
										<Avatar src={member.avatar} size={18} />
										{member.displayName}
									</button>
								{:else}
									{#if devSearch.trim() && !devSearching}
										<p class="side-hint">{t('mod:no-results')}</p>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<form
					class="side-panel license-panel"
					onsubmit={(event) => {
						event.preventDefault()
						saveInfo()
					}}
				>
					<h3>{t('mod:manage-release-info')}</h3>
					<label for="license-input">{t('mod:manage-license')}</label>
					<input
						id="license-input"
						type="text"
						maxlength="200"
						bind:value={licenseInput}
					/>
					<label for="license-url-input">{t('mod:manage-license-url')}</label>
					<input
						id="license-url-input"
						type="url"
						maxlength="2000"
						bind:value={licenseUrlInput}
					/>
					<div class="form-actions">
						<Button type="submit" disabled={saving} variant="ghost-light"
							><Translation key="mod:manage-save" /></Button
						>
					</div>
				</form>
			</aside>
		</div>
	</div>
</div>

{#if uploadModal}
	<div class="modal-backdrop">
		<form
			class="modal"
			onsubmit={(event) => {
				event.preventDefault()
				upload()
			}}
		>
			<h2><Translation key="mod:manage-upload-create-title" /></h2>
			<label for="upload-file">{t('mod:manage-upload-file')}</label>
			<input
				id="upload-file"
				type="file"
				accept=".zip,application/zip"
				required
				onchange={(event) => {
					uploadFile = (event.target as HTMLInputElement).files?.[0] ?? null
				}}
			/>
			<label for="upload-version">{t('mod:manage-upload-version')}</label>
			<input
				id="upload-version"
				type="text"
				maxlength="40"
				required
				bind:value={uploadVersion}
			/>
			<label for="upload-name">{t('mod:manage-upload-name')}</label>
			<input id="upload-name" type="text" maxlength="200" bind:value={uploadName} />
			<label for="upload-description">{t('mod:manage-upload-description')}</label>
			<textarea
				id="upload-description"
				rows="3"
				maxlength="5000"
				bind:value={uploadDescription}></textarea>
			<div class="form-actions">
				<Button
					type="button"
					variant="ghost-light"
					onclick={() => (uploadModal = false)}><Translation key="mod:cancel" /></Button
				><Button type="submit" disabled={uploading || !uploadFile}
					><Translation key="mod:manage-upload-submit" /></Button
				>
			</div>
		</form>
	</div>
{/if}

<style lang="scss" global>
	p {
		margin: 0;
	}
	h2, h3 { margin: 0; }

	.manage-shell {
		display: flex;
		min-height: calc(100vh - 56px);
	}

	.mods-side {
		box-sizing: border-box;
		flex-shrink: 0;
		width: 400px;
		border-right: 1px solid rgb(255 255 255 / 10%);
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.side-search input {
		box-sizing: border-box;
		width: 100%;
		color: inherit;
		font: inherit;
		background: transparent;
		border: 2px solid rgb(255 255 255 / 20%);
		border-radius: 200px;
		padding: 12px 16px;
	}

	.mod-item {
		display: block;
		padding: 16px;
		border-radius: 8px;
		color: inherit;
		text-decoration: none;
		opacity: 0.7;
	}
	.mod-item.selected {
		background: rgb(3 6 28 / 40%);
	}
	.mod-item.draft {
		opacity: 0.4;
	}
	.mod-item strong {
		color: rgb(204 204 204);
		font-weight: 700;
	}
	.mod-item .draft-label {
		margin-right: 8px;
	}
	.mod-item .version {
		display: block;
		margin-top: 4px;
		font-size: 14px;
	}

	.manage-main {
		flex: 1;
		min-width: 0;
		padding: 40px 40px 80px;
	}

	.mod-head {
		display: flex;
		gap: 24px;
		align-items: center;
		max-width: 1414px;
	}

	.head-text {
		flex: 1;
		min-width: 0;
	}

	.tag-row {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		gap: 6px 10px;
		align-items: center;
	}

	.tag-chip,
	.tag-add {
		padding: 8px 8px;
		background: rgb(3 6 28 / 20%);
		border: 0;
		border-radius: 8px;
		color: rgb(255 255 255 / 80%);
		font-size: 18px;
		font-weight: 600;
		text-transform: uppercase;
		line-height: 20px;
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}

	.tag-add {
		padding-inline: 10px;
	}

	.official-badge {
		background: #3b84f1;
		border-radius: 8px;
		padding: 8px;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 18px;
		font-weight: 600;
		line-height: 20px;
	}

	.popover {
		position: absolute;
		z-index: 30;
		right: 0;
		background: #12152c;
		border-radius: 16px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 280px;
		box-shadow:
			0 0 12px rgb(0 0 0 / 20%),
			0 0 24px rgb(0 0 0 / 20%);
	}

	.tag-popover {
		top: 44px;
		max-height: 400px;
		overflow: auto;
	}

	.popover button,
	.dev-popover input {
		text-align: left;
		background: transparent;
		border: 0;
		color: inherit;
		font-size: 16px;
		padding: 10px 16px;
		border-radius: 8px;
		cursor: pointer;
		font: inherit;
	}
	.popover button.selected {
		background: rgb(255 255 255 / 10%);
	}
	.dev-popover input {
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
		padding: 8px 16px;
		background: transparent;
		color: inherit;
	}
	.dev-popover button {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.dev-popover button:hover,
	.tag-popover button:hover {
		background: rgb(255 255 255 / 10%);
	}

	.title-input {
		box-sizing: border-box;
		width: 100%;
		background: transparent;
		border: 1px solid rgb(255 255 255 / 10%);
		border-radius: 8px;
		color: inherit;
		font-size: 32px;
		font-weight: 500;
		line-height: 1.4;
		padding: 4px 8px;
		margin: 16px 0 8px;
	}
	.title-input:focus-visible {
		outline: 1px solid rgb(255 255 255 / 30%);
	}

	.version-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.current-badge {
		padding: 6px 10px;
		border-radius: 8px;
		font-size: 16px;
		color: rgb(255 255 255 / 80%);
	}

	.version-row select {
		background: rgb(3 6 28 / 20%);
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
		color: inherit;
		font: inherit;
		padding: 6px 12px;
	}

	.columns {
		display: grid;
		grid-template-columns: minmax(0, 858px) 290px;
		gap: 40px;
		margin-top: 64px;
	}

	.content {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.tabs {
		display: flex;
		justify-content: space-between;
	}

	.tabs button {
		padding: 8px 16px;
		background: transparent;
		border: 0;
		border-radius: 8px 8px 0 0;
		color: inherit;
		font-size: 18px;
		font-weight: 400;
		cursor: pointer;
	}
	.tabs button[aria-selected='true'] {
		background: rgb(255 255 255 / 10%);
		font-weight: 600;
	}

	.image-block img {
		width: 100%;
		border-radius: 16px;
		max-height: 482px;
		object-fit: cover;
	}

	.content form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.content textarea,
	.modal textarea,
	.modal input,
	.content input[type='text'],
	.license-panel input {
		box-sizing: border-box;
		width: 100%;
		color: inherit;
		font: inherit;
		background: rgb(3 6 28 / 20%);
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
		padding: 12px;
	}

	.content form label,
	.modal label,
	.license-panel label {
		font-size: 14px;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin-top: 8px;
	}

	.version-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.version-list form {
		padding: 24px;
		border: 1px solid rgb(255 255 255 / 10%);
		border-radius: 12px;
	}

	.version-heading {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		font-size: 18px;
	}
	.version-heading time {
		font-size: 13px;
		color: rgb(255 255 255 / 60%);
		font-weight: 400;
	}
	.latest {
		background: rgb(3 6 28 / 40%);
		border-radius: 8px;
		padding: 6px 10px;
		font-size: 14px;
	}

	.side-col {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.side-panel {
		background: rgb(3 6 28 / 20%);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14px;
	}

	.side-panel h3 {
		font-size: 14px;
		color: rgb(255 255 255 / 60%);
	}

	.developer-row {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 16px;
	}
	.developer-row span {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.dev-remove {
		background: transparent;
		border: 0;
		color: rgb(255 255 255 / 50%);
		cursor: pointer;
		line-height: 1;
	}

	.dev-add {
		position: relative;
	}
	.dev-add > button {
		background: transparent;
		border: 0;
		color: rgb(255 255 255 / 50%);
		font: inherit;
		font-size: 16px;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.dev-add > button:hover {
		color: rgb(255 255 255 / 80%);
	}

	.dev-popover {
		top: 28px;
		left: 0;
		width: 290px;
	}

	.side-hint {
		font-size: 13px;
		color: rgb(255 255 255 / 40%);
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 60%);
		z-index: 60;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
	}

	.modal {
		box-sizing: border-box;
		width: 480px;
		max-width: 100%;
		background: #12152c;
		border-radius: 16px;
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.modal h2 {
		font-size: 24px;
		margin-bottom: 8px;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 1200px) {
		.columns {
			grid-template-columns: 1fr;
		}
		.mods-side {
			display: none;
		}
	}
</style>
