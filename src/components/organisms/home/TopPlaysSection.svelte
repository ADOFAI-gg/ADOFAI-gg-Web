<script lang="ts">
  import MainSectionTitle from '@/components/atoms/MainSectionTitle.svelte';
  import TopPlaySkeleton from '@/components/molecules/home/TopPlaySkeleton.svelte';
  import type { PlayLog } from '@/types';

  export let plays: PlayLog[] = [];
</script>

<MainSectionTitle title="Top Plays" moreLink="/ranking" />

<div class="grid grid-cols-3 w-full gap-[50px] mt-[32px]">
  {#if plays.length}
    hello
  {:else}
    {#each Array(3) as _}
      <TopPlaySkeleton />
    {/each}
  {/if}
</div>
