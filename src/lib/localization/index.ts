import { libTranslationResources, mergeLocalizationResources } from '@adofai-gg/ui';

import ko from './sources/ko.ftl?raw';
import en from './sources/en.ftl?raw';
import ja from './sources/ja.ftl?raw';
import vi from './sources/vi.ftl?raw';

export const availableLanguages = Object.keys(libTranslationResources);

export const translationResources = mergeLocalizationResources(libTranslationResources, {
	ko: [ko],
	en: [en],
	ja: [ja],
	vi: [vi]
});
