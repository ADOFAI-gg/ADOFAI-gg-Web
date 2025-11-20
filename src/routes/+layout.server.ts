import { env } from '$env/dynamic/public';
import { api } from '$lib/api';
import type { APIMe } from '$lib/types/api';
import { HTTPError } from 'ky';
import type { LayoutServerLoad } from './$types';
import { acceptedLanguages } from '@adofai-gg/ui';

export const load: LayoutServerLoad = async ({ request, cookies, fetch }) => {
	const accepted = acceptedLanguages(request.headers.get('accept-language') ?? '');
	const lang = cookies.get('adofaigg.lang');

	if (lang) {
		cookies.set('adofaigg.lang', lang, {
			domain: env.PUBLIC_COOKIE_DOMAIN,
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			httpOnly: false,
			secure: true,
			sameSite: 'lax'
		});
	}

	let me: APIMe | null = null;

	try {
		me = await api.get('members/@me', { fetch }).json<APIMe>();
	} catch (e) {
		if (e instanceof HTTPError && e.response.status === 403) {
			me = null;
		} else {
			throw e;
		}
	}

	return { acceptedLanguages: accepted, initialLang: lang, me };
};
