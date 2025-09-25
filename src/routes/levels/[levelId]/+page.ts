import { api, ky, type APILevel } from '~/lib'
import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { HTTPError } from 'ky'

export const load: PageLoad = async ({ params, fetch }) => {
	try {
		const res = await ky.get(api.forum(`levels/${encodeURIComponent(params.levelId)}`), {
			fetch
		})

		const data: APILevel = await res.json()

		return {
			level: data,
			pageTitle: data.title
		}
	} catch (e) {
		if (e instanceof HTTPError) {
			return error(e.response.status, e.message)
		}

		throw e
	}
}
