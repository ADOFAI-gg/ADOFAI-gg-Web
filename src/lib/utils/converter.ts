import type { User } from '@adofai-gg/ui'
import type { APIMember } from '../types'
import { getAvatarUrl } from './avatar'

export const convertUser = (from: APIMember, usage: 'artist' | 'creator' | null = null): User => {
	return {
		avatarURL: getAvatarUrl(from.authUserId, from.avatar, usage),
		displayName: from.displayName,
		isAdmin: false
	}
}
