import langs from '@/assets/langs.json';
import { FluentBundle, FluentResource, type FluentVariable } from '@fluent/bundle';
import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

export const availableLanguages: LangResponse[] = langs;

export const fallbackLang = 'en';

const langSections = [
  'common',
  'common-auth',
  'footer',
  'home',
  'level-details',
  'level-table-cols',
  'nav',
  'ranking',
  'references',
  'search',
  'settings',
  'sign-in',
  'sign-up-email',
  'sign-up',
  'tags',
  'user-popup'
] as const;

export type LangSection = (typeof langSections)[number];
export type LangData = Record<LangSection, FluentBundle>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type StringTranslationKey = `${LangSection}:` | (`${LangSection}:${string & {}}` & {});
export type ArrayTranslationKey = [LangSection, string];
export type TranslationKey = StringTranslationKey | ArrayTranslationKey;

const rawFluentFiles = import.meta.glob('../assets/locales/**/*.ftl', { eager: true, as: 'raw' });
const sourceResources = Object.fromEntries(
  langSections.map((x) => [x, new FluentResource(rawFluentFiles[`../assets/locales/en/${x}.ftl`])])
);

const buildLangBundle = (lang: string): LangData => {
  const result: LangData = {} as LangData;

  for (const section of langSections) {
    const bundle = new FluentBundle(lang);
    setupFunctions(bundle);

    bundle.addResource(sourceResources[section]);
    const rawData = rawFluentFiles[`../assets/locales/${lang}/${section}.ftl`];
    const errors = bundle.addResource(new FluentResource(rawData), { allowOverrides: true });
    for (const error of errors) {
      console.warn('Fluent resource load error:', error);
    }
    result[section] = bundle;
  }

  return result;
};

const setupFunctions = (bundle: FluentBundle) => {
  bundle._functions.FORUM_LINK = (text) => `[forumLink]${text}[/forumLink]`;
};

export const langData: Record<string, LangData> = Object.fromEntries(
  langs.map((lang) => [lang.code, buildLangBundle(lang.code)])
);

export const getLangCode = (code: string) => {
  const lang = availableLanguages.find((x) => x.code === code || x.aliases.includes(code));
  return lang?.code || 'en';
};

// export const currentLang = writable<string>(
//   getLangCode(browser ? Cookies.get('_adofaigg-lang') || window.navigator.language : 'en')
// );

// currentLang.subscribe((v) => {
//   Cookies.set('_adofaigg-lang', v, { expires: 365 * 10 });
//   _currentLang = v;
// });

type LangResponse = {
  code: string;
  name: string;
  aliases: string[];
};

const escapeHtmlTags = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const translate = (
  rawKey: TranslationKey,
  args: Record<string, FluentVariable>,
  escape: boolean,
  l: string
) => {
  let key: string;
  let sectionName: LangSection;

  if (typeof rawKey === 'string') {
    [sectionName, key] = rawKey.split(':') as ArrayTranslationKey;
  } else {
    [sectionName, key] = rawKey;
  }

  if (!l) return key;
  const lang = langData[l];
  if (!lang) return key;
  const section = lang[sectionName];
  if (!section) return key;
  const message = section.getMessage(key);
  if (!message?.value) return key;
  const result = section.formatPattern(message.value, args);
  if (escape) escapeHtmlTags(result);
  return result;
};

export const getLangContext = () => getContext<Writable<string>>('lang');
