/** @type {import('next').NextConfig} */
module.exports = {
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