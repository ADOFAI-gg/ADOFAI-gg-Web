import { api } from '..'
import type { APILevel } from '../types'

export const getDifficulty = (level: APILevel) => {
	if (level.quality === 'HIDDEN') return -2

	return level.difficulty
}

export const getTags = (level: APILevel) => {
	const dangerTags: string[] = []
	const warningTags: string[] = []
	const result: string[] = []

	for (const tag of level.tags) {
		if (['NSFW', 'EPILEPSY_WARNING'].includes(tag.name)) {
			dangerTags.push(tag.name)
			continue
		}
		if (['DLC'].includes(tag.name)) {
			warningTags.push(tag.name)
			continue
		}
		result.push(tag.name)
	}

	return [...dangerTags, ...warningTags, ...result]
}

export const getDownloadUrl = (level: APILevel) => {
	if (level.file) {
		return api.forum(`levels/${level.id}/file`)
	}

	return level.downloadUrl
}
