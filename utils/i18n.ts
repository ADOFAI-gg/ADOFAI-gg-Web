import i18n from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const initI18n = (lng: string) => {
  i18n
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
      react: {
        useSuspense: false
      },
      supportedLngs: ['en', 'ko'],
      lng,
      interpolation: {
        escapeValue: false
      },
      defaultNS: 'common',
      ns: ['common', 'main'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }
    });

  return i18n;
};
