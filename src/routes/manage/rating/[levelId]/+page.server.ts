import { api, ky, type APILevelRating } from '~/lib'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, fetch }) => {
	const res = await ky.get(api.forum('levels/ratings/' + encodeURIComponent(params.levelId)), {
		fetch
	})
	const data = await res.json<APILevelRating>()
	return {
		rating: data
	}
}
