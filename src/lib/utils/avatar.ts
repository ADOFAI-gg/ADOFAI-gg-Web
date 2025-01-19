import type { APIMember } from '../types'
import { env } from '$env/dynamic/public'
import defaultDark from '$lib/assets/defaultAvatars/dark.png'
import defaultLight from '$lib/assets/defaultAvatars/light.png'

export const getAvatarUrl = (
	user: APIMember,
	usage: 'artist' | 'creator' | null = null
): string => {
	if (!user.username) {
		return usage === 'artist' ? defaultDark : defaultLight
	}

	return `${env.PUBLIC_ACCOUNT_SERVICE_URL}/content/avatars/${user.id}/${user.avatar ?? 'default'}`
}
