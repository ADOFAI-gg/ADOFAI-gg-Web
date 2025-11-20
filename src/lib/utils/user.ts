import type { APIMe, APIMember } from '$lib/types/api';
import type { UserProp } from '@adofai-gg/ui';
import defaultDark from '$lib/assets/default-avatars/dark.png';
import defaultLight from '$lib/assets/default-avatars/light.png';
import { env } from '$env/dynamic/public';

export type AvatarUsage = 'artist' | 'creator' | null;

export const toUIUser = (user: APIMember, avatarUsage: AvatarUsage = null): UserProp => {
	return {
		name: user.displayName,
		avatar: getAvatarUrl(user.authUserId, user.avatar, avatarUsage)
	};
};

export const getAvatarUrl = (
	id: string | null,
	avatar: string | null,
	usage: AvatarUsage = null,
	size: number = 256
): string => {
	if (!id && usage !== null) {
		return usage === 'artist' ? defaultDark : defaultLight;
	}

	return `${env.PUBLIC_ACCOUNT_SERVICE_URL}/content/avatars/${id}/${avatar ?? 'default'}.png?size=${size}`;
};

export const checkFlag = (value: number, flag: number) => {
	return (value & flag) === flag;
};

export const checkPermission = (me: APIMe | null, flag: MemberPermission) => {
	if (!me) return false;
	return checkFlag(me.permissionFlag, flag);
};

export enum MemberPermission {
	LevelRequestReview = 1 << 7
}
