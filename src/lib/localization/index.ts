import { registerTranslations } from '@adofai-gg/ui'
import { extraSections } from './constants'

const translationData = Object.fromEntries(
	Object.entries(
		import.meta.glob('./*/*.ftl', { eager: true, query: '?raw', import: 'default' })
	).map(([k, v]) => [k.slice(2, k.length - 4), v])
) as Record<string, string>

registerTranslations(translationData, [...extraSections])
