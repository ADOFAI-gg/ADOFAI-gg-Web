import type { Ranking } from '@/types';
import type { Load } from '@sveltejs/kit';

export type RankingResult = Ranking & { rank: number };

export const load: Load = async () => {
  return {
    meta: {
      title: 'Ranking - ADOFAI.gg'
    }
  };
};
