<script lang="ts">
	import { Button, getGlobalContext, toast, translateKey, type TranslationKey } from '@adofai-gg/ui'
	import { enhance } from '$app/forms'
	import { env } from '$env/dynamic/public'
	import { api } from '~/lib'
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import defaultAvatar from '~/lib/assets/defaultAvatars/light.png'
	import LevelListItem from '~/lib/components/levelList/LevelListItem.svelte'
	import ModListItem from '~/lib/components/mods/ModListItem.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	const { language } = getGlobalContext()
	const t = (key: string) => translateKey($language, `profile:${key}` as TranslationKey, {}, false)
	// authserver 의 MAX_AVATAR_SIZE / MAX_BANNER_SIZE 와 동일한 값
	const MAX_AVATAR_SIZE = 2 * 1024 * 1024
	const MAX_BANNER_SIZE = 8 * 1024 * 1024
	let editing = $state(false)
	let saving = $state(false)
	let nickname = $state(data.profile.displayName)
	let handle = $state(data.profile.username ?? '')
	let avatarInput = $state<HTMLInputElement | null>(null)
	let bannerInput = $state<HTMLInputElement | null>(null)
	let avatarPreview = $state<string | null>(null)
	let bannerPreview = $state<string | null>(null)
	let avatarFile = $state<File | null>(null)
	let bannerFile = $state<File | null>(null)
	let expanded = $state(false)
	let levelsOpen = $state(true)
	let modsOpen = $state(true)
	let copied = $state(false)
	let copyError = $state(false)
	let avatar = $derived(
		avatarPreview ??
		(data.profile.authUserId
			? getAvatarUrl(data.profile.authUserId, data.profile.avatar)
			: defaultAvatar)
	)
	let banner = $derived(
		bannerPreview ??
		(data.profile.authUserId && data.profile.bannerImage
			? `${env.PUBLIC_ACCOUNT_SERVICE_URL}/content/banners/${encodeURIComponent(data.profile.authUserId)}/${encodeURIComponent(data.profile.bannerImage)}.webp`
			: null)
	)
	const moreHref = $derived(`?offset=${data.offset + data.amount}`)
	const clearPreviews = () => {
		if (avatarPreview) URL.revokeObjectURL(avatarPreview)
		if (bannerPreview) URL.revokeObjectURL(bannerPreview)
		avatarPreview = null
		bannerPreview = null
		avatarFile = null
		bannerFile = null
		if (avatarInput) avatarInput.value = ''
		if (bannerInput) bannerInput.value = ''
	}
	const toggleEditing = () => {
		if (editing) {
			editing = false
			clearPreviews()
		} else {
			nickname = data.profile.displayName
			handle = data.profile.username ?? ''
			editing = true
		}
	}
	const previewImage = (event: Event, target: 'avatar' | 'banner') => {
		const input = event.currentTarget as HTMLInputElement
		const file = input.files?.[0]
		if (!file) return
		if (file.size > (target === 'avatar' ? MAX_AVATAR_SIZE : MAX_BANNER_SIZE)) {
			toast.error(t(target === 'avatar' ? 'avatar-too-big' : 'banner-too-big'))
			input.value = ''
			return
		}
		const preview = URL.createObjectURL(file)
		if (target === 'avatar') {
			if (avatarPreview) URL.revokeObjectURL(avatarPreview)
			avatarPreview = preview
			avatarFile = file
		} else {
			if (bannerPreview) URL.revokeObjectURL(bannerPreview)
			bannerPreview = preview
			bannerFile = file
		}
	}
</script>

<div class="profile-page">
	<div class="cover">
		{#if banner}<img src={banner} alt="" />{/if}
		{#if editing && data.isOwner}
			<button class="cover-change" type="button" onclick={() => bannerInput?.click()}>{t('change-banner')}</button>
		{/if}
	</div>
	<div class="profile-layout">
		<div class="main-column">
			<header class="profile-header">
				<div class="avatar-actions">
					{#if editing && data.isOwner}
						<button class="avatar-change" type="button" aria-label={t('change-photo')} onclick={() => avatarInput?.click()}>
							<img class="avatar" src={avatar} alt={data.profile.displayName} />
							<span>{t('change-photo')}</span>
						</button>
					{:else}
						<img
							class="avatar"
							src={avatar}
							alt={data.profile.displayName}
							onerror={(event) => {
								const target = event.currentTarget as HTMLImageElement
								if (target.src !== new URL(defaultAvatar, window.location.href).href)
									target.src = defaultAvatar
							}}
						/>
					{/if}
					<div class="actions">
						{#if data.isOwner}<Button
								variant="outlined"
								onclick={toggleEditing}>{t('edit')}</Button
							>{/if}
					</div>
				</div>
				{#if copied || copyError}<p role="status" class="status">
						{t(copyError ? 'copy-error' : 'copied')}
					</p>{/if}
				<div class="identity">
					{#if editing && data.isOwner}
						<input class="identity-name-input" aria-label={t('nickname')} maxlength="20" bind:value={nickname} />
						<label class="identity-handle-input"><span aria-hidden="true">@</span><input aria-label={t('handle')} maxlength="32" bind:value={handle} /></label>
					{:else}
						<h1>{data.profile.displayName}</h1>
						{#if data.profile.username}<p class="username">@{data.profile.username}</p>{/if}
					{/if}
					{#if data.profile.badges.length}<div class="badges"></div>{/if}
				</div>
				{#if editing && data.isOwner}
					<form
						method="POST"
						enctype="multipart/form-data"
						use:enhance={({ formData }) => {
							// 리렌더로 파일 input 이 비워져도 선택한 파일이 유실되지 않도록 상태에서 직접 채운다.
							if (avatarFile) formData.set('newAvatar', avatarFile, avatarFile.name)
							if (bannerFile) formData.set('newBanner', bannerFile, bannerFile.name)
							saving = true
							return async ({ result, update }) => {
								await update({ reset: false })
								saving = false
								if (result.type === 'success') {
									editing = false
									clearPreviews()
									toast.success(t('saved'))
								} else if (result.type === 'failure' || result.type === 'error') {
									const message = result.type === 'failure' ? result.data?.message : undefined
									const key =
										message === 'avatar-too-big' ||
										message === 'banner-too-big' ||
										message === 'invalid-image'
											? message
											: 'save-error'
									toast.error(t(key))
								}
							}
						}}
					>
						<input type="hidden" name="displayName" value={nickname} />
						<input type="hidden" name="handle" value={handle} />
						<input bind:this={avatarInput} class="visually-hidden-file" name="newAvatar" type="file" accept="image/*" onchange={(event) => previewImage(event, 'avatar')} />
						<input bind:this={bannerInput} class="visually-hidden-file" name="newBanner" type="file" accept="image/*" onchange={(event) => previewImage(event, 'banner')} />
						<label for="description">{t('about')}</label>
						<textarea
							id="description"
							name="description"
							maxlength="2048"
							rows="5"
							value={data.profile.description ?? ''}
						></textarea>
						<p class="muted">{t('description-limit')}</p>
						<p class="muted">{t('image-limits')}</p>
						<div class="form-actions">
							<Button type="submit" disabled={saving}>{t(saving ? 'saving' : 'save')}</Button
							><Button
								type="button"
								variant="outlined"
								onclick={() => {
									editing = false
									clearPreviews()
								}}>{t('cancel')}</Button
							>
						</div>
					</form>
				{:else}
					<div class="description" class:collapsed={!expanded}>
						{data.profile.description || t('no-description')}
					</div>
					{#if data.profile.description && (data.profile.description.length > 140 || data.profile.description.split('\n').length > 4)}<button
							class="text-button muted"
							aria-expanded={expanded}
							onclick={() => {
								expanded = !expanded
							}}>{t(expanded ? 'less' : 'more')}</button
						>{/if}
				{/if}
			</header>

			<section aria-labelledby="levels-title">
				<div class="section-heading">
					<button
						class="section-toggle"
						aria-expanded={levelsOpen}
						aria-controls="profile-levels"
						onclick={() => {
							levelsOpen = !levelsOpen
						}}
						><img
							class="section-caret"
							src={levelsOpen
								? '/images/profile/caret-down.svg'
								: '/images/profile/caret-right.svg'}
							alt=""
							aria-hidden="true"
						/>
						<h2 id="levels-title">{t('levels')} ({data.levels.count})</h2></button
					>
				</div>
				<div id="profile-levels" hidden={!levelsOpen}>
					{#if data.levels.results.length}
						<div class="level-grid">
							{#each data.levels.results as level (level.id)}<article class="level-card">
									<a class="thumbnail" href="/levels/{level.id}" aria-label={level.title}
										>{#if level.thumbnail}<img
												src={api.forum(`levels/${level.id}/thumbnail`)}
												alt=""
												loading="lazy"
												onerror={(event) => {
													const target = event.currentTarget as HTMLImageElement
													if (target.src !== new URL(defaultAvatar, window.location.href).href)
														target.src = defaultAvatar
												}}
											/>{:else}<img src={defaultAvatar} alt="" loading="lazy" />{/if}</a
									><LevelListItem {level} />
								</article>{/each}
						</div>
						{#if data.offset + data.amount < data.levels.count}<div class="more-button">
								<Button variant="outlined" link href={moreHref}>{t('more')}</Button>
							</div>{/if}
					{:else}<p class="empty">{t('no-levels')}</p>{/if}
				</div>
			</section>

			<section aria-labelledby="mods-title">
				<div class="section-heading">
					<button
						class="section-toggle"
						aria-expanded={modsOpen}
						aria-controls="profile-mods"
						onclick={() => {
							modsOpen = !modsOpen
						}}
						><img
							class="section-caret"
							src={modsOpen ? '/images/profile/caret-down.svg' : '/images/profile/caret-right.svg'}
							alt=""
							aria-hidden="true"
						/>
						<h2 id="mods-title">
							{t('mods')}{data.mods
								? ` (${data.mods.items.length}${data.mods.hasMore ? '+' : ''})`
								: ''}
						</h2></button
					>
				</div>
				<div id="profile-mods" hidden={!modsOpen}>
					{#if data.mods === null}<p class="empty" role="status">{t('mods-unavailable')}</p>
					{:else if data.mods.items.length}<div class="mod-list">
							{#each data.mods.items as mod (mod.id)}<ModListItem {mod} />{/each}
						</div>
						{#if data.mods.hasMore}<div class="more-button">
								<Button variant="outlined" link href={moreHref}>{t('more')}</Button>
							</div>{/if}
					{:else}<p class="empty">{t('no-mods')}</p>{/if}
				</div>
			</section>
			{#if data.offset > 0}<Button
					variant="outlined"
					link
					href={`?offset=${Math.max(0, data.offset - data.amount)}`}>{t('previous')}</Button
				>{/if}
		</div>
		<aside aria-label={t('details')}>
			<dl class="info-panel">
				<div>
					<dt>{t('joined')}</dt>
					<dd>
						{new Intl.DateTimeFormat($language, { dateStyle: 'medium' }).format(
							new Date(data.profile.createdAt)
						)}
					</dd>
				</div>
			</dl>
			{#if data.profile.profileLinks.length}
				<div class="profile-links" aria-label={t('links')}>
					{#each data.profile.profileLinks.filter((link) => link.kind === 'discord') as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="/images/profile/links/discord.svg" width="20" height="20" alt="" />
							<span>{link.label}</span>
						</a>
					{/each}
				</div>
			{/if}
		</aside>
	</div>
</div>

<style lang="scss">
	.profile-page {
		width: var(--client-width, 100vw);
		min-height: calc(100vh - 56px);
		background: #202344 url('/images/profile/background.png') top center / 1920px auto;
		padding-bottom: 96px;
	}
	.cover {
		position: relative;
		height: 200px;
		background: rgb(3 6 28 / 20%);
		overflow: hidden;
	}
	.cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.profile-layout {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 858px) 270px;
		gap: 24px;
		max-width: 1152px;
		margin: -86px auto 0;
		padding: 0;
	}
	.main-column {
		display: flex;
		flex-direction: column;
		gap: 64px;
		min-width: 0;
	}
	.profile-header {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.avatar-actions {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
	}
	.avatar {
		width: 172px;
		height: 172px;
		border-radius: 50%;
		object-fit: cover;
	}
	.avatar-change {
		position: relative;
		display: block;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: transparent;
		color: white;
		cursor: pointer;
		overflow: hidden;
	}
	.avatar-change span {
		position: absolute;
		inset: auto 0 0;
		padding: 8px 2px;
		background: rgb(0 0 0 / 62%);
		font-size: 12px;
	}
	.cover-change {
		position: absolute;
		inset: 0;
		width: 100%;
		border: 0;
		background: rgb(0 0 0 / 38%);
		color: white;
		font: inherit;
		cursor: pointer;
	}
	.actions,
	.form-actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	h1,
	h2,
	p,
	dl,
	dd {
		margin: 0;
	}
	h1 {
		font-size: 32px;
		font-weight: 500;
		line-height: 1.4;
		overflow-wrap: anywhere;
	}
	.username {
		opacity: 0.6;
		font-size: 18px;
	}
	.identity-name-input,
	.identity-handle-input input {
		box-sizing: border-box;
		border: 1px solid rgb(255 255 255 / 28%);
		border-radius: 8px;
		background: rgb(3 6 28 / 42%);
		color: inherit;
		font: inherit;
	}
	.identity-name-input { width: min(100%, 520px); padding: 4px 10px; font-size: 32px; }
	.identity-handle-input { display: flex; align-items: center; gap: 4px; width: fit-content; opacity: .72; font-size: 18px; }
	.identity-handle-input input { width: 240px; padding: 4px 8px; }
	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}
	.description {
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		font-size: 15px;
		line-height: 1.4;
	}
	.description.collapsed {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.muted {
		opacity: 0.6;
		font-size: 14px;
	}
	.text-button {
		text-align: left;
		width: fit-content;
	}
	.status {
		font-size: 14px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	form label { margin-top: 8px; }
	form input:not([type='file']) {
		box-sizing: border-box;
		width: 100%;
		min-height: 40px;
		padding: 8px 10px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
		background: rgb(3 6 28 / 20%);
		color: inherit;
		font: inherit;
	}
	.visually-hidden-file {
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
	textarea {
		box-sizing: border-box;
		width: 100%;
		color: inherit;
		font: inherit;
		background: rgb(3 6 28 / 20%);
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
		padding: 12px;
		resize: vertical;
	}
	.section-heading {
		border-bottom: 2px solid rgb(255 255 255 / 20%);
		padding-bottom: 8px;
		margin-bottom: 8px;
	}
	.section-caret {
		flex-shrink: 0;
	}
	.section-toggle {
		display: flex;
		gap: 8px;
		align-items: center;
		width: 100%;
		text-align: left;
	}
	h2 {
		font-size: 24px;
		font-weight: 600;
		line-height: 1.4;
	}
	.level-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: 16px;
		row-gap: 32px;
	}
	.level-card {
		min-width: 0;
		padding: 8px;
	}
	.thumbnail {
		display: block;
		aspect-ratio: 593 / 334;
		overflow: hidden;
		border-radius: 8px;
		background: rgb(3 6 28 / 20%);
	}
	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.level-card :global(.level-list-item) {
		padding: 12px 0 0;
		border-bottom: 0;
		gap: 12px;
	}
	.level-card :global(.metadata-area) {
		min-width: 0;
	}
	.level-card :global(.level-title) {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.level-card :global(.download-button) {
		display: none;
	}
	.more-button {
		margin-top: 16px;
	}
	.more-button :global(a) {
		display: flex;
		width: 100%;
	}
	.empty {
		padding: 32px 16px;
		color: rgb(255 255 255 / 60%);
		background: rgb(3 6 28 / 10%);
		border-radius: 8px;
	}
	aside {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-top: 124px;
	}
	.info-panel {
		background: rgb(3 6 28 / 20%);
		border-radius: 12px;
		padding: 16px;
		font-size: 12px;
	}

	.profile-links {
		margin-top: 12px;
		padding: 16px;
		border-radius: 12px;
		background: rgb(3 6 28 / 20%);
		display: grid;
		gap: 8px;
	}
	.profile-links a {
		display: flex;
		align-items: center;
		gap: 4px;
		min-width: 0;
		color: white;
		font-size: 14px;
		line-height: 1.4;
		text-decoration: none;
		word-break: break-word;
	}
	.profile-links a:hover {
		text-decoration: underline;
	}
	.info-panel div {
		display: flex;
		align-items: center;
		gap: 24px;
	}
	dt {
		opacity: 0.8;
		flex-shrink: 0;
	}
	dd {
		overflow-wrap: anywhere;
	}
	button:focus-visible,
	a:focus-visible,
	textarea:focus-visible {
		outline: 2px solid #3b84f1;
		outline-offset: 4px;
	}
	@media (max-width: 1200px) {
		.profile-layout {
			margin-left: 24px;
			margin-right: 24px;
		}
	}
	@media (max-width: 900px) {
		.profile-layout {
			grid-template-columns: minmax(0, 1fr);
		}
		aside {
			grid-row: 2;
			padding-top: 0;
			flex-direction: row;
			flex-wrap: wrap;
		}
		.info-panel {
			flex: 1;
		}
	}
	@media (max-width: 600px) {
		.cover {
			height: 144px;
		}
		.profile-layout {
			margin: -52px 16px 0;
		}
		.avatar {
			width: 104px;
			height: 104px;
		}
		.main-column {
			gap: 40px;
		}
		.level-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 16px;
		}
		h1 {
			font-size: 28px;
		}
		h2 {
			font-size: 20px;
		}
		.actions {
			justify-content: flex-end;
		}
		.identity-name-input { font-size: 28px; }
		.identity-handle-input input { width: 180px; }
	}
</style>
