import { writable } from 'svelte/store';

type Filters = {
  tags: {
    include: number[];
    exclude: number[];
  };
  musicLength: 'short' | 'medium' | 'long' | null;
};

export type SearchSettings = {
  query: string;
  filter: Filters;
};

export const searchSetingStore = writable<SearchSettings>({
  query: '',
  filter: {
    tags: {
      include: [],
      exclude: []
    },
    musicLength: null
  }
});
