import { writable } from 'svelte/store';

type Filters = {
  tags: {
    include: number[];
    exclude: number[];
  };
  musicLength: 'short' | 'medium' | 'long' | null;
  difficulty: {
    min: number | null;
    max: number | null;
  };
};

export type SearchSettings = {
  query: {
    artist: string;
    creator: string;
    title: string;
  };
  filter: Filters;
  sort: {
    order: 'asc' | 'desc' | 'shuffle';
    type: 'created' | 'difficulty' | 'likes';
  };
};

export const defaultSearchSettings: SearchSettings = {
  query: {
    artist: '',
    creator: '',
    title: ''
  },
  filter: {
    tags: {
      include: [],
      exclude: []
    },
    musicLength: null,
    difficulty: {
      min: null,
      max: null
    }
  },
  sort: {
    order: 'asc',
    type: 'created'
  }
};

export const searchSetingStore = writable<SearchSettings>(defaultSearchSettings);
