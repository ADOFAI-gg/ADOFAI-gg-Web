<script lang="ts">
  import MainSectionTitle from '@/components/atoms/MainSectionTitle.svelte';
  import TopPlay from '@/components/molecules/home/TopPlay.svelte';
  import TopPlaySkeleton from '@/components/molecules/home/TopPlaySkeleton.svelte';
  import type { PlayLog } from '@/types';

  export let plays: PlayLog[] = [];
</script>

<MainSectionTitle title="Top Plays" moreLink="/ranking" />

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
