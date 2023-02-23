import { writable } from 'svelte/store';
import { Asset } from './assets';

export const i18nReady = writable(false);

export const availableLanguages: LangResponse[] = [];

export const fallbackLang = 'en';

export const currentLang = writable<string>();

let _currentLang = '';

currentLang.subscribe((v) => {
  _currentLang = v;
});

export const langData = writable<Record<string, Record<string, string>>>({});

let _langData: Record<string, Record<string, string>> = {};

langData.subscribe((v) => {
  _langData = v;
});

const processLang = (code: string) => {
  const lang = availableLanguages.find((x) => x.code === code || x.aliases.includes(code));
  return lang?.code || 'en';
};

type LangResponse = {
  code: string;
  name: string;
  aliases: string[];
};

let init = false;

export const setupI18n = async () => {
  if (init) return;
  init = true;
  const langs = await Asset.loadJSON<LangResponse[]>('langs.json');
  availableLanguages.push(...langs);
  const langCode = localStorage.getItem('lang');
  const data = await Promise.all(
    langs.map(async (lang) => [lang.code, await Asset.loadJSON(`translations/${lang.code}.json`)])
  );

  langData.set(Object.fromEntries(data));

  currentLang.set(processLang(langCode || window.navigator.language));
  i18nReady.set(true);
};

export const translate = (key: string, l: string = _currentLang) => {
  if (!l) return key;
  const lang = _langData[l];
  if (!lang) return key;
  const k = lang[key] ?? _langData[fallbackLang][key];
  if (!k) return key;
  return k;
};
