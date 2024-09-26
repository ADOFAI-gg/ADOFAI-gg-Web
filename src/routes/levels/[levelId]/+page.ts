import { api, type APILevel } from '~/lib'
import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(api.forum(`levels/${encodeURIComponent(params.levelId)}`))

	if (!res.ok) {
		if (res.status === 404) {
			return error(404, { message: 'Unknown level' })
		}
		return error(500)
	}

	const data: APILevel = await res.json()

	return {
		level: data,
		pageTitle: data.title
	}
}
