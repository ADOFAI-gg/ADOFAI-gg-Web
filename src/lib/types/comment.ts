export interface APIComment {
	pinned: boolean
	id: string
	parentId: string | null
	text: string
	deleted: boolean
	createdAt: string
	updatedAt: string | null
	author: {
		id: number
		displayName: string
		authUserId: string | null
		avatar: string | null
	} | null
}
export interface APIComments {
	canPin: boolean
	items: APIComment[]
	nextCursor: string | null
}
