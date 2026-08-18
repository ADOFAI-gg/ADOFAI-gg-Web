import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { env } from '$env/dynamic/public'
import { accountServiceUrl } from '~/lib'

export const load: LayoutServerLoad = async ({ parent, cookies, url }) => {
	const { currentUser } = await parent()

	if (!currentUser) {
		cookies.set('redirectTo', url.toString(), { domain: env.PUBLIC_COOKIE_DOMAIN, path: '/' })
		return redirect(302, accountServiceUrl('auth/signin'))
	}

	return {
		currentUser
	}
}
