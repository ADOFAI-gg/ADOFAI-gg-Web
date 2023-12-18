import { PUBLIC_DISCORD_INVITE } from '$env/static/public';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = () => {
  throw redirect(303, PUBLIC_DISCORD_INVITE);
};
