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
  sort: {
    order: 'asc' | 'desc' | 'shuffle';
    type: 'created' | 'difficulty' | 'likes';
  };
};

export const searchSetingStore = writable<SearchSettings>({
  query: '',
  filter: {
    tags: {
      include: [],
      exclude: []
    },
    musicLength: null
  },
  sort: {
    order: 'asc',
    type: 'created'
  }
});
