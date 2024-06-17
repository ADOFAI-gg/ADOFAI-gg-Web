import { useSolidBackground } from '@/utils/settings';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const lang = cookies.get('_adofaigg-lang');
  const solidBackground = '_adofaigg-solid-bg';

  if (solidBackground) {
    useSolidBackground.set(true);
  }

  // if (lang) {
  //   currentLang.set(getLangCode(lang));
  // }
  return {
    initialLang: lang
  };
};
