export * from './create-level'

export interface APITag {
	id: number
	name: string
}

export interface APIMember {
	id: number
	displayName: string
	username: string | null
	totalPp: number
	avatar: string | null
	authUserId: string | null
}

export interface APIMe extends APIMember {
	permissionFlag: number
	levelRaterDifficultyRangeFlag: number
}

export interface APIMusic {
	id: number
	name: string
	artists: APIMember[]
}

export interface APIFile {
	id: number
	name: string
	extension: string
	contentMD5: string
	size: number
}

export interface APILevel {
	id: number
	note: string | null
	appendingTitle: string | null
	description: string
	creatorAlias: string | null
	pending: boolean
	quality: 'HIDDEN' | 'UNLISTED' | 'LISTED' | 'FEATURED' | 'LEGENDARY'
	videoUrl: string
	downloadUrl: string | null
	workshopUrl: string | null
	minBpm: number | null
	maxBpm: number | null
	lengthMs: number | null
	tile: number
	difficulty: number | null

	file: APIFile | null
	thumbnail: APIFile | null

	title: string
	// file
	// thumbnail
	creators: APIMember[]
	tags: APITag[]
	epilepsyWarning: boolean
	music: APIMusic
}

export type DifficultyRange = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'

export interface APILevelRating {
	id: number
	expectDifficulty: number
	finalDifficulty: number | null
	finalQuality: string | null
	completed: boolean
	requiresDiscussion: boolean
	difficultyRange: null | DifficultyRange
	declineReason: string | null
	createdAt: string
	createdBy: {
		id: number
		name: string
	}
	reviews: APILevelRatingReview[]
	level: Omit<APILevel, 'music'>
}

export interface APILevelRatingReview {
	difficulty: number
	quality: APILevel['quality']
	createdAt: [number, number, number, number, number, number, number]
	reviewer: APIMember
}
