import { isForumAdmin } from '~/lib/utils/perm'
import { error } from '@sveltejs/kit'
import { api, ky } from '~/lib'
import type { APIModListItem, APIModManage } from '~/lib/types/mod'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params, fetch, url, parent }) => {
	const { currentUser } = await parent()
	const mineOnly = isForumAdmin(currentUser) && url.searchParams.get('mine') !== 'false'
	const [manageResponse, listResponse] = await Promise.all([
		ky.get(api.forum(`mods/${encodeURIComponent(params.modId!)}/manage`), {
			fetch,
			throwHttpErrors: false
		}),
		ky.get(api.forum('mods/manage-list'), {
			fetch,
			throwHttpErrors: false,
			searchParams: { q: url.searchParams.get('q') ?? '', mine: String(mineOnly) }
		})
	])
	if (manageResponse.status === 401 || manageResponse.status === 403)
		error(403, 'mod:manage-forbidden')
	if (!manageResponse.ok) {
		error(
			manageResponse.status,
			manageResponse.status === 404 ? 'mod:not-found' : 'mod:manage-load-error'
		)
	}
	const mod = await manageResponse.json<APIModManage>()
	const list = listResponse.ok
		? await listResponse.json<APIModListItem[] | { items: APIModListItem[] }>()
		: null
	return {
		pageTitle: mod.name,
		mineOnly,
		search: url.searchParams.get('q') ?? '',
		noFooter: true,
		mod,
		list: Array.isArray(list) ? list : (list?.items ?? null)
	}
}
