import { isForumAdmin } from '~/lib/utils/perm'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ parent }) => {
	const { currentUser } = await parent()

	if (!isForumAdmin(currentUser)) {
		return error(403, { message: 'You do not have access to this page.' })
	}

	return {}
}
