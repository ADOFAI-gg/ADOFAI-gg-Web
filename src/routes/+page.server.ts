import { serverApi } from '$lib/server/serverApi';
import type { Level, ListResponse, PlayLog, PlayLogWithLevel } from '@/types';

import type { PageLoad } from './$types';

const loadPlayLogs = async () => {
  const {
    data: { results: topPlaysRaw }
  } = await serverApi.get<ListResponse<PlayLog>>('/api/v1/playLogs', {
    params: {
      offset: 0,
      amount: 3,
      sort: 'PP_DESC'
    }
  });

  return Promise.all(
    topPlaysRaw.map(async (x) => ({
      ...x,
      level: {
        ...x.level,
        ...(await serverApi.get<Level>(`/api/v1/levels/${x.level.id}`)).data
      }
    }))
  ) as Promise<PlayLogWithLevel[]>;
};

const loadRecentLevels = () =>
  serverApi
    .get<ListResponse<Level>>('/api/v1/levels', {
      params: {
        offset: 0,
        amount: 10,
        sort: 'RECENT_DESC'
      }
    })
    .then((x) => x.data.results);

export const load: PageLoad = async () => {
  const [topPlays, recentLevels] = await Promise.all([loadPlayLogs(), loadRecentLevels()]);

  return {
    topPlays,
    recentLevels
  };
};
