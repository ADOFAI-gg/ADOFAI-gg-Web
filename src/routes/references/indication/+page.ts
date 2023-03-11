import { ReferenceTab } from '../+layout.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    tab: ReferenceTab.Indication
  };
};
