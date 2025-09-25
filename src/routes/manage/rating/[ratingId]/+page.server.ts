import { api, ky, type APILevel, type APILevelRating } from '~/lib'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent, params, fetch }) => {
	const { currentUser } = await parent()

	const rating = await ky
		.get(api.forum('levels/ratings/' + encodeURIComponent(params.ratingId)), {
			fetch
		})
		.json<APILevelRating>()

	const level = await ky
		.get(api.forum('levels/' + encodeURIComponent(rating.level.id)), {
			fetch
		})
		.json<APILevel>()

	return {
		rating,
		level
	}
}
