import * as Sentry from '@sentry/browser';

export const setupSentry = () => {
  Sentry.init({
    dsn: 'https://2ecc5abf3f814edd8a769cb770f26dde@sentry.oci.pikokr.dev/3'
  });
};
