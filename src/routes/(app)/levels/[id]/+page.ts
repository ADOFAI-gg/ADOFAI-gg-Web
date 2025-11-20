import { api } from '$lib/api';
import type { APILevel } from '$lib/types/api';
import type { PageLoad } from './$types';
import { encode } from '@adofai-gg/ui';

export const load: PageLoad = async ({ params, fetch }) => {
	const level = await api.get(encode`levels/${params.id}`, { fetch }).json<APILevel>();

	return {
		level
	};
};
