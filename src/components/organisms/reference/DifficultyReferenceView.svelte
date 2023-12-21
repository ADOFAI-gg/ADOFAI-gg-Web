<script lang="ts">
  import type { DifficultyReference } from '@/types';
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Table from '@atoms/table/Table.svelte';
  import { default as Cell } from '@atoms/table/TableCell.svelte';

  export let data: DifficultyReference[];
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
          <Translation key="references:reference-difficulty" />
        </th>
        <th>
          <Translation key="references:reference-pp-rating" />
        </th>
        <th>
          <Translation key="references:reference-standard-level-first" />
        </th>
        <th>
          <Translation key="references:reference-standard-level-second" />
        </th>
        <th>
          <Translation key="references:reference-standard-level-third" />
        </th>
        <th>
          <Translation key="references:reference-easiest-level" />
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
