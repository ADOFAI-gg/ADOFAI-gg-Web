import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const res = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('%body_class%', event.cookies.get('_adofaigg-solid-bg') ? '' : 'image-bg')
  });

  return res;
};
