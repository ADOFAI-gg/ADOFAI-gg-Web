import { api, ky, type APINotice } from '~/lib'
import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await ky.get(api.forum(`notices/${encodeURIComponent(params.noticeId)}`), {
		fetch,
		throwHttpErrors: false
	})

	if (res.status === 404) {
		return error(404, 'Notice not found')
	}
	if (!res.ok) {
		return error(500, 'Failed to load notice')
	}

	const notice = (await res.json()) as APINotice

	return {
		notice,
		pageTitle: `ADOFAI.gg - ${notice.title}`
	}
}
