import { api, type APIMember } from '~/lib'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ fetch }) => {
	const userResponse = await fetch(api.forum('members/@me'), {
		credentials: 'include'
	})

	if (!userResponse.ok && userResponse.status !== 403) {
		return error(500, 'failed to fetch user')
	}

	const user: APIMember | null = userResponse.status === 403 ? null : await userResponse.json()

	return {
		pageTitle: 'ADOFAI.gg',
		currentUser: user
	}
}
