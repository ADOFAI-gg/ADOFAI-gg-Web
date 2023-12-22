import { superValidate } from 'sveltekit-superforms/client';
import type { Actions, PageServerLoad } from './$types';
import { schema } from './_schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    minimalFooter: true,
    form: await superValidate(schema)
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  }
};
