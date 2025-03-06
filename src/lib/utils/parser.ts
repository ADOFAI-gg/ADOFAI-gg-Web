import { z } from 'zod'
import type { APILevel } from '../types'

const youtubeIdRegex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/

export const getYoutubeVideoId = (url: string) => youtubeIdRegex.exec(url)?.[1] ?? ''

export const getLevelThumbnail = (level: APILevel): string | null => {
	const youtubeVideoId = getYoutubeVideoId(level.videoUrl)

	if (youtubeVideoId) {
		return `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`
	}

	return null
}

export const getYoutubeThumbnail = (url: string) => {
	const youtubeVideoId = getYoutubeVideoId(url)

	if (youtubeVideoId) {
		return `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`
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

const urlSchema = z.string().url()

export const isYouTubeLink = (url: string): boolean => {
	if (!urlSchema.safeParse(url).success) {
		return false
	}

	const u = new URL(url)

	if (u.protocol !== 'https:') return false

	if (u.hostname === 'youtube.com' || u.hostname === 'www.youtube.com') {
		if (u.pathname.startsWith('/watch') && u.searchParams.get('v')) return true
	}

	if (u.hostname === 'youtu.be') {
		return true
	}

	return false
}

export const isWorkshopLink = (url: string): boolean => {
	if (!urlSchema.safeParse(url).success) {
		return false
	}

	const u = new URL(url)

	if (u.protocol !== 'https:') return false

	if (u.hostname !== 'steamcommunity.com') return false
	if (!u.pathname.startsWith('/sharedfiles/filedetails')) return false
	if (!u.searchParams.get('id')) return false

	return true
}
