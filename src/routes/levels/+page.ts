import type { SearchQuery } from '@adofai-gg/query-types'
import type { PageLoad } from './$types'
import {
	buildLevelQuery,
	buildLevelSearchScheme,
	fetchLevels,
	getLevelSearchOptions,
	pageSize
} from './search'

const scheme = buildLevelSearchScheme('') // dummy scheme for server side building

export const load: PageLoad = async ({ url, parent }) => {
	const { queryClient } = await parent()

	const options = getLevelSearchOptions(url, scheme)
	const query = buildLevelQuery(url.searchParams.get('q') || '', options, scheme)

	const queryKey = ['levels', 'search', query]

	await queryClient.prefetchInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam, queryKey }) => {
			return fetchLevels(pageSize * pageParam, pageSize, queryKey[2] as SearchQuery)
		},
		initialPageParam: 0
	})
}
