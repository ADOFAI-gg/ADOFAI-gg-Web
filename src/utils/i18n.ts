import { writable } from 'svelte/store';
import type Translations from '@/assets/translations/en.json';

import langs from '@/assets/langs.json';
import { browser } from '$app/environment';
import Cookies from 'js-cookie';

export type TranslationKeys = keyof typeof Translations;

export const availableLanguages: LangResponse[] = langs;

export const fallbackLang = 'en';

let _currentLang = 'en';

const rawLangData = import.meta.glob('../assets/translations/*.json', { eager: true });

export const langData: Record<string, Record<string, string>> = Object.fromEntries(
  langs.map((x) => [
    x.code,
    rawLangData[`../assets/translations/${x.code}.json`] as Record<string, string>
  ])
);

export const getLangCode = (code: string) => {
  const lang = availableLanguages.find((x) => x.code === code || x.aliases.includes(code));
  return lang?.code || 'en';
};

export const currentLang = writable<string>(
  getLangCode(browser ? Cookies.get('_adofaigg-lang') || window.navigator.language : 'en')
);

currentLang.subscribe((v) => {
  Cookies.set('_adofaigg-lang', v, { expires: 365 * 10 });
  _currentLang = v;
});

type LangResponse = {
  code: string;
  name: string;
  aliases: string[];
};

export const translate = (key: string, l: string = _currentLang) => {
  if (!l) return key;
  const lang = langData[l];
  if (!lang) return key;
  const k = lang[key] ?? langData[fallbackLang][key];
  if (!k) return key;
  return k;
};
