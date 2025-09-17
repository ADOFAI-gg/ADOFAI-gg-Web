import type { APILevelRating } from '../types'

export type RatingStatus = 'completed' | 'ratingNeeded' | 'discussionNeeded' | 'confirmNeeded'

export const getRatingStatus = (rating: APILevelRating): RatingStatus => {
	if (rating.completed) return 'completed'
	if (rating.requiresDiscussion) return 'discussionNeeded'
	// if (rating)
	return 'ratingNeeded'
}
