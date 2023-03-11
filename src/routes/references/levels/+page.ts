import type { DifficultyReference, DifficultyReferenceLevel } from '@/types';
import { ReferenceTab } from '../+layout.svelte';
import type { PageLoad } from './$types';

import levels from '@/assets/data/difficultyReferences.json';
import ratings from '@/assets/data/ppRatings.json';

export const load: PageLoad = () => {
  const referenceMap = new Map<number, DifficultyReference>();

  for (const rating of ratings) {
    const { difficulty, rating: ppRating } = rating;

    const reference: DifficultyReference = {
      difficulty,
      ppRating,
      levels: [null, null, null, null]
    };
    referenceMap.set(difficulty, reference);
  }

  for (const referenceLevel of levels) {
    const { difficulty, easiestLevel, level, position } = referenceLevel;

    const reference = referenceMap.get(difficulty);

    if (!reference) continue;

    reference.levels[easiestLevel ? 3 : position] = {
      levelId: level.levelId,
      name: level.name,
      url: level.url
    } as DifficultyReferenceLevel;
  }

  const result: DifficultyReference[] = Array.from(referenceMap.values());

  return {
    tab: ReferenceTab.Reference,
    references: result
  };
};
