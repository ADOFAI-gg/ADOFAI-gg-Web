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
{:then data}
  <table class="w-full min-w-[1680px] table-fixed">
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
          <td>
            <DifficultyIcon difficulty={reference.difficulty} size={28} />
          </td>

          <td class="col-border font-mono tracking-[-.1em] font-light">
            {reference.ppRating}
          </td>

          {#each reference.levels as level}
            {#if level}
              <td class="col-border">
                <div class="flex items-center gap-[12px]">
                  {#if level.levelId}
                    <div class="font-mono tracking-[-.1em] font-light opacity-40">
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
              </td>
            {:else}
              <td class="col-border" />
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/await}

<style lang="scss">
  table {
    th {
      text-align: left;

      @apply font-regular text-white/60 text-md pb-[8px] whitespace-nowrap;
    }

    tbody {
      tr {
        @apply border-t border-white/20;

        height: 52px;

        vertical-align: middle;

        td {
          @apply py-2;
        }

        a {
          @apply transition-all;

          &:hover {
            @apply underline;
          }
        }

        td.col-border {
          @apply border-l border-white/20 px-[12px];
        }
      }
    }
  }
</style>
