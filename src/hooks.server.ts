import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from '$env/static/public';

Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  environment: dev ? 'dev' : PUBLIC_SENTRY_ENV
});

export const handle: Handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
  const res = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('%body_class%', event.cookies.get('_adofaigg-solid-bg') ? '' : 'image-bg')
  });

  return res;
});

export const handleError = Sentry.handleErrorWithSentry();
