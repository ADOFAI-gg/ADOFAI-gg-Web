import { api, ky, type APINotice } from '~/lib'
import type { PageLoad } from './$types'
import type { ListResponse } from '~/types'

export const load: PageLoad = async ({ fetch, url }) => {
	const category = url.searchParams.get('category') ?? undefined
	const res = await ky
		.get(api.forum('notices'), {
			searchParams: {
				offset: '0',
				amount: '50',
				...(category ? { category } : {})
			},
			fetch,
			throwHttpErrors: false
		})
		.catch(() => null)

	const notices: ListResponse<APINotice> =
		res && res.ok ? ((await res.json()) as ListResponse<APINotice>) : { results: [], count: 0 }

	return {
		notices,
		selectedCategory: category ?? null,
		pageTitle: 'ADOFAI.gg - Notices'
	}
}
