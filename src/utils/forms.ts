import { getContext, setContext } from 'svelte';
import { superForm } from 'sveltekit-superforms/client';

export const setForm: typeof superForm = (...args) => {
  const form = superForm(...args);
  setContext('_form', form);
  return form;
};

export const useForm = (): ReturnType<typeof superForm> => {
  return getContext('_form');
};
