import type { APILevel } from '../types'

const youtubeIdRegex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/

export const getYoutubeVideoId = (url: string) => youtubeIdRegex.exec(url)?.[1] ?? ''

export const getLevelThumbnail = (level: APILevel): string | null => {
	const youtubeVideoId = getYoutubeVideoId(level.videoUrl)

	if (youtubeVideoId) {
		return `https://i.ytimg.com/vi/${youtubeVideoId}/original.jpg`
	}

	return null
}
