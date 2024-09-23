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

export const parseVideoUrl = (
	url: string
): { type: 'youtube'; videoId: string; start: number } | null => {
	const youtubeVideoId = getYoutubeVideoId(url)

	if (youtubeVideoId) {
		const start = parseInt(new URL(url).searchParams.get('t') ?? '0')

		return {
			type: 'youtube',
			videoId: youtubeVideoId,
			start: isNaN(start) ? 0 : start
		}
	}

	return null
}
