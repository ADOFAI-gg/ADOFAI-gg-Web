<script lang="ts">
  import LoadingSpinner from '@atoms/common/LoadingSpinner.svelte';
  import type { DifficultyReference, DifficultyReferenceLevel } from '@/types';
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Table from '@atoms/table/Table.svelte';
  import { default as Cell } from '@atoms/table/TableCell.svelte';
  import levels from '@/assets/data/difficultyReferences.json';
  import ratings from '@/assets/data/ppRatings.json';

  const loadData = (): DifficultyReference[] => {
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

  const data = loadData();
</script>

<div class="reference-table">
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

          <Cell class="reference-table__pp-rating-cell" border>
            {reference.ppRating}
          </Cell>

          {#each reference.levels as level}
            {#if level}
              <Cell leftSideBorder>
                <div class="reference-table__level-cell-content">
                  {#if level.levelId}
                    <div class="reference-table__level-id-text">
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
</div>

<style lang="scss">
  .reference-table {
    :global(.reference-table) {
      width: 100%;
      min-width: 1680px;
      table-layout: fixed;
    }

    :global(.reference-table__pp-rating-cell) {
      font-weight: 300;
      font-family: 'Roboto Mono', monospace;
      letter-spacing: -0.1em;
    }

    :global(.reference-table__level-cell-content) {
      display: flex;
      gap: 12px;
      align-items: center;

      :global(.reference-table__level-id-text) {
        font-weight: 300;
        font-family: 'Roboto Mono', monospace;
        letter-spacing: -0.1em;
        opacity: 0.4;
      }
    }
  }
</style>
