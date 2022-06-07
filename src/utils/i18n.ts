import { writable } from 'svelte/store';
import { Asset } from './assets';

export const i18nReady = writable(false);

export const availableLanguages: LangResponse[] = [];

export const fallbackLang = 'en';

export const currentLang = writable<string>();

export const langData = writable<Record<string, Record<string, string>>>({});

const processLang = (code: string) => {
  const lang = availableLanguages.find((x) => x.code === code || x.aliases.includes(code));
  return lang?.code || 'en';
};

type LangResponse = {
  code: string;
  name: string;
  aliases: string[];
};

export const setupI18n = async () => {
  const langs = await Asset.loadJSON<LangResponse[]>('langs.json');
  availableLanguages.push(...langs);
  const langCode = localStorage.getItem('lang');
  currentLang.set(processLang(langCode || window.navigator.language));
  for (const lang of langs) {
    const json = await Asset.loadJSON(`translations/${lang.code}.json`);
    langData.update((v) => ({ ...v, [lang.code]: json }));
  }
  i18nReady.set(true);
};
