import { api } from '$lib/api';
import type { APILevel, PaginatedResponse } from '$lib/types/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const legendaryLevels = await api
		.post('levels/search', {
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
				}
			},
			fetch
		})
		.json<PaginatedResponse<APILevel>>()
		.then((result) => result.results);

	return { legendaryLevels };
};
