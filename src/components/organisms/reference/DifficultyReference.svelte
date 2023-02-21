<script lang="ts">
  import { browser } from '$app/environment';
  import LoadingSpinner from '@atoms/common/LoadingSpinner.svelte';
  import type {
    DifficultyReference,
    DifficultyReferenceLevel,
    RawDifficultyReference,
    RawPPRatings
  } from '@/types';
  import { Asset } from '@/utils/assets';
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Table from '@atoms/table/Table.svelte';
  import { default as Cell } from '@atoms/table/TableCell.svelte';

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

<div class="reference-table-root">
  {#await loadPromise}
    <div class="loading-container">
      <LoadingSpinner />
    </div>
  {:then data}
    <Table class="reference-table">
      <colgroup>
        <col width="40" />
        <col width="100" />
      </colgroup>

      <thead>
        <tr>
          <th>
            <Translation key="REFERENCE_DIFFICULTY" />
          </th>
          <th>
            <Translation key="REFERENCE_PP_RATING" />
          </th>
          <th>
            <Translation key="REFERENCE_STANDARD_LEVEL_FIRST" />
          </th>
          <th>
            <Translation key="REFERENCE_STANDARD_LEVEL_SECOND" />
          </th>
          <th>
            <Translation key="REFERENCE_STANDARD_LEVEL_THIRD" />
          </th>
          <th>
            <Translation key="REFERENCE_EASIEST_LEVEL" />
          </th>
        </tr>
      </thead>

      <tbody>
        {#each data as reference}
          <tr>
            <Cell>
              <DifficultyIcon difficulty={reference.difficulty} size={28} />
            </Cell>

            <Cell class="pp-rating-cell" border>
              {reference.ppRating}
            </Cell>

            {#each reference.levels as level}
              {#if level}
                <Cell leftSideBorder>
                  <div class="level-cell-content">
                    {#if level.levelId}
                      <div class="level-id-text">
                        #{level.levelId}
                      </div>
                    {/if}

                    <a
                      href={level.url ?? `/levels/${level.levelId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {level.name}
                    </a>
                  </div>
                </Cell>
              {:else}
                <Cell leftSideBorder />
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </Table>
  {/await}
</div>

<style lang="scss">
  .reference-table-root {
    .loading-container {
      @apply flex justify-center;
    }

    :global(.reference-table) {
      @apply w-full min-w-[1680px] table-fixed;

      :global(.pp-rating-cell) {
        @apply font-mono tracking-[-.1em] font-light;
      }

      :global(.level-cell-content) {
        @apply flex items-center gap-[12px];

        :global(.level-id-text) {
          @apply font-mono tracking-[-.1em] font-light opacity-40;
        }
      }
    }
  }
</style>
