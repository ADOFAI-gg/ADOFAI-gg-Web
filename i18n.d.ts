import common from './public/locales/en/common.json';
import main from './public/locales/en/main.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      main: typeof main;
    };
  }
}
