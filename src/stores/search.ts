import { parseSearchString, SearchStringAnalyzer } from '@/utils/search';
import { derived } from 'svelte/store';
import { createLocalStorage } from './localStorage';

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
  tiles: {
    min: number | null;
    max: number | null;
  };
  bpm: {
    min: number | null;
    max: number | null;
  };
};

export type SearchSettings = {
  query: string;
  filter: Filters;
  sort: {
    order: 'asc' | 'desc' | 'shuffle';
    type: 'created' | 'difficulty' | 'likes';
  };
};

export const defaultSearchSettings = (): SearchSettings => ({
  query: '',
  filter: {
    tags: {
      include: [],
      exclude: []
    },
    musicLength: null,
    difficulty: {
      min: null,
      max: null
    },
    tiles: {
      min: null,
      max: null
    },
    bpm: {
      min: null,
      max: null
    }
  },
  sort: {
    order: 'desc',
    type: 'created'
  }
});

export const searchSettingStore = createLocalStorage<SearchSettings>(
  'searchSettings',
  defaultSearchSettings()
);

export const parsedQuery = derived(searchSettingStore, (values) => {
  return new SearchStringAnalyzer(parseSearchString(values.query));
});
