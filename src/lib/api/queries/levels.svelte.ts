import { api } from '$lib/api';
import type { APILevel, PaginatedResponse } from '$lib/types/api';
import type { SearchQuery } from '@adofai-gg/query-types';
import { createInfiniteQuery } from '@tanstack/svelte-query';
import type { Options } from 'ky';

type LevelSearchQuery = {
	skip: number;
	take: number;
	query: SearchQuery;
};

export const searchLevels = async (
	query: LevelSearchQuery,
	fetch: Options['fetch'] = undefined
): Promise<APILevel[]> => {
	return await api
		.post('levels/search', {
			json: query,
			fetch
		})
		.json<PaginatedResponse<APILevel>>()
		.then((x) => x.results);
};

export const createLevelSearchQuery = (query: () => SearchQuery, pageSize: () => number) => {
	const size = $derived(pageSize());
	return createInfiniteQuery(() => ({
		queryKey: ['levels', 'search', size, query()] as const,
		queryFn: async ({ queryKey, pageParam }) => {
			const [, , queryPageSize, query] = queryKey;
			return searchLevels({ query, skip: pageParam * queryPageSize, take: queryPageSize });
		},
		getNextPageParam: (prevPage, _allPages, prevParam) => {
			if (prevPage.length < size) return undefined;
			return prevParam + 1;
		},
		initialPageParam: 0
	}));
};
