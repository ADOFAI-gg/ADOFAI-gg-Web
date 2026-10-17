export const ROLE_ADMIN = 1 << 2
export const PERM_RATING_REVIEW = 1 << 7

export const checkFlag = (value: number, flag: number) => {
	return (value & flag) === flag
}

export const isForumAdmin = (user?: { roleFlag?: number } | null) => {
	return Boolean(user && typeof user.roleFlag === 'number' && checkFlag(user.roleFlag, ROLE_ADMIN))
}
