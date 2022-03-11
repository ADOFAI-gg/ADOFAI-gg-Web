/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeDetection: false
  },
  compiler: {
    styledComponents: true
  }
};

const withPWA = require('next-pwa');

const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  ...config,
  pwa: {
    dest: 'public',
    runtimeCaching
  }
});
