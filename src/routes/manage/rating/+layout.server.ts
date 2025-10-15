import { checkFlag } from '~/lib/utils/perm'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ parent }) => {
	const { currentUser } = await parent()

	const hasPerm = checkFlag(currentUser.permissionFlag, 1 << 7)

	if (!hasPerm) return error(400, { message: 'You do not have access to this page.' })

	// if (currentUse)

	return {}
}
