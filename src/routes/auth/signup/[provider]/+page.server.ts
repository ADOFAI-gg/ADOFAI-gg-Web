import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { schema } from './_schema';

const providers = ['google', 'discord'] as const;

type ProviderName = (typeof providers)[number];

const providerNames: Record<ProviderName, string> = {
  google: 'Google',
  discord: 'Discord'
};

export const load: PageServerLoad = async ({ params: { provider } }) => {
  if (!(providers as unknown as string[]).includes(provider))
    return error(404, { message: 'Not found' });

  return {
    provider,
    providerName: providerNames[provider as ProviderName],
    form: await superValidate(schema)
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) return fail(400, { form });
  }
};
