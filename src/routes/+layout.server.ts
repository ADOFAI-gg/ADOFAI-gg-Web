import { currentLang, getLangCode } from '@/utils/i18n';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const lang = cookies.get('_adofaigg-lang');
  if (lang) {
    currentLang.set(getLangCode(lang));
  }
  return {};
};
