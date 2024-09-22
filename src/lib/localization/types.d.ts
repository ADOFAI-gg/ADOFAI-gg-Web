import type { extraSections } from './constants'

declare global {
	namespace ADOFAIGG_UI {
		type ExtraLangSections = typeof extraSections
	}
}
