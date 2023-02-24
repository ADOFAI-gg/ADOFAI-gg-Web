<script lang="ts">
  import MainSectionTitle from '@atoms/common/MainSectionTitle.svelte';
  import TopPlay from '@molecules/home/TopPlay.svelte';
  import type { PlayLog } from '@/types';

  export let plays: PlayLog[] = [];
</script>

<MainSectionTitle title="HOME_TOP_PLAYS" moreLink="/rankings" />

<div class="top-play">
  {#each plays.slice(0, 3) as play (play.id)}
    <TopPlay {play} />
  {/each}
</div>

<style lang="scss">
  .top-play {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 50px;
    width: 100%;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
