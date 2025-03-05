import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { env } from '$env/dynamic/public'

export const load: PageServerLoad = async ({ parent, cookies }) => {
	const { currentUser } = await parent()

	if (!currentUser) {
		cookies.set('redirectTo', window.location.href, { domain: env.PUBLIC_COOKIE_DOMAIN, path: '/' })
		return redirect(302, `${env.PUBLIC_ACCOUNT_SERVICE_URL}/auth/signin`)
	}
}
