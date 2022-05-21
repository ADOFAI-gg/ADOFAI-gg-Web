import axios from 'axios';
import { writable } from 'svelte/store';
import { Asset } from './assets';

const loadJSON = async <T = Record<string, string>>(key: string) => {
  return (await axios.get<T>(Asset.url(key))).data;
};

export const fallbackLang = 'en';

export const currentLang = writable<string>();

export const langData = writable<Record<string, Record<string, string>>>({});

const processLang = (code: string) => {
  switch (code) {
    case 'ko':
    case 'ko-KR':
      return 'ko';
    default:
      return 'en';
  }
};

export const setupI18n = async () => {
  const langs = await loadJSON<string[]>('langs.json');
  const langCode = localStorage.getItem('lang');
  currentLang.set(processLang(langCode || window.navigator.language));
  for (const lang of langs) {
    const json = await loadJSON(`translations/${lang}.json`);
    langData.update((v) => ({ ...v, [lang]: json }));
  }
};
