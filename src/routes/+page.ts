import { browser } from '$app/environment';
import { api } from '@/api';

import type { Load } from '@sveltejs/kit';
import type { Data } from '../components/templates/Home.svelte';

export const load: Load = async () => {
  if (!browser) {
    return { recentLevels: [], topPlays: [] } as Data;
  }

  const {
    data: { results: topPlays }
  } = await api.get('/api/v1/playLogs', {
    params: {
      offset: 0,
      amount: 3,
      sort: 'PP_DESC'
    }
  });
  const {
    data: { results: recentLevels }
  } = await api.get('/api/v1/levels', {
    params: {
      offset: 0,
      amount: 10,
      sort: 'RECENT_DESC'
    }
  });

  return {
    topPlays,
    recentLevels
  };
};
