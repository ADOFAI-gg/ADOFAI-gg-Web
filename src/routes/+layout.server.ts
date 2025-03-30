import { api, type APIMember } from '~/lib'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const userResponse = await fetch(api.forum('members/@me'), {
		credentials: 'include'
	})

	if (!userResponse.ok && userResponse.status !== 403) {
		return error(500, 'failed to fetch user')
	}

	const user: APIMember | null = userResponse.status === 403 ? null : await userResponse.json()

	const lang = cookies.get('adofaigg.lang') || 'en'

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
