<script lang="ts">
	import { untrack } from 'svelte'
	import { page } from '$app/state'
	import {
		Button,
		Translation,
		getGlobalContext,
		translateKey,
		type TranslationKey
	} from '@adofai-gg/ui'
	import { api, ky } from '~/lib'
	import { renderMarkdown } from '~/lib/utils/markdown'
	import { checkFlag } from '~/lib/utils/perm'
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import type { APIComment, APIComments } from '~/lib/types/comment'
	import CommentSection, { type DiscussionComment } from './CommentSection.svelte'

	let {
		resource,
		resourceId,
		initialPage
	}: { resource: 'mods' | 'levels'; resourceId: string | number; initialPage: APIComments | null } =
		$props()
	const { language } = getGlobalContext()
	const t = (key: TranslationKey) => translateKey($language, key, {}, false)
	// The parent keys this component by resource ID so drafts and loaded pages stay isolated.
	let items = $state<APIComment[]>(untrack(() => initialPage?.items ?? []))
	let cursor = $state(untrack(() => initialPage?.nextCursor ?? null))
	let failed = $state(untrack(() => initialPage === null))
	let loading = $state(false)
	let canPin = $state(untrack(() => initialPage?.canPin ?? false))
	const user = $derived(page.data.currentUser)
	const author = $derived(
		user
			? { name: user.displayName, avatar: getAvatarUrl(user.authUserId, user.avatar, null, 64) }
			: null
	)
	const endpoint = $derived(api.forum(`${resource}/${encodeURIComponent(resourceId)}/comments`))
	function merge(incoming: APIComment[]) {
		const byId = new Map(items.map((item) => [item.id, item]))
		for (const item of incoming) byId.set(item.id, item)
		items = [...byId.values()].sort((a, b) => Number(a.id) - Number(b.id))
	}
	const comments = $derived.by(() => {
		const nodes = new Map<string, DiscussionComment>(
			items.map((item) => [
				item.id,
				{
					id: item.id,
					text: item.text,
					html: item.deleted ? undefined : renderMarkdown(item.text),
					deleted: item.deleted,
					pinned: item.pinned,
					author: {
						name: item.author?.displayName ?? t('comment:deleted-author'),
						avatar: item.author
							? getAvatarUrl(item.author.authUserId, item.author.avatar, null, 64)
							: null
					},
					timestamp: item.createdAt,
					edited: !!item.updatedAt && !item.deleted,
					canEdit: !!user && item.author?.id === user.id,
					canDelete:
						!!user && (item.author?.id === user.id || checkFlag(user.permissionFlag, 1 << 7)),
					replies: []
				}
			])
		)
		const roots: DiscussionComment[] = []
		for (const item of items) {
			const node = nodes.get(item.id)!
			if (item.parentId && nodes.has(item.parentId)) nodes.get(item.parentId)!.replies!.push(node)
			else roots.push(node)
		}
		return roots.sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned))
	})
	async function loadMore() {
		if (loading) return
		loading = true
		try {
			const result = await ky
				.get(endpoint, { searchParams: cursor ? { after: cursor } : {}, retry: 0 })
				.json<APIComments>()
			merge(result.items)
			cursor = result.nextCursor
			canPin = result.canPin
			failed = false
		} catch {
			failed = true
		} finally {
			loading = false
		}
	}
	async function post(text: string, parentId?: string) {
		merge([await ky.post(endpoint, { json: { text, parentId }, retry: 0 }).json<APIComment>()])
	}
	async function update(id: string, text: string) {
		merge([await ky.patch(`${endpoint}/${id}`, { json: { text }, retry: 0 }).json<APIComment>()])
	}
	async function pin(id: string, pinned: boolean) {
		merge([
			await ky.patch(`${endpoint}/${id}/pin`, { json: { pinned }, retry: 0 }).json<APIComment>()
		])
	}

	async function remove(id: string) {
		merge([await ky.delete(`${endpoint}/${id}`, { retry: 0 }).json<APIComment>()])
	}
</script>

<div>
	<CommentSection
		{comments}
		{author}
		onsubmit={user ? post : undefined}
		onupdate={update}
		ondelete={remove}
		canPin={!!user && canPin}
		onpin={pin}
		labels={{
			title: t('comment:title'),
			placeholder: t('comment:placeholder'),
			replyPlaceholder: t('comment:reply-placeholder'),
			unavailable: t('comment:login'),
			empty: failed ? t('comment:load-error') : t('comment:empty'),
			post: t('comment:post'),
			cancel: t('comment:cancel'),
			reply: t('comment:reply'),
			replies: t('comment:replies'),
			more: t('comment:more'),
			less: t('comment:less'),
			pinned: t('comment:pinned'),
			pin: t('comment:pin'),
			unpin: t('comment:unpin'),
			error: t('comment:save-error'),
			edit: t('comment:edit'),
			remove: t('comment:delete'),
			save: t('comment:save'),
			confirmRemove: t('comment:confirm-delete'),
			deleted: t('comment:deleted')
		}}
	/>
	{#if failed}<p role="alert"><Translation key="mod:comments-load-error" /></p>{/if}
	{#if cursor || failed}<div class="load-more">
			<Button variant="outlined" size="sm" disabled={loading} onclick={loadMore}
				><Translation key={failed ? 'comment:retry' : 'comment:load-more'} /></Button
			>
		</div>{/if}
</div>

<style>
	.load-more {
		margin-top: 16px;
	}
	p {
		margin-top: 12px;
		color: #f54f51;
	}
</style>
