import { env } from '$env/dynamic/public'
import { translateKey, type SelectOption, type TranslationKey } from '@adofai-gg/ui'
import './localization'
import { default as origKy } from 'ky'

const base = env.PUBLIC_API_BASE

export const ky = origKy.extend({
	hooks: {
		beforeError: [
			async (error) => {
				const { response } = error
				if (response && response.body) {
					const body = await response.json<any>()

					if ('errors' in body && body.errors instanceof Array && body.errors[0]?.message) {
						error.name = 'ForumAPIError'
						error.message = body.errors[0].message
					}
				}

				return error
			}
		]
	}
})

export const api = {
	forum: (endpoint: string) => `${base}/forum/v1/${endpoint}`,
	auth: (endpoint: string) => `${base}/auth/v1/${endpoint}`
}

export * from './types'

export * from './utils/parser'

export const localizeOptions = <T>(lang: string, items: SelectOption<T>[]): SelectOption<T>[] => {
	return items.map((x) => ({
		...x,
		label: translateKey(lang, x.label as TranslationKey, {}),
		subtitle: x.subtitle ? translateKey(lang, x.subtitle as TranslationKey, {}) : undefined
	}))
}

export const formatBPM = (min: number | null, max: number | null) => {
	if (min === null || max === null) return null
	if (min !== max) {
		return `${min}-${max}`
	}

	if (min === 0 && max === 0) return null

	return `${min}`
}
