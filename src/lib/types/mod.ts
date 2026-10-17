import type { APIComments } from './comment'
export type { APIComment as APIModComment, APIComments as APIModComments } from './comment'

export interface ModDeveloper {
	authUserId: string
	username: string
	displayName: string
	avatar: string | null
	/** Present only when the developer credit list was overridden by a manager. */
	memberId?: number
}

export type APIModTag =
	| 'OFFICIAL'
	| 'LIBRARY'
	| 'LEVEL_EDITOR_ADD_ON'
	| 'OVERLAY'
	| 'MISCELLANEOUS'

export interface APIModVersion {
	version: string
	name: string
	description: string | null
	download: string | null
	parsedDownload: string | null
	imageUrl: string | null
	uploadedAt: string | null
	authorId?: string | null
	cachedUsername?: string | null
	cachedAvatar?: string | null
	developer?: ModDeveloper | null
}

export interface APIMod {
	license?: string | null
	licenseUrl?: string | null
	latestVersion?: string | null
	versions?: APIModVersion[]
	developer?: ModDeveloper | null
	id: string
	name: string
	version: string | null
	description: string | null
	download: string | null
	parsedDownload: string | null
	imageUrl: string | null
	authorId: string | null
	cachedUsername: string | null
	cachedAvatar: string | null
	uploadedAt: string | null
	guildId: string | null
	channelId: string | null
	messageId: string | null
	/** Viewer-scoped annotations attached when fetched with a session. */
	likeCount?: number
	liked?: boolean
	canManage?: boolean
	tags?: APIModTag[]
	developers?: ModDeveloper[]
}

export interface APIModManageVersion {
	version: string
	name: string
	description: string | null
	uploadedAt: string | null
	hideFromSearch: boolean | null
}

export interface APIModManage {
	id: string
	name: string
	version: string | null
	description: string | null
	imageUrl: string | null
	authorId: string | null
	cachedUsername: string | null
	uploadedAt: string | null
	hideFromSearch: boolean | null
	developersOverridden: boolean
	license: string | null
	licenseUrl: string | null
	tags: APIModTag[]
	developers: ModDeveloper[]
	likeCount: number
	versions: APIModManageVersion[]
}

export interface APIModListItem {
	id: string
	name: string
	version: string | null
	imageUrl: string | null
	uploadedAt: string | null
	hideFromSearch: boolean
}

export interface APIModLikeState {
	likeCount: number
	liked: boolean
}

export interface ModFormData {
	name: string
	description: string
	hideFromSearch: boolean
}

export interface ModVersionFormData {
	version: string
	name: string
	description: string
}

export interface APIModList {
	items: APIMod[]
	hasMore: boolean
}

export function safeModUrl(value: string | null): string | null {
	if (!value) return null
	try {
		const url = new URL(value)
		return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
	} catch {
		return null
	}
}

export const modDownloadUrl = (mod: Pick<APIMod, 'download' | 'parsedDownload'>) =>
	safeModUrl(mod.parsedDownload) ?? safeModUrl(mod.download)

export function modMessageUrl(mod: APIMod): string | null {
	return [mod.guildId, mod.channelId, mod.messageId].every((id) => id && /^\d+$/.test(id))
		? `https://discord.com/channels/${mod.guildId}/${mod.channelId}/${mod.messageId}`
		: null
}

export interface ModDetailData {
	referenceTime: number
	comments: APIComments | null
	mod: APIMod
	pageTitle: string
	descriptionHtml: string
	versions: (APIModVersion & { descriptionHtml: string })[]
}

export function modVersionPath(id: string, version: string): string {
	return `/mods/${encodeURIComponent(id)}/${encodeURIComponent(version)}`
}
