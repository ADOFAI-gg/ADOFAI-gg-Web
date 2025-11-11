import { env } from '$env/dynamic/public';
import { default as origKy } from 'ky';

export const apiBase = new URL('/forum/v1', env.PUBLIC_API_BASE);

export const api = origKy.extend({
	credentials: 'include',
	hooks: {
		beforeError: [
			async (error) => {
				const { response } = error;
				if (response && response.body) {
					const body = await response.json<{ errors?: { message: string }[] }>();

					if ('errors' in body && body.errors instanceof Array && body.errors[0]?.message) {
						error.name = 'ForumAPIError';
						error.message = body.errors[0].message;
					}
				}

				return error;
			}
		]
	},
	prefixUrl: apiBase
});
