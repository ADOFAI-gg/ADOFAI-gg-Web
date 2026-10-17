import { api, ky, type APILevel, type APINotice, type APINoticeBanner } from '~/lib'
import type { PageLoad } from './$types'
import type { SearchQuery } from '@adofai-gg/query-types'
import type { ListResponse } from '~/types'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ fetch }) => {
	const [featuredRes, noticesRes, bannerRes] = await Promise.all([
		ky.post(api.forum('levels/search'), {
			json: {
				skip: 0,
				take: 4,
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
		}),
		ky
			.get(api.forum('notices'), {
				searchParams: { offset: '0', amount: '6' },
				fetch,
				throwHttpErrors: false
			})
			.catch(() => null),
		ky
			.get(api.forum('notices/banner'), {
				fetch,
				throwHttpErrors: false
			})
			.catch(() => null)
	])

	if (!featuredRes.ok) return error(500, 'failed to fetch featured levels')

	const featured = (await featuredRes.json()) as ListResponse<APILevel>
	const notices: ListResponse<APINotice> =
		noticesRes && noticesRes.ok
			? ((await noticesRes.json()) as ListResponse<APINotice>)
			: { results: [], count: 0 }
	const banner: APINoticeBanner =
		bannerRes && bannerRes.ok
			? ((await bannerRes.json()) as APINoticeBanner)
			: { enabled: false, imageUrl: null, linkUrl: null, title: null, updatedAt: null }

	return { featured, notices, banner }
}
