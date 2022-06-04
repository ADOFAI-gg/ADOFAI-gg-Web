import { writable } from 'svelte/store';

type Filters = {
  tags: {
    include: number[];
    exclude: number[];
  };
};

type SearchSettings = {
  query: string;
  filter: Filters;
};

export const searchSetingStore = writable<SearchSettings>({
  query: '',
  filter: {
    tags: {
      include: [],
      exclude: []
    }
  }
});
