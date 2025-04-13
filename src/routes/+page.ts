import { api, type APILevel } from '~/lib'
import type { PageLoad } from './$types'
import type { SearchQuery } from '@adofai-gg/query-types'
import type { ListResponse } from '~/types'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ fetch }) => {
	const featuredRes = await fetch(api.forum('levels/search'), {
		body: JSON.stringify({
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
		}),
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	})

	if (!featuredRes.ok) return error(500, 'failed to fetch featured levels')

	const featured = (await featuredRes.json()) as ListResponse<APILevel>

	return { featured }
}
