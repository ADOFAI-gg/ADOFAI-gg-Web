import { api } from '@/api';
import type { Level, ListResponse, PlayLog, PlayLogWithLevel, SyncStatusResponse } from '@/types';

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
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
    topPlaysRaw.map(async (x) => ({
      ...x,
      level: {
        ...x.level,
        ...(await (await api.get<Level>(`/api/v1/levels/${x.level.id}`)).data)
      }
    }))
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

  const { data: syncStatus } = await api.get<SyncStatusResponse>('/api/v1/status/sync');

  return {
    topPlays,
    recentLevels,
    syncStatus
  };
};
