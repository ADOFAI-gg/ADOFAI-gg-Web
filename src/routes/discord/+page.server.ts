import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = () => {
  throw redirect(303, import.meta.env.VITE_DISCORD_INVITE);
};
