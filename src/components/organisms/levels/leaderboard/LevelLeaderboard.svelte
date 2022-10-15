<script lang="ts">
  import { browser } from '$app/environment';
  import { api } from '@/api';

  import LoadingSpinner from '@atoms/common/LoadingSpinner.svelte';
  import SectionTitle from '@atoms/common/MainSectionTitle.svelte';
  import type { ListResponse, PlayLog } from '@/types';
  import LevelLeaderboardItem from '@organisms/levels/leaderboard/LevelLeaderboardItem.svelte';

  export let levelId: number;

  $: promise = browser
    ? api
        .get<ListResponse<PlayLog>>('/api/v1/playLogs', {
          params: {
            levelId,
            offset: 0,
            amount: 10,
            sort: 'PP_DESC'
          }
        })
        .then((x) => x.data.results)
    : null;
</script>

{#if promise}
  {#await promise}
    <div class="flex justify-center">
      <LoadingSpinner />
    </div>
  {:then data}
    {#if data.length}
      <div>
        <SectionTitle title="Leaderboard" />
        <div class="mt-[11px] flex flex-col gap-[10px]">
          {#each Object.entries(data) as [index, item]}
            <LevelLeaderboardItem index={Number(index)} play={item} />
          {/each}
        </div>
      </div>
    {/if}
  {/await}
{/if}
