import type { APIMember } from '../types'
import { env } from '$env/dynamic/public'
import defaultDark from '$lib/assets/defaultAvatars/dark.png'
import defaultLight from '$lib/assets/defaultAvatars/light.png'

export const getAvatarUrl = (
	user: APIMember,
	usage: 'artist' | 'creator' | null = null,
	size: number = 256
): string => {
	if (!user.username && usage !== null) {
		return usage === 'artist' ? defaultDark : defaultLight
	}

	return `${env.PUBLIC_ACCOUNT_SERVICE_URL}/content/avatars/${user.authUserId}/${user.avatar ?? 'default'}.png?size=${size}`
}
