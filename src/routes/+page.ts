import { api } from '@/api';
import type { Level, ListResponse, PlayLog, PlayLogWithLevel, SyncStatusResponse } from '@/types';

import type { PageLoad } from './$types';

const loadPlayLogs = async () => {
  const {
    data: { results: topPlaysRaw }
  } = await api.get<ListResponse<PlayLog>>('/api/v1/playLogs', {
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
        ...(await (await api.get<Level>(`/api/v1/levels/${x.level.id}`)).data)
      }
    }))
  ) as Promise<PlayLogWithLevel[]>;
};

const loadRecentLevels = () =>
  api
    .get<ListResponse<Level>>('/api/v1/levels', {
      params: {
        offset: 0,
        amount: 10,
        sort: 'RECENT_DESC'
      }
    })
    .then((x) => x.data.results);

const loadSyncStatus = () => api.get<SyncStatusResponse>('/api/v1/status/sync').then((x) => x.data);

export const load: PageLoad = async () => {
  const [topPlays, recentLevels, syncStatus] = await Promise.all([
    loadPlayLogs(),
    loadRecentLevels(),
    loadSyncStatus()
  ]);

  return {
    topPlays,
    recentLevels,
    syncStatus
  };
};
