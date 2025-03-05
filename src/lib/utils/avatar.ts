import { env } from '$env/dynamic/public'
import defaultDark from '$lib/assets/defaultAvatars/dark.png'
import defaultLight from '$lib/assets/defaultAvatars/light.png'

export const getAvatarUrl = (
	id: string | null,
	avatar: string | null,
	usage: 'artist' | 'creator' | null = null,
	size: number = 256
): string => {
	if (!id && usage !== null) {
		return usage === 'artist' ? defaultDark : defaultLight
	}

	return `${env.PUBLIC_ACCOUNT_SERVICE_URL}/content/avatars/${id}/${avatar ?? 'default'}.png?size=${size}`
}
