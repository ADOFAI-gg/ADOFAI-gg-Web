/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeDetection: false
  },
  experimental: {
    styledComponents: true
  }
};

const withPWA = require('next-pwa');

module.exports =
  process.env.NODE_ENV === 'development'
    ? config
    : withPWA({
        ...config,
        pwa: {
          dest: 'public'
        }
      });
