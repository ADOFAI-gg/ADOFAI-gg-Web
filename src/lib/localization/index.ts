import { registerTranslations } from '@adofai-gg/ui'
import { extraSections } from './constants'

const normalizeLanguage = (language: string) =>
	language === 'ChineseSimplified' ? 'zh-CN' : language

export const translationData = Object.fromEntries(
	Object.entries(
		import.meta.glob('./*/*.ftl', { eager: true, query: '?raw', import: 'default' })
	).map(([k, v]) => {
		const [language, section] = k.slice(2, k.length - 4).split('/', 2)
		return [`${normalizeLanguage(language)}/${section}`, v]
	})
) as Record<string, string>

registerTranslations(translationData, [...extraSections])
