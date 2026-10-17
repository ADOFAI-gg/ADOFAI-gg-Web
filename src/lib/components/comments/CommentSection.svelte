<!-- UI package snapshot: ui/src/lib/components/comment/comment-section.svelte.
     Keep synchronized until the installed @adofai-gg/ui release exports CommentSection. -->
<script lang="ts" module>
	import type { Snippet } from 'svelte'
	export type DiscussionComment = {
		id: string
		author: { name: string; avatar: string | null }
		/** Sanitized HTML from a trusted Markdown renderer; never pass raw user HTML. */
		html?: string
		text: string
		timestamp?: string
		edited?: boolean
		pinned?: boolean
		deleted?: boolean
		canEdit?: boolean
		canDelete?: boolean
		replies?: DiscussionComment[]
	}
	export type CommentSectionProps = {
		comments?: DiscussionComment[]
		author?: DiscussionComment['author'] | null
		onsubmit?: (text: string, parentId?: string) => Promise<void> | void
		onupdate?: (id: string, text: string) => Promise<void> | void
		ondelete?: (id: string) => Promise<void> | void
		canPin?: boolean
		onpin?: (id: string, pinned: boolean) => Promise<void> | void
		avatar?: Snippet<[DiscussionComment['author'], number]>
		labels?: Partial<typeof defaultLabels>
	}
	const defaultLabels = {
		edit: '수정',
		remove: '삭제',
		save: '저장',
		confirmRemove: '삭제할까요?',
		deleted: '삭제된 댓글입니다.',
		title: '댓글',
		placeholder: '댓글 달기…',
		replyPlaceholder: '답글 달기…',
		post: '게시',
		cancel: '취소',
		reply: '답글 달기',
		replies: '답글',
		pinned: '고정됨',
		pin: '고정',
		unpin: '고정 해제',
		more: '더 보기',
		less: '접기',
		empty: '아직 댓글이 없습니다.',
		unavailable: '댓글 기능을 준비 중입니다.',
		error: '게시하지 못했습니다. 다시 시도해 주세요.'
	}
</script>

<script lang="ts">
	import { onMount, tick } from 'svelte'
	let {
		comments = [],
		author = null,
		onsubmit,
		onupdate,
		ondelete,
		canPin = false,
		onpin,
		avatar,
		labels = {}
	}: CommentSectionProps = $props()
	const l = $derived({ ...defaultLabels, ...labels })
	let draft = $state('')
	let replyDraft = $state('')
	let replying = $state<string | null>(null)
	let expanded = $state<string[]>([])
	let fullText = $state<string[]>([])
	let pending = $state(false)
	let error = $state('')
	let editing = $state<string | null>(null)
	let editDraft = $state('')
	let deleting = $state<string | null>(null)
	let now = $state(Date.now())
	onMount(() => {
		const timer = setInterval(() => (now = Date.now()), 60_000)
		return () => clearInterval(timer)
	})
	function relativeTime(timestamp: string) {
		const seconds = Math.round((new Date(timestamp).getTime() - now) / 1000)
		const abs = Math.abs(seconds)
		const [unit, divisor]: [Intl.RelativeTimeFormatUnit, number] =
			abs < 60 ? ['second', 1] : abs < 3600 ? ['minute', 60] : abs < 86400 ? ['hour', 3600] : abs < 2_592_000 ? ['day', 86400] : abs < 31_536_000 ? ['month', 2_592_000] : ['year', 31_536_000]
		return new Intl.RelativeTimeFormat('ko', { numeric: 'always' }).format(Math.round(seconds / divisor), unit)
	}
	function fullDate(timestamp: string) {
		return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(timestamp))
	}
	function submitOnEnter(event: KeyboardEvent & { currentTarget: HTMLTextAreaElement }) {
		// Enter used to confirm Korean/Japanese IME composition must stay in the editor.
		if (event.key !== 'Enter' || event.shiftKey || event.isComposing || event.keyCode === 229)
			return
		event.preventDefault()
		if (event.repeat || pending || !event.currentTarget.value.trim()) return
		event.currentTarget.form?.requestSubmit()
	}
	function autosize(node: HTMLTextAreaElement, _value: string) {
		let active = true
		function resize() {
			if (!active || !node.isConnected) return
			node.style.height = 'auto'
			node.style.height = `${node.scrollHeight + node.offsetHeight - node.clientHeight}px`
		}
		function scheduleResize() {
			void tick().then(resize)
		}
		let width = node.clientWidth
		const observer = new ResizeObserver(() => {
			if (node.clientWidth !== width) {
				width = node.clientWidth
				resize()
			}
		})
		observer.observe(node)
		node.addEventListener('input', resize)
		scheduleResize()
		return {
			update(_value: string) {
				scheduleResize()
			},
			destroy() {
				active = false
				observer.disconnect()
				node.removeEventListener('input', resize)
			}
		}
	}

	async function pin(comment: DiscussionComment) {
		if (pending || !onpin || !canPin) return
		pending = true
		error = ''
		try {
			await onpin(comment.id, !comment.pinned)
		} catch {
			error = l.error
		} finally {
			pending = false
		}
	}

	async function mutate(id: string, remove = false) {
		if (pending) return
		pending = true
		error = ''
		try {
			if (remove) await ondelete?.(id)
			else await onupdate?.(id, editDraft.trim())
			editing = null
			deleting = null
		} catch {
			error = l.error
		} finally {
			pending = false
		}
	}
	function toggle(id: string) {
		expanded = expanded.includes(id) ? expanded.filter((x) => x !== id) : [...expanded, id]
	}
	async function submit(parentId?: string) {
		const text = (parentId ? replyDraft : draft).trim()
		if (!text || !author || !onsubmit || pending) return
		pending = true
		error = ''
		try {
			await onsubmit(text, parentId)
			if (parentId) {
				replyDraft = ''
				replying = null
				expanded = [...expanded, parentId]
			} else draft = ''
		} catch {
			error = l.error
		} finally {
			pending = false
		}
	}
</script>

{#snippet userAvatar(user: DiscussionComment['author'], size: number)}
	{#if avatar}{@render avatar(user, size)}{:else}
		<span class="avatar" style:width="{size}px" style:height="{size}px">
			{#if user.avatar}<img src={user.avatar} alt="" />{:else}{user.name.slice(0, 1)}{/if}
		</span>
	{/if}
{/snippet}

{#snippet composer(parentId?: string)}
	<form
		class="composer"
		onsubmit={(event) => {
			event.preventDefault()
			submit(parentId)
		}}
	>
		{#if author}{@render userAvatar(author, parentId ? 32 : 40)}{/if}
		<div class="body">
			{#if author}<strong>{author.name}</strong>{/if}
			{#if parentId}
				<textarea
					aria-label={l.replyPlaceholder}
					placeholder={l.replyPlaceholder}
					bind:value={replyDraft}
					use:autosize={replyDraft}
					onkeydown={submitOnEnter}
					disabled={pending}
					rows="1"
					required
					maxlength="10000"
				></textarea>
			{:else}
				<textarea
					aria-label={l.placeholder}
					placeholder={onsubmit && author ? l.placeholder : l.unavailable}
					bind:value={draft}
					use:autosize={draft}
					onkeydown={submitOnEnter}
					disabled={!onsubmit || !author || pending}
					rows="1"
					required
					maxlength="10000"
				></textarea>
			{/if}
			<div class="actions">
				<button
					class="post"
					type="submit"
					disabled={pending || !onsubmit || !author || !(parentId ? replyDraft : draft).trim()}
					>{l.post}</button
				>
				<button
					type="button"
					disabled={pending}
					onclick={() => {
						if (parentId) {
							replyDraft = ''
							replying = null
						} else draft = ''
					}}>{l.cancel}</button
				>
			</div>
		</div>
	</form>
{/snippet}

{#snippet thread(comment: DiscussionComment, depth = 0)}
	<article class="thread">
		<div class="comment">
			{@render userAvatar(comment.author, depth ? 32 : 40)}
			<div class="body">
				<div class="meta">
					<strong>{comment.author.name}</strong>{#if comment.timestamp}<time
							datetime={comment.timestamp}
							title={fullDate(comment.timestamp)}
							>{relativeTime(comment.timestamp)}{#if comment.edited} · 수정됨{/if}</time
						>{/if}{#if comment.pinned}<span class="pinned">{l.pinned}</span>{/if}
				</div>
				{#if editing === comment.id}
					<form
						onsubmit={(event) => {
							event.preventDefault()
							mutate(comment.id)
						}}
					>
						<textarea
							bind:value={editDraft}
							use:autosize={editDraft}
							onkeydown={submitOnEnter}
							rows="1"
							aria-label={l.edit}
							maxlength="10000"
							required
							disabled={pending}
						></textarea>
						<div class="actions">
							<button class="post" type="submit" disabled={pending || !editDraft.trim()}
								>{l.save}</button
							><button type="button" disabled={pending} onclick={() => (editing = null)}
								>{l.cancel}</button
							>
						</div>
					</form>
				{:else if comment.html !== undefined && !comment.deleted}
					<div class="markdown" class:clamped={!fullText.includes(comment.id)}>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html comment.html}
					</div>
				{:else}<p class:clamped={!fullText.includes(comment.id)}>
						{comment.deleted ? l.deleted : comment.text}
					</p>{/if}

				{#if comment.text.length > 180 || comment.text.split('\n').length > 4}<button
						class="more"
						onclick={() => {
							fullText = fullText.includes(comment.id)
								? fullText.filter((x) => x !== comment.id)
								: [...fullText, comment.id]
						}}>{fullText.includes(comment.id) ? l.less : l.more}</button
					>{/if}
				<div class="actions">
					{#if comment.replies?.length}<button
							class="replies"
							aria-expanded={expanded.includes(comment.id)}
							onclick={() => toggle(comment.id)}>{l.replies} {comment.replies.length}</button
						>{/if}
					{#if onsubmit && author && !comment.deleted && depth < 4}<button
							onclick={() => {
								replying = comment.id
								replyDraft = ''
							}}>{l.reply}</button
						>{/if}
					{#if depth === 0 && !comment.deleted && canPin && onpin}<button
							disabled={pending}
							onclick={() => pin(comment)}>{comment.pinned ? l.unpin : l.pin}</button
						>{/if}
					{#if !comment.deleted && comment.canEdit && onupdate}<button
							disabled={pending}
							onclick={() => {
								editing = comment.id
								editDraft = comment.text
							}}>{l.edit}</button
						>{/if}
					{#if !comment.deleted && comment.canDelete && ondelete}<button
							disabled={pending}
							onclick={() => (deleting = comment.id)}>{l.remove}</button
						>{/if}
					{#if deleting === comment.id}<span>{l.confirmRemove}</span><button
							disabled={pending}
							onclick={() => mutate(comment.id, true)}>{l.remove}</button
						><button disabled={pending} onclick={() => (deleting = null)}>{l.cancel}</button>{/if}
				</div>
			</div>
		</div>
		{#if expanded.includes(comment.id) || replying === comment.id}
			<div class="nested">
				{#if replying === comment.id}{@render composer(comment.id)}{/if}
				{#each comment.replies ?? [] as reply (reply.id)}{@render thread(reply, depth + 1)}{/each}
			</div>
		{/if}
	</article>
{/snippet}

<section class="discussion" aria-label={l.title}>
	<h2>{l.title}</h2>
	{@render composer()}
	{#if error}<p role="alert">{error}</p>{/if}
	{#each comments as comment (comment.id)}{@render thread(comment)}{:else}<p class="empty">
			{l.empty}
		</p>{/each}
</section>

<style>
	.discussion {
		display: flex;
		flex-direction: column;
		gap: 32px;
		width: 100%;
	}
	h2 {
		font-size: 24px;
		font-weight: 600;
		border-bottom: 2px solid rgb(255 255 255 / 20%);
		padding-bottom: 8px;
		margin: 0;
	}
	.comment,
	.composer {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}
	.body {
		flex: 1;
		min-width: 0;
		font-size: 14px;
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px;
	}
	strong {
		font-size: 14px;
		font-weight: 600;
	}
	time,
	.more,
	.empty {
		color: rgb(255 255 255 / 60%);
	}
	p {
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		margin: 2px 0;
		line-height: 1.4;
	}
	.markdown {
		overflow-wrap: anywhere;
		line-height: 1.4;
		margin: 2px 0;
	}
	.markdown :global(p) {
		margin: 0 0 8px;
	}
	.markdown :global(p:last-child) {
		margin-bottom: 0;
	}
	.markdown :global(a) {
		color: #7cafff;
		text-decoration: underline;
	}
	.markdown :global(ul),
	.markdown :global(ol) {
		margin: 4px 0;
		padding-left: 24px;
	}
	.markdown :global(ul) {
		list-style: disc;
	}
	.markdown :global(ol) {
		list-style: decimal;
	}
	.markdown :global(blockquote) {
		border-left: 3px solid rgb(255 255 255 / 30%);
		padding-left: 12px;
		margin: 8px 0;
		color: rgb(255 255 255 / 80%);
	}
	.markdown :global(pre) {
		overflow-x: auto;
		padding: 12px;
		background: rgb(3 6 28 / 30%);
		border-radius: 8px;
		margin: 8px 0;
	}
	.markdown :global(code) {
		font-family: monospace;
		background: rgb(3 6 28 / 20%);
		border-radius: 4px;
		padding: 1px 4px;
	}
	.markdown :global(pre code) {
		background: transparent;
		padding: 0;
	}
	.markdown :global(img) {
		max-width: 100%;
		height: auto;
	}
	.markdown :global(table) {
		display: block;
		overflow-x: auto;
		border-collapse: collapse;
	}
	.markdown :global(th),
	.markdown :global(td) {
		padding: 4px 8px;
		border: 1px solid rgb(255 255 255 / 20%);
	}
	.markdown :global(h1),
	.markdown :global(h2),
	.markdown :global(h3),
	.markdown :global(h4),
	.markdown :global(h5),
	.markdown :global(h6) {
		font-size: 1.1em;
		font-weight: 600;
		margin: 8px 0 4px;
	}
	.markdown :global(.discord-subtext) {
		font-size: 12px;
		color: rgb(255 255 255 / 60%);
	}
	.clamped {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.avatar {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 50%;
		background: rgb(255 255 255 / 20%);
		overflow: hidden;
	}
	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	textarea {
		box-sizing: border-box;
		width: 100%;
		resize: none;
		overflow-y: hidden;
		line-height: 1.4;
		min-height: 38px;
		padding: 8px 0;
		border: 0;
		border-bottom: 1px solid rgb(255 255 255 / 20%);
		background: transparent;
		color: inherit;
		font: inherit;
	}
	textarea:focus-visible {
		outline: 2px solid #3b84f1;
		outline-offset: 2px;
	}
	textarea::placeholder {
		color: rgb(255 255 255 / 60%);
	}
	.actions {
		display: flex;
		gap: 4px;
		margin-top: 4px;
	}
	button {
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 12px;
		padding: 6px 12px;
		border-radius: 8px;
		cursor: pointer;
	}
	button:hover {
		background: rgb(255 255 255 / 10%);
	}
	button:disabled {
		opacity: 0.4;
		cursor: default;
	}
	.post {
		background: rgb(255 255 255 / 10%);
	}
	.replies {
		background: rgb(59 132 241 / 15%);
		color: #3b84f1;
	}
	.more {
		padding: 0;
		font-size: 14px;
	}
	.pinned {
		background: #ecce23;
		color: #03061c;
		padding: 0 6px;
		border-radius: 4px;
		font-size: 12px;
	}
	.nested {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 12px 0 0 52px;
	}
	@media (max-width: 640px) {
		.nested {
			margin-left: 20px;
		}
	}
</style>
