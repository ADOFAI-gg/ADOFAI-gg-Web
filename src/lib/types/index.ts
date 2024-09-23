export interface APITag {
	id: number
	name: string
}

export interface APILevel {
	id: number
	appendingTitle: string | null
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

	title: string
	// file
	// thumbnail
	// creators
	tags: APITag[]
	epilepsyWarning: boolean
}
