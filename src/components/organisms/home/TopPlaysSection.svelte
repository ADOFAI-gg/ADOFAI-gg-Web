<script lang="ts">
  import MainSectionTitle from '@atoms/common/MainSectionTitle.svelte';
  import TopPlay from '@molecules/home/TopPlay.svelte';
  import TopPlaySkeleton from '@molecules/home/TopPlaySkeleton.svelte';
  import type { PlayLog } from '@/types';

  export let plays: PlayLog[] = [];
</script>

<MainSectionTitle title="HOME_TOP_PLAYS" moreLink="/rankings" />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-[50px]">
  {#if plays.length}
    {#each plays.slice(0, 3) as play (play.id)}
      <TopPlay {play} />
    {/each}
  {:else}
    {#each Array(3) as _}
      <TopPlaySkeleton />
    {/each}
  {/if}
</div>
