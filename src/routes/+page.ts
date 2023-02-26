import { api } from '@/api';
import type { Level, ListResponse, PlayLog, PlayLogWithLevel } from '@/types';

import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {
  const {
    data: { results: topPlaysRaw }
  } = await api.get<ListResponse<PlayLog>>('/api/v1/playLogs', {
    params: {
      offset: 0,
      amount: 3,
      sort: 'PP_DESC'
    }
  });

  const topPlays: PlayLogWithLevel[] = await Promise.all(
    topPlaysRaw.map(
      async (x) =>
        ({
          ...x,
          level: await (await api.get<Level>(`/api/v1/levels/${x.level.id}`)).data
        } as PlayLogWithLevel)
    )
  );

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
