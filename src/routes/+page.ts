import { api, ky, type APILevel } from '~/lib'
import type { PageLoad } from './$types'
import type { SearchQuery } from '@adofai-gg/query-types'
import type { ListResponse } from '~/types'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ fetch }) => {
	const featuredRes = await ky.post(api.forum('levels/search'), {
		json: {
			skip: 0,
			take: 5,
			query: {
				sort: [
					{
						direction: 'desc',
						objective: 'id'
					}
				],
				filter: {
					op: 'eq',
					key: 'quality',
					value: 'LEGENDARY'
				}
			} satisfies SearchQuery
		},
		fetch
	})

	if (!featuredRes.ok) return error(500, 'failed to fetch featured levels')

	const featured = (await featuredRes.json()) as ListResponse<APILevel>

	return { featured }
}
