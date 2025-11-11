import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';
import { acceptedLanguages } from '@adofai-gg/ui';

export const load: LayoutServerLoad = ({ request, cookies }) => {
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

	return { acceptedLanguages: accepted, initialLang: lang };
};
