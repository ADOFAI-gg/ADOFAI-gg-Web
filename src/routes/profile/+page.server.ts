import { redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent, cookies, url }) => {
	const { currentUser } = await parent()
	if (!currentUser) {
		cookies.set('redirectTo', url.toString(), { domain: env.PUBLIC_COOKIE_DOMAIN, path: '/' })
		redirect(302, `${env.PUBLIC_ACCOUNT_SERVICE_URL}/auth/signin`)
	}
	redirect(302, `/members/${currentUser.id}`)
}
