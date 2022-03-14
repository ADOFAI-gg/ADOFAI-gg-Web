import common from './public/locales/en/common.json';
import main from './public/locales/en/main.json';
import level from './public/locales/en/level.json';
import errors from './public/locales/en/errors.json';
import search from './public/locales/en/search.json';
import tags from './public/locales/en/tags.json';
import auth from './public/locales/en/auth.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      main: typeof main;
      level: typeof level;
      errors: typeof errors;
      search: typeof search;
      tags: typeof tags;
      auth: typeof auth;
    };
  }
}
