import { api, ky } from '~/lib'
import { translateKey } from '@adofai-gg/ui'
import { error } from '@sveltejs/kit'
import type { APIModList } from '~/lib/types/mod'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, fetch, parent }) => {
	const params = new URLSearchParams()
	for (const key of ['q', 'author', 'sort']) {
		const value = url.searchParams.get(key)
		if (value) params.set(key, value)
	}
	params.set('limit', '30')
	const response = await ky.get(api.forum(`mods/?${params}`), { fetch, throwHttpErrors: false })
	if (!response.ok) error(response.status, 'mod:list-load-error')
	const mods = await response.json<APIModList>()
	return {
		mods,
		modSearch: params.toString(),
		pageTitle: translateKey((await parent()).lang, 'mod:title', {}, false)
	}
}
