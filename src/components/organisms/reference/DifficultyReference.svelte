<script lang="ts">
  import { browser } from '$app/environment';
  import LoadingSpinner from '@/components/atoms/LoadingSpinner.svelte';
  import type {
    DifficultyReference,
    DifficultyReferenceLevel,
    RawDifficultyReference,
    RawPPRatings
  } from '@/types';
  import { Asset } from '@/utils/assets';
  import DifficultyIcon from '../../atoms/DifficultyIcon.svelte';
  import Translation from '../../utils/Translation.svelte';

  const loadData = async (): Promise<DifficultyReference[]> => {
    if (!browser) return [];

    const levels = await Asset.loadJSON<RawDifficultyReference[]>('data/difficultyReferences.json');
    const ratings = await Asset.loadJSON<RawPPRatings[]>('data/ppRatings.json');

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

    return result;
  };

  const loadPromise = loadData();
</script>

{#await loadPromise}
  <div class="flex justify-center">
    <LoadingSpinner />
  </div>
{/await}
