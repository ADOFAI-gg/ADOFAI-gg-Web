import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = () => {
  throw redirect(303, import.meta.env.VITE_DISCORD_INVITE);
};
