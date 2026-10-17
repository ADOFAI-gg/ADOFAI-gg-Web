import { availableLanguages, registerTranslations } from '@adofai-gg/ui'
import { extraSections } from './constants'

const translationData = Object.fromEntries(
	Object.entries(
		import.meta.glob('./*/*.ftl', { eager: true, query: '?raw', import: 'default' })
	).map(([k, v]) => [k.slice(2, k.length - 4), v])
) as Record<string, string>

// New sections can ship in English and Korean first. Supply English for
// other locales so the UI library never receives an undefined Fluent resource.
for (const { code } of availableLanguages) {
	for (const section of extraSections) {
		translationData[`${code}/${section}`] ??= translationData[`en/${section}`]
	}
}
registerTranslations(translationData, [...extraSections])
