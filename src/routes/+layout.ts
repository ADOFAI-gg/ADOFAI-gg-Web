import type { Load } from '@sveltejs/kit';
export const load: Load = async ({ url }) => ({ props: { url: url.href } });
