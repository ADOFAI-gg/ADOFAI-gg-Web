<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { Editor } from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'
	import Image from '@tiptap/extension-image'
	import Placeholder from '@tiptap/extension-placeholder'
	import TextAlign from '@tiptap/extension-text-align'
	import {
		Button,
		Icon,
		LabeledCheckbox,
		LoadingSpinner,
		SearchBar,
		Translation,
		getGlobalContext,
		toast,
		translateKey,
		type TranslationKey
	} from '@adofai-gg/ui'
	import {
		api,
		ky,
		type APINotice,
		type APINoticeBanner,
		type NoticeCategory
	} from '~/lib'
	import type { ListResponse } from '~/types'
	import { NOTICE_CATEGORIES, formatNoticeDate, noticeCategoryKey } from '~/lib/utils/notice'
	import { page } from '$app/state'
	import { goto } from '$app/navigation'

	const { language } = getGlobalContext()
	const t = (key: TranslationKey, params = {}) =>
		translateKey($language, key, params, false)

	let viewMode = $state<'notice' | 'banner'>('notice')

	let notices = $state<APINotice[]>([])
	let loadingList = $state(true)
	let loadingDetail = $state(false)
	let saving = $state(false)
	let deleting = $state(false)
	let searchQuery = $state('')

	let selectedId = $state<number | null>(null)
	let title = $state('')
	let subtitle = $state('')
	let category = $state<NoticeCategory>('FORUM')
	let featured = $state(false)
	let published = $state(true)
	let bodyHtml = $state('<p></p>')

	// ---- separate main banner state ------------------------------------------
	let bannerEnabled = $state(false)
	let bannerImageUrl = $state('')
	let bannerLinkUrl = $state('')
	let bannerTitle = $state('')
	let savingBanner = $state(false)

	let editorElement = $state<HTMLDivElement | null>(null)
	let editor = $state<Editor | null>(null)
	let editorTick = $state(0)

	const filteredNotices = $derived.by(() => {
		const q = searchQuery.trim().toLowerCase()
		if (!q) return notices
		return notices.filter(
			(item) =>
				item.title.toLowerCase().includes(q) ||
				(item.subtitle && item.subtitle.toLowerCase().includes(q))
		)
	})

	function initEditor(initialContent: string) {
		if (!editorElement) return
		editor?.destroy()
		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit.configure({
					heading: { levels: [1, 2, 3] },
					link: {
						openOnClick: false,
						autolink: true
					}
				}),
				Image.configure({
					inline: false,
					allowBase64: true
				}),
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				Placeholder.configure({
					placeholder:
						$language === 'ko'
							? '여기에 공지 본문을 작성하세요...'
							: 'Write notice content here...'
				})
			],
			content: initialContent,
			onTransaction: () => {
				editorTick += 1
			},
			onUpdate: ({ editor: instance }) => {
				bodyHtml = instance.getHTML()
			}
		})
	}

	async function loadNoticeList() {
		loadingList = true
		try {
			const res = await ky
				.get(api.forum('notices/manage'), {
					searchParams: { offset: '0', amount: '100' },
					retry: 0
				})
				.json<ListResponse<APINotice>>()
			notices = res.results
		} catch {
			toast.error(t('manage:notice-save-error'))
		} finally {
			loadingList = false
		}
	}

	async function loadBanner() {
		try {
			const banner = await ky
				.get(api.forum('notices/banner'), { retry: 0 })
				.json<APINoticeBanner>()
			bannerEnabled = banner.enabled
			bannerImageUrl = banner.imageUrl ?? ''
			bannerLinkUrl = banner.linkUrl ?? ''
			bannerTitle = banner.title ?? ''
		} catch {
			// keep defaults
		}
	}

	async function saveBanner() {
		if (savingBanner) return
		savingBanner = true
		try {
			const updated = await ky
				.put(api.forum('notices/banner'), {
					json: {
						enabled: bannerEnabled,
						imageUrl: bannerImageUrl.trim() || null,
						linkUrl: bannerLinkUrl.trim() || null,
						title: bannerTitle.trim() || null
					},
					retry: 0
				})
				.json<APINoticeBanner>()
			bannerEnabled = updated.enabled
			bannerImageUrl = updated.imageUrl ?? ''
			bannerLinkUrl = updated.linkUrl ?? ''
			bannerTitle = updated.title ?? ''
			toast.success(t('manage:notice-banner-saved'))
		} catch {
			toast.error(t('manage:notice-banner-save-error'))
		} finally {
			savingBanner = false
		}
	}

	function openBannerSettings() {
		viewMode = 'banner'
		selectedId = null
	}

	function startNewNotice() {
		viewMode = 'notice'
		selectedId = null
		title = ''
		subtitle = ''
		category = 'FORUM'
		featured = false
		published = true
		bodyHtml = '<p></p>'
		if (editor) {
			editor.commands.setContent('<p></p>')
		}
		const url = new URL(page.url)
		if (url.searchParams.has('id')) {
			url.searchParams.delete('id')
			goto(url.pathname + url.search, { replaceState: true, noScroll: true })
		}
	}

	async function selectNotice(id: number) {
		if (loadingDetail) return
		viewMode = 'notice'
		selectedId = id
		loadingDetail = true
		try {
			const detail = await ky
				.get(api.forum(`notices/${id}`), { retry: 0 })
				.json<APINotice>()
			title = detail.title
			subtitle = detail.subtitle ?? ''
			category = detail.category
			featured = detail.featured
			published = detail.published
			bodyHtml = detail.body ?? '<p></p>'
			if (editor) {
				editor.commands.setContent(bodyHtml)
			}
		} catch {
			toast.error(t('manage:notice-save-error'))
		} finally {
			loadingDetail = false
		}
	}

	async function saveNotice() {
		if (saving) return
		const trimmedTitle = title.trim()
		const currentBody = editor ? editor.getHTML() : bodyHtml
		const plainText = currentBody.replace(/<[^>]*>/g, '').trim()

		if (!trimmedTitle || (!plainText && !currentBody.includes('<img'))) {
			toast.error(t('manage:notice-save-error'))
			return
		}

		saving = true
		try {
			const payload = {
				title: trimmedTitle,
				subtitle: subtitle.trim() || null,
				body: currentBody,
				category,
				featured,
				published
			}

			if (selectedId === null) {
				const created = await ky
					.post(api.forum('notices'), {
						json: payload,
						retry: 0
					})
					.json<APINotice>()
				toast.success(t('manage:notice-created'))
				await loadNoticeList()
				selectedId = created.id
			} else {
				const updated = await ky
					.patch(api.forum(`notices/${selectedId}`), {
						json: payload,
						retry: 0
					})
					.json<APINotice>()
				toast.success(t('manage:notice-saved'))
				await loadNoticeList()
				selectedId = updated.id
			}
		} catch {
			toast.error(t('manage:notice-save-error'))
		} finally {
			saving = false
		}
	}

	async function removeNotice() {
		if (selectedId === null || deleting) return
		if (!window.confirm(t('manage:notice-delete-confirm'))) return

		deleting = true
		try {
			await ky.delete(api.forum(`notices/${selectedId}`), { retry: 0 })
			toast.success(t('manage:notice-deleted'))
			startNewNotice()
			await loadNoticeList()
		} catch {
			toast.error(t('manage:notice-delete-error'))
		} finally {
			deleting = false
		}
	}

	function promptLink() {
		if (!editor) return
		const previousUrl = editor.getAttributes('link').href as string | undefined
		const url = window.prompt('URL', previousUrl ?? 'https://')
		if (url === null) return
		if (url.trim() === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()
			return
		}
		editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run()
	}

	function promptImage() {
		if (!editor) return
		const url = window.prompt(
			$language === 'ko' ? '이미지 URL을 입력하세요:' : 'Enter image URL:',
			'https://'
		)
		if (!url || !url.trim()) return
		editor.chain().focus().setImage({ src: url.trim() }).run()
	}

	onMount(async () => {
		initEditor(bodyHtml)
		await Promise.all([loadNoticeList(), loadBanner()])
		const initialId = Number(page.url.searchParams.get('id'))
		if (Number.isSafeInteger(initialId) && initialId > 0) {
			await selectNotice(initialId)
		}
	})

	onDestroy(() => {
		editor?.destroy()
	})
</script>

<div class="notice-list-pane">
	<div class="list-top">
		<div class="list-top-buttons">
			<Button size="md" onclick={startNewNotice}>
				<Icon icon="add" size={18} alt="add" />
				<Translation key="manage:notice-new" />
			</Button>
			<Button size="md" variant="outlined" onclick={openBannerSettings}>
				<Translation key="manage:notice-banner-settings" />
			</Button>
		</div>
		<SearchBar bind:value={searchQuery} placeholder="manage:notice-search-placeholder" />
	</div>

	<div class="list-items">
		{#if loadingList}
			<div class="center-box">
				<LoadingSpinner />
			</div>
		{:else if filteredNotices.length === 0}
			<div class="empty-box">
				<Translation key="manage:notice-empty" />
			</div>
		{:else}
			{#each filteredNotices as item (item.id)}
				<button
					type="button"
					class="notice-list-item"
					class:active={viewMode === 'notice' && selectedId === item.id}
					onclick={() => selectNotice(item.id)}
				>
					<div class="item-badges">
						{#if item.featured}
							<span class="chip chip-pinned">
								<Translation key="manage:notice-pinned" />
							</span>
						{/if}
						<span class="chip" class:chip-draft={!item.published}>
							<Translation
								key={item.published ? 'manage:notice-published' : 'manage:notice-draft'}
							/>
						</span>
						<span class="chip">
							<Translation key={noticeCategoryKey(item.category)} />
						</span>
						<span class="item-date">
							{formatNoticeDate(item.publishedAt ?? item.createdAt, $language)}
						</span>
					</div>
					<div class="item-title">{item.title}</div>
					{#if item.subtitle || item.excerpt}
						<div class="item-excerpt">{item.subtitle ?? item.excerpt}</div>
					{/if}
				</button>
			{/each}
		{/if}
	</div>
</div>

<div class="notice-editor-pane">
	{#if viewMode === 'banner'}
		<div class="editor-header">
			<div class="editor-mode-title">
				<Translation key="manage:notice-banner-settings" />
			</div>

			<div class="editor-header-actions">
				<LabeledCheckbox bind:checked={bannerEnabled}>
					<Translation key="manage:notice-banner-enabled" />
				</LabeledCheckbox>

				<Button size="md" disabled={savingBanner} onclick={saveBanner}>
					<Translation key="manage:notice-save" />
				</Button>
			</div>
		</div>

		<div class="banner-settings-form">
			<label class="field">
				<span class="field-label"><Translation key="manage:notice-banner-image-label" /></span>
				<input
					class="text-input"
					type="url"
					maxlength={2048}
					bind:value={bannerImageUrl}
					placeholder={t('manage:notice-banner-image-placeholder')}
				/>
			</label>

			<label class="field">
				<span class="field-label"><Translation key="manage:notice-banner-link-label" /></span>
				<input
					class="text-input"
					type="text"
					maxlength={2048}
					bind:value={bannerLinkUrl}
					placeholder={t('manage:notice-banner-link-placeholder')}
				/>
			</label>

			<label class="field">
				<span class="field-label"><Translation key="manage:notice-banner-title-label" /></span>
				<input
					class="text-input"
					type="text"
					maxlength={200}
					bind:value={bannerTitle}
					placeholder={t('manage:notice-banner-title-placeholder')}
				/>
			</label>

			<div class="banner-preview-section">
				<span class="field-label"><Translation key="manage:notice-banner-preview" /></span>
				<div class="banner-preview-card">
					{#if bannerImageUrl.trim()}
						<img class="banner-preview-bg" src={bannerImageUrl.trim()} alt={bannerTitle || 'Banner'} />
					{/if}
					<div class="banner-preview-gradient"></div>
					{#if bannerTitle.trim()}
						<div class="banner-preview-title">{bannerTitle.trim()}</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<div class="notice-form-container" class:hidden={viewMode === 'banner'}>
		<div class="editor-header">
			<div class="editor-mode-title">
				{#if selectedId === null}
					<Translation key="manage:notice-new" />
				{:else}
					#{selectedId} {title || ''}
				{/if}
			</div>

			<div class="editor-header-actions">
				<LabeledCheckbox bind:checked={featured}>
					<Translation key="manage:notice-featured-label" />
				</LabeledCheckbox>
				<LabeledCheckbox bind:checked={published}>
					<Translation key="manage:notice-published-label" />
				</LabeledCheckbox>

				{#if selectedId !== null}
					<Button size="md" variant="outlined" link href="/notices/{selectedId}">
						<Translation key="manage:notice-view" />
					</Button>
					<Button
						size="md"
						variant="outlined"
						disabled={deleting || saving}
						onclick={removeNotice}
					>
						<Translation key="manage:notice-delete" />
					</Button>
				{/if}

				<Button size="md" disabled={saving} onclick={saveNotice}>
					<Translation
						key={selectedId === null ? 'manage:notice-create' : 'manage:notice-save'}
					/>
				</Button>
			</div>
		</div>

		<div class="meta-grid">
			<label class="field field-title">
				<span class="field-label"><Translation key="manage:notice-title-label" /></span>
				<input
					class="text-input"
					type="text"
					maxlength={200}
					bind:value={title}
					placeholder={t('manage:notice-title-placeholder')}
				/>
			</label>

			<label class="field field-category">
				<span class="field-label"><Translation key="manage:notice-category-label" /></span>
				<select class="select-input" bind:value={category}>
					{#each NOTICE_CATEGORIES as cat (cat)}
						<option value={cat}>{t(noticeCategoryKey(cat))}</option>
					{/each}
				</select>
			</label>

			<label class="field field-subtitle">
				<span class="field-label"><Translation key="manage:notice-subtitle-label" /></span>
				<input
					class="text-input"
					type="text"
					maxlength={400}
					bind:value={subtitle}
					placeholder={t('manage:notice-subtitle-placeholder')}
				/>
			</label>
		</div>

		<div class="wysiwyg-wrapper" data-tick={editorTick}>
			<div class="toolbar">
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('paragraph')}
					onclick={() => editor?.chain().focus().setParagraph().run()}
					title="Paragraph"
				>
					P
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('heading', { level: 1 })}
					onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
					title="Heading 1"
				>
					H1
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('heading', { level: 2 })}
					onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
					title="Heading 2"
				>
					H2
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('heading', { level: 3 })}
					onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
					title="Heading 3"
				>
					H3
				</button>

				<span class="toolbar-divider"></span>

				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('bold')}
					onclick={() => editor?.chain().focus().toggleBold().run()}
					title="Bold"
				>
					<strong>B</strong>
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('italic')}
					onclick={() => editor?.chain().focus().toggleItalic().run()}
					title="Italic"
				>
					<em>I</em>
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('underline')}
					onclick={() => editor?.chain().focus().toggleUnderline().run()}
					title="Underline"
				>
					<u>U</u>
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('strike')}
					onclick={() => editor?.chain().focus().toggleStrike().run()}
					title="Strikethrough"
				>
					<s>S</s>
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('code')}
					onclick={() => editor?.chain().focus().toggleCode().run()}
					title="Inline Code"
				>
					&lt;/&gt;
				</button>

				<span class="toolbar-divider"></span>

				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive({ textAlign: 'left' })}
					onclick={() => editor?.chain().focus().setTextAlign('left').run()}
					title="Align Left"
				>
					⇤
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive({ textAlign: 'center' })}
					onclick={() => editor?.chain().focus().setTextAlign('center').run()}
					title="Align Center"
				>
					⇔
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive({ textAlign: 'right' })}
					onclick={() => editor?.chain().focus().setTextAlign('right').run()}
					title="Align Right"
				>
					⇥
				</button>

				<span class="toolbar-divider"></span>

				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('bulletList')}
					onclick={() => editor?.chain().focus().toggleBulletList().run()}
					title="Bullet List"
				>
					• List
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('orderedList')}
					onclick={() => editor?.chain().focus().toggleOrderedList().run()}
					title="Numbered List"
				>
					1. List
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('blockquote')}
					onclick={() => editor?.chain().focus().toggleBlockquote().run()}
					title="Quote"
				>
					❝
				</button>
				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('codeBlock')}
					onclick={() => editor?.chain().focus().toggleCodeBlock().run()}
					title="Code Block"
				>
					Code
				</button>
				<button
					type="button"
					class="tool-btn"
					onclick={() => editor?.chain().focus().setHorizontalRule().run()}
					title="Horizontal Rule"
				>
					―
				</button>

				<span class="toolbar-divider"></span>

				<button
					type="button"
					class="tool-btn"
					class:active={editor?.isActive('link')}
					onclick={promptLink}
					title="Insert Link"
				>
					Link
				</button>
				<button type="button" class="tool-btn" onclick={promptImage} title="Insert Image">
					Image
				</button>

				<span class="toolbar-divider"></span>

				<button
					type="button"
					class="tool-btn"
					onclick={() => editor?.chain().focus().undo().run()}
					title="Undo"
				>
					↶
				</button>
				<button
					type="button"
					class="tool-btn"
					onclick={() => editor?.chain().focus().redo().run()}
					title="Redo"
				>
					↷
				</button>
			</div>

			<div class="editor-surface markdown-body" bind:this={editorElement}></div>
		</div>
	</div>
</div>

<style lang="scss">
	.notice-list-pane {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 360px;
		min-width: 320px;
		height: 100%;
		overflow: hidden;
	}

	.list-top {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.list-top-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	.list-items {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 8px;
		overflow-y: auto;
		padding-right: 4px;
	}

	.center-box,
	.empty-box {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 32px 12px;
		color: rgba(255, 255, 255, 0.45);
		font-size: 14px;
		text-align: center;
	}

	.notice-list-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
		padding: 12px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.02);
		color: #fff;
		text-align: left;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease;

		&:hover {
			background: rgba(255, 255, 255, 0.06);
		}

		&.active {
			border-color: #3b84f1;
			background: rgba(59, 132, 241, 0.14);
		}
	}

	.item-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		align-items: center;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		padding: 3px 6px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		color: rgba(255, 255, 255, 0.65);
		font-size: 12px;
		line-height: 1;
	}

	.chip-pinned {
		border-color: #3b84f1;
		color: #3b84f1;
		font-weight: 700;
	}

	.chip-draft {
		border-color: #ecce23;
		color: #ecce23;
		font-weight: 600;
	}

	.item-date {
		margin-left: auto;
		color: rgba(255, 255, 255, 0.4);
		font-size: 12px;
	}

	.item-title {
		overflow: hidden;
		font-weight: 600;
		font-size: 15px;
		line-height: 1.35;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-excerpt {
		overflow: hidden;
		color: rgba(255, 255, 255, 0.5);
		font-size: 13px;
		line-height: 1.35;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.notice-editor-pane {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 16px;
		min-width: 560px;
		height: 100%;
		overflow-y: auto;
	}

	.notice-form-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 16px;
		min-height: 0;

		&.hidden {
			display: none;
		}
	}

	.banner-settings-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 720px;
	}

	.banner-preview-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 8px;
	}

	.banner-preview-card {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		width: 100%;
		max-width: 564px;
		height: 180px;
		padding: 28px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		background-color: #0c0d13;
	}

	.banner-preview-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.banner-preview-gradient {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%),
			linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%);
	}

	.banner-preview-title {
		position: relative;
		z-index: 1;
		max-width: 100%;
		overflow: hidden;
		color: #ebe5cd;
		font-weight: 700;
		font-size: 36px;
		line-height: 1.2;
		letter-spacing: -1.4px;
		text-align: right;
		text-overflow: ellipsis;
		text-shadow:
			0 0 36.9px rgba(0, 0, 0, 0.44),
			0 0 105px rgba(0, 0, 0, 0.44),
			0 4px 13.7px rgba(0, 0, 0, 0.25);
		white-space: nowrap;
	}

	.editor-header {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.editor-mode-title {
		font-weight: 600;
		font-size: 20px;
	}

	.editor-header-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
	}

	.meta-grid {
		display: grid;
		grid-template-columns: 1fr 220px;
		gap: 12px;
	}

	.field-subtitle {
		grid-column: 1 / -1;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.field-label {
		color: rgba(255, 255, 255, 0.65);
		font-weight: 500;
		font-size: 13px;
	}

	.text-input,
	.select-input {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 8px;
		background: rgba(12, 15, 29, 0.75);
		color: #fff;
		font-size: 14px;
		outline: none;

		&:focus {
			border-color: #3b84f1;
		}
	}

	.wysiwyg-wrapper {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 420px;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 8px;
		background: rgba(12, 15, 29, 0.6);
		overflow: hidden;
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		align-items: center;
		padding: 8px 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.03);
	}

	.toolbar-divider {
		width: 1px;
		height: 20px;
		margin: 0 4px;
		background: rgba(255, 255, 255, 0.14);
	}

	.tool-btn {
		padding: 5px 9px;
		border: 1px solid transparent;
		border-radius: 6px;
		background: transparent;
		color: rgba(255, 255, 255, 0.8);
		font-size: 13px;
		line-height: 1.2;
		cursor: pointer;

		&:hover {
			background: rgba(255, 255, 255, 0.08);
			color: #fff;
		}

		&.active {
			border-color: rgba(59, 132, 241, 0.6);
			background: rgba(59, 132, 241, 0.22);
			color: #fff;
		}
	}

	.editor-surface {
		flex: 1;
		padding: 20px;
		overflow-y: auto;

		:global(.tiptap) {
			min-height: 360px;
			outline: none;
		}

		:global(.tiptap p.is-editor-empty:first-child::before) {
			height: 0;
			color: rgba(255, 255, 255, 0.35);
			content: attr(data-placeholder);
			float: left;
			pointer-events: none;
		}
	}
</style>
