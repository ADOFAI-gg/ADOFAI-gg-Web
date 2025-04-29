import { api, ky, type APIMember } from '~/lib'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'
import { availableLanguages } from '@adofai-gg/ui'

export const load: LayoutServerLoad = async ({ request, fetch, cookies }) => {
	const userResponse = await ky(api.forum('members/@me'), {
		credentials: 'include',
		fetch,
		throwHttpErrors: false
	})

	if (!userResponse.ok && userResponse.status !== 403) {
		return error(500, 'failed to fetch user')
	}

	const user: APIMember | null = userResponse.status === 403 ? null : await userResponse.json()

	const acceptLang = (request.headers.get('Accept-Language') ?? '')
		.split(',')
		.map((x) => x.trim().split(';')[0])
		.filter((x) => x)[0]

	let lang = cookies.get('adofaigg.lang') || acceptLang || 'en'

	const available = availableLanguages.find((x) => x.code === lang || x.aliases.includes(lang))

	if (available) lang = available.code
	else lang = 'en'

	if (lang) {
		cookies.set('adofaigg.lang', lang, {
			domain: env.PUBLIC_COOKIE_DOMAIN,
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			httpOnly: false,
			secure: true,
			sameSite: 'lax'
		})
	}

	return {
		pageTitle: 'ADOFAI.gg',
		currentUser: user,
		lang
	}
}
