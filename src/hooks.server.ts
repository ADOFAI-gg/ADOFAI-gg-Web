import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

Sentry.init({
  dsn: 'https://aa59dab6a96a4261ac725a3eef4de52e@sentry.pikokr.dev/2',
  tracesSampleRate: 1,
  environment: dev ? 'dev' : import.meta.env.VITE_SENTRY_ENV
});

export const handle: Handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
  const res = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('%body_class%', event.cookies.get('_adofaigg-solid-bg') ? '' : 'image-bg')
  });

  return res;
});

export const handleError = Sentry.handleErrorWithSentry();
