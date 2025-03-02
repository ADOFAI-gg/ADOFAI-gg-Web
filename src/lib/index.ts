import { env } from '$env/dynamic/public'
import { translateKey, type SelectOption, type TranslationKey } from '@adofai-gg/ui'
import './localization'

const base = env.PUBLIC_API_BASE

export const api = {
	forum: (endpoint: string) => `${base}/forum/v1/${endpoint}`
}

export * from './types'

export * from './utils/parser'

export const localizeOptions = (lang: string, items: SelectOption[]): SelectOption[] => {
	return items.map((x) => ({
		...x,
		label: translateKey(lang, x.label as TranslationKey, {}),
		subtitle: x.subtitle ? translateKey(lang, x.subtitle as TranslationKey, {}) : undefined
	}))
}
