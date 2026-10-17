<script lang="ts">
	import {
		Avatar,
		Button,
		Container,
		Icon,
		Panel,
		PanelTitle,
		SearchBar,
		SearchOptionsBar,
		Tag,
		Translation,
		toast,
		getGlobalContext,
		translateKey,
		type TranslationKey,
		type SearchOptionScheme,
		type SearchOptionsData
	} from '@adofai-gg/ui'
	import Description from '~/lib/components/Description.svelte'
	import Discussion from '../comments/Discussion.svelte'
	import ModReleaseInfo from './ModReleaseInfo.svelte'
	import ModDownloadModal from './ModDownloadModal.svelte'
	import ModListItem from './ModListItem.svelte'
	import ModImage from '~/lib/components/mods/ModImage.svelte'
	import { modDownloadUrl, modMessageUrl, modVersionPath } from '~/lib/types/mod'
	import { api, ky } from '~/lib'
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import type { ModDetailData, APIModLikeState } from '~/lib/types/mod'
	let { data }: { data: ModDetailData } = $props()
	const { language } = getGlobalContext()
	const t = (key: TranslationKey, params = {}) => translateKey($language, key, params, false)
	const dateFormatter = $derived(
		new Intl.DateTimeFormat($language, { dateStyle: 'medium', timeZone: 'UTC' })
	)
	const mod = $derived(data.mod)
	const tagChipLabels: Record<string, string> = {
		OFFICIAL: 'ADOFAI.gg OFFICIAL',
		LIBRARY: 'LIBRARY',
		LEVEL_EDITOR_ADD_ON: 'LEVEL EDITOR ADD-ON',
		OVERLAY: 'OVERLAY',
		MISCELLANEOUS: 'MISCELLANEOUS'
	}
	const latestVersion = $derived(mod.latestVersion === undefined ? mod.version : mod.latestVersion)
	const downloadUrl = $derived(modDownloadUrl(mod))
	const messageUrl = $derived(modMessageUrl(mod))
	const developers = $derived.by(() => {
		const seen = new Set<string>()
		return [mod, ...data.versions].flatMap((release) => {
			const id = release.authorId
			const key = id ?? release.cachedUsername
			if (!key || seen.has(key)) return []
			seen.add(key)
			const avatar = release.developer
				? getAvatarUrl(release.developer.authUserId, release.developer.avatar, null, 64)
				: id &&
					  release.cachedAvatar &&
					  /^\d+$/.test(id) &&
					  /^[a-zA-Z0-9_]+$/.test(release.cachedAvatar)
					? `https://cdn.discordapp.com/avatars/${id}/${release.cachedAvatar}.png?size=64`
					: null
			return [
				{
					key,
					name: release.developer?.displayName ?? release.cachedUsername ?? t('mod:unknown'),
					avatar
				}
			]
		})
	})
	let tab = $state<'info' | 'versions'>('info')
	let search = $state('')
	let searchOptions = $state<SearchOptionsData>({ sort: 'latest', filter: [] })
	const scheme: SearchOptionScheme = $derived({
		filter: {
			author: {
				type: 'string',
				icon: 'creator',
				name: 'mod:developer',
				label: 'mod:developer',
				default: ''
			}
		},
		sort: [
			{ objective: 'latest', name: t('mod:sort-latest'), icon: 'sort' },
			{ objective: 'oldest', name: t('mod:sort-oldest'), icon: 'sort' }
		]
	})
	let downloadOpen = $state(false)
	let selectedVersion = $state('')
	const versions = $derived.by(() => {
		const author = String(
			searchOptions.filter.find((filter) => filter.key === 'author')?.value ?? ''
		)
			.trim()
			.toLowerCase()
		const list = data.versions.filter((version) => {
			const developer =
				`${version.cachedUsername ?? ''} ${version.developer?.displayName ?? ''} ${version.developer?.username ?? ''}`.toLowerCase()
			return (
				`${version.version} ${version.name} ${developer}`
					.toLowerCase()
					.includes(search.trim().toLowerCase()) &&
				(!author || developer.includes(author))
			)
		})
		return searchOptions.sort === 'oldest' ? [...list].reverse() : list
	})
	function download(version = mod.version ?? '') {
		selectedVersion = version
		downloadOpen = true
	}
	let expandedVersions = $state(false)
	$effect(() => {
		mod.id
		expandedVersions = false
		tab = 'info'
		search = ''
		searchOptions = { sort: 'latest', filter: [] }
		downloadOpen = false
	})
	async function share() {
		const href = window.location.href
		if (typeof navigator.share === 'function') {
			await navigator.share({ title: mod.name, url: href })
			return
		}
		try {
			await navigator.clipboard.writeText(href)
			toast.success(t('mod:link-copied'))
		} catch {
			toast.error(t('mod:copy-link-hint'))
		}
	}
	let like = $state({ liked: false, count: 0 })
	let liking = $state(false)
	$effect(() => {
		like = { liked: mod.liked ?? false, count: mod.likeCount ?? 0 }
	})
	const likeCountLabel = $derived(like.count.toLocaleString($language))
	async function toggleLike() {
		if (liking) return
		liking = true
		try {
			const state = await ky
				.post(api.forum(`mods/${encodeURIComponent(mod.id)}/like`), { retry: 0 })
				.json<APIModLikeState>()
			like = { liked: state.liked, count: state.likeCount }
		} catch {
			toast.error(t('mod:like-error-hint'))
		} finally {
			liking = false
		}
	}
</script>

<Container>
	<article class="mod-detail">
		<header>
			<ModImage {mod} size={92} />
			<div class="heading">
				{#if mod.tags?.length}
					<div class="tag-row">
						{#each mod.tags as tag (tag)}
							{#if tag === 'OFFICIAL'}
								<span class="official-badge"><Icon icon="check" size={16} alt="" />ADOFAI.gg OFFICIAL</span>
							{:else}
								<span class="tag-chip">{tagChipLabels[tag]}</span>
							{/if}
						{/each}
					</div>
				{/if}
				<h1>{mod.name}</h1>
				{#if mod.version}<div class="release-heading">
						<Translation key="mod:release-version" params={{ version: mod.version }} />
						{#if mod.version !== latestVersion}<a href="/mods/{encodeURIComponent(mod.id)}"
								><Translation key="mod:view-latest" /></a
							>{/if}
					</div>{/if}
			</div>
		</header>
		<div class="toolbar">
			<div
				class="tabs"
				role="tablist"
				tabindex="-1"
				onkeydown={(event) => {
					if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
					event.preventDefault()
					tab =
						event.key === 'Home'
							? 'info'
							: event.key === 'End'
								? 'versions'
								: tab === 'info'
									? 'versions'
									: 'info'
					document.getElementById(tab === 'info' ? 'mod-info-tab' : 'mod-versions-tab')?.focus()
				}}
				aria-label={t('mod:title')}
			>
				<button
					id="mod-info-tab"
					role="tab"
					tabindex={tab === 'info' ? 0 : -1}
					aria-selected={tab === 'info'}
					aria-controls="mod-info"
					onclick={() => (tab = 'info')}><Translation key="mod:info" /></button
				>
				<button
					id="mod-versions-tab"
					role="tab"
					tabindex={tab === 'versions' ? 0 : -1}
					aria-selected={tab === 'versions'}
					aria-controls="mod-versions"
					onclick={() => (tab = 'versions')}><Translation key="mod:version-list" /></button
				>
			</div>
			<div class="links">
				{#if mod.canManage}<Button
						variant="ghost-light"
						leftIcon="pencil"
						link
						href="/mods/{encodeURIComponent(mod.id)}/manage"
						><Translation key="mod:manage" /></Button
					>{/if}
				{#if messageUrl}<Button
						link
						href={messageUrl}
						target="_blank"
						rel="noopener noreferrer"
						variant="ghost-light"
						leftIcon="discord"><Translation key="mod:original-post" /></Button
					>{/if}
			</div>
		</div>
		{#if tab === 'info'}
			<div
				id="mod-info"
				role="tabpanel"
				tabindex="0"
				aria-labelledby="mod-info-tab"
				class="detail-grid"
			>
				<div class="main-column">
					{#if mod.imageUrl}<div class="cover"><img src={mod.imageUrl} alt={mod.name} /></div>{/if}
					<div class="actions">
						<Button
							leftIcon="fileDownload"
							disabled={!downloadUrl && !data.versions.some((v) => modDownloadUrl(v))}
							onclick={() => download()}><Translation key="mod:download" /></Button
						><Button
							variant={like.liked ? 'outlined' : 'ghost-light'}
							leftIcon="heartOutlined"
							aria-pressed={like.liked}
							aria-label={t('mod:like')}
							disabled={liking}
							onclick={toggleLike}><span class="like-count">{likeCountLabel}</span></Button
						><Button variant="ghost-light" onclick={share}><Translation key="mod:share" /></Button>
					</div>
					<Description maxHeight={120}
						><div class="markdown-body mod-description">
							{#if mod.description?.trim()}<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html data.descriptionHtml}{:else}<Translation key="mod:no-description" />{/if}
						</div></Description
					>
					<section aria-labelledby="versions-title">
						<div class="section-title">
							<h2 id="versions-title">
								<Icon icon="downArrow" size={24} alt="" /><Translation key="mod:versions" />
							</h2>
							<button onclick={() => (tab = 'versions')}
								><Translation key="mod:show-more" /> ›</button
							>
						</div>
						<div class="version-grid">
							{#each data.versions.slice(0, expandedVersions ? 12 : 6) as version (version.version)}{@render versionCard(
									version
								)}{:else}<p><Translation key="mod:no-version" /></p>{/each}
						</div>
						{#if data.versions.length > 6}<button
								class="more-versions"
								onclick={() => {
									if (expandedVersions) tab = 'versions'
									else expandedVersions = true
								}}><Translation key="mod:show-more" /></button
							>{/if}
					</section>
					{#key mod.id}<Discussion
							resource="mods"
							resourceId={mod.id}
							initialPage={data.comments}
						/>{/key}
				</div>
				<aside>
					<div class="notice">
						<h2><Translation key="mod:notice" /></h2>
						<p><Translation key="mod:notice-description" /></p>
						<strong><Translation key="mod:notice-warning" /></strong>
					</div>
					<Panel
						><PanelTitle><Translation key="mod:developers" /></PanelTitle>
						<div class="developer-list">
							{#each developers as developer (developer.key)}<div class="author">
									<Avatar size={24} src={developer.avatar} /><span>{developer.name}</span>
								</div>{:else}<Translation key="mod:unknown" />{/each}
						</div></Panel
					>
					<ModReleaseInfo {mod} versions={data.versions} referenceTime={data.referenceTime} />
				</aside>
			</div>
		{:else}
			<div
				id="mod-versions"
				role="tabpanel"
				tabindex="0"
				aria-labelledby="mod-versions-tab"
				class="version-list"
			>
				<form
					class="version-search-form"
					role="search"
					aria-label={t('mod:search')}
					onsubmit={(event) => event.preventDefault()}
				>
					<div class="search-input">
						<SearchBar bind:value={search} placeholder="mod:version-search" />
					</div>
					<Button type="submit" variant="ghost-light" leftIcon="search"
						><Translation key="mod:search" /></Button
					>
				</form>
				<SearchOptionsBar {scheme} bind:data={searchOptions} />
				<div class="version-rows">
					{#each versions as version (version.version)}
						<ModListItem
							mod={{ ...mod, ...version }}
							href={modVersionPath(mod.id, version.version)}
							title={version.version}
						>
							{#snippet metadata()}
								<div class="version-list-metadata">
									{#if version.version === latestVersion}<Tag color="blue"
											><Translation key="mod:latest-version" /></Tag
										>{:else if /alpha|beta|rc/i.test(version.version)}<span class="beta">BETA</span
										>{/if}
									{#if version.developer?.displayName || version.cachedUsername}<span
											>{version.developer?.displayName ?? version.cachedUsername}</span
										>{/if}
									{#if version.uploadedAt}<time datetime={version.uploadedAt}
											>{dateFormatter.format(new Date(version.uploadedAt))}</time
										>{/if}
								</div>
							{/snippet}
							{#snippet actions()}<Button
									variant="ghost-light"
									leftIcon="fileDownload"
									aria-label={t('mod:download-version', { version: version.version })}
									disabled={!modDownloadUrl(version)}
									onclick={() => download(version.version)}
								/>{/snippet}
						</ModListItem>
					{:else}<p>
							<Translation key="mod:no-results" />
						</p>{/each}
				</div>
			</div>
		{/if}
	</article>
</Container>
<ModDownloadModal
	bind:open={downloadOpen}
	bind:version={selectedVersion}
	{mod}
	versions={data.versions}
/>

{#snippet versionCard(version: ModDetailData['versions'][number])}
	<article class="version-card">
		<div class="version-info">
			<div class="version-heading">
				{#if version.version === latestVersion}<Tag color="blue"
						><Translation key="mod:latest-version" /></Tag
					>{:else if /alpha|beta|rc/i.test(version.version)}<span class="beta">BETA</span>{/if}
				<a href={modVersionPath(mod.id, version.version)} title={version.version}
					>{version.version}</a
				>
			</div>
			{#if version.uploadedAt}<time datetime={version.uploadedAt}
					><img src="/images/mods/date.svg" alt="" />{dateFormatter.format(
						new Date(version.uploadedAt)
					)}</time
				>{/if}
		</div>
		<button
			class="download-icon"
			disabled={!modDownloadUrl(version)}
			aria-label={t('mod:download-version', { version: version.version })}
			onclick={() => download(version.version)}
			><img src="/images/mods/download.svg" alt="" /></button
		>
	</article>
{/snippet}

<style>
	.mod-detail {
		max-width: 1152px;
		margin: 64px auto 128px;
	}
	header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 32px;
	}
	.heading {
		min-width: 0;
	}
	.tag-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 10px;
		margin-bottom: 12px;
	}
	.tag-chip {
		background: rgb(3 6 28 / 20%);
		border-radius: 8px;
		padding: 8px 10px;
		font-size: 14px;
		font-weight: 600;
		text-transform: uppercase;
		color: rgb(255 255 255 / 80%);
	}
	.official-badge {
		background: #3b84f1;
		border-radius: 8px;
		padding: 8px 10px;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 14px;
		font-weight: 600;
	}
	h1 {
		font-size: 32px;
		font-weight: 500;
		line-height: 1.4;
		overflow-wrap: anywhere;
	}
	.release-heading {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		color: rgb(255 255 255 / 60%);
		margin-top: 4px;
	}
	.release-heading a {
		color: #7cafff;
	}
	.toolbar,
	.links,
	.actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}
	.toolbar {
		justify-content: space-between;
		margin-bottom: 32px;
	}
	.tabs {
		display: flex;
		gap: 4px;
	}
	button {
		color: inherit;
		background: transparent;
		border: 0;
		font: inherit;
		cursor: pointer;
	}
	.tabs button {
		padding: 8px 16px;
		border-radius: 8px;
	}
	.tabs button[aria-selected='true'] {
		background: rgb(255 255 255 / 10%);
		font-weight: 600;
	}
	.like-count {
		font-variant-numeric: tabular-nums;
	}
	.detail-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 270px;
		gap: 24px;
	}
	.main-column {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.cover {
		aspect-ratio: 16/9;
		overflow: hidden;
		border-radius: 16px;
		background: rgb(3 6 28 / 20%);
	}
	.cover img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.actions + :global(*) {
		margin-top: -24px;
	}
	.section-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 8px;
		border-bottom: 2px solid rgb(255 255 255 / 20%);
	}
	.section-title h2 {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 24px;
		font-weight: 600;
	}
	.version-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 32px 16px;
		margin: 8px 0 16px;
	}
	.version-card {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
		padding: 8px;
	}
	.version-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.version-heading {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}
	.version-heading a {
		font-size: 22px;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.version-heading a:hover {
		text-decoration: underline;
	}
	.beta {
		padding: 0 6px;
		background: #4b4c77;
		border-radius: 4px;
		font-size: 14px;
	}
	time {
		display: flex;
		align-items: center;
		gap: 4px;
		color: rgb(255 255 255 / 80%);
		font-size: 14px;
	}
	time img {
		opacity: 0.6;
	}
	.download-icon {
		flex-shrink: 0;
		padding: 0;
		width: 48px;
		height: 48px;
		border-radius: 8px;
	}
	.download-icon:hover {
		background: rgb(255 255 255 / 10%);
	}
	.download-icon:disabled {
		opacity: 0.3;
		cursor: default;
	}
	.more-versions {
		width: 100%;
		padding: 8px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
	}
	aside {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.notice {
		border: 1px solid #ecce23;
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		line-height: 1.2;
	}
	.notice h2 {
		color: #ecce23;
		font-size: 14px;
		opacity: 0.6;
	}
	.notice strong {
		color: #ecce23;
	}
	.developer-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 8px;
	}
	.author {
		display: flex;
		gap: 8px;
		align-items: center;
		overflow-wrap: anywhere;
	}
	.mod-description {
		white-space: normal;
		font-size: 15px;
	}
	.mod-description :global(img) {
		max-width: 100%;
		height: auto;
	}
	.mod-description :global(pre) {
		white-space: pre;
		overflow-x: auto;
	}
	.version-search-form {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}
	.search-input {
		flex: 1;
		min-width: 0;
	}
	.version-rows {
		margin-top: 48px;
	}

	.version-list-metadata {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px 12px;
		color: rgb(255 255 255 / 80%);
		font-size: 14px;
	}

	@media (max-width: 768px) {
		.mod-detail {
			margin-top: 32px;
		}
		.detail-grid {
			grid-template-columns: minmax(0, 1fr);
		}
		aside {
			grid-row: 2;
		}
		h1 {
			font-size: 26px;
		}
		.toolbar {
			gap: 16px;
		}
	}
	@media (max-width: 540px) {
		.version-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 12px;
		}
		header {
			align-items: flex-start;
		}
		.links {
			width: 100%;
		}
		.section-title h2 {
			font-size: 20px;
		}
	}
</style>
