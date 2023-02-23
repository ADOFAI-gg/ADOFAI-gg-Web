<script context="module" lang="ts">
  import type { PlayLog, Level } from '@/types';

  export type Data = {
    topPlays: PlayLog[];
    recentLevels: Level[];
  };
</script>

<script lang="ts">
  import HomeHero from '@organisms/home/HomeHero.svelte';
  import RecentLevelsSection from '@organisms/home/RecentLevelsSection.svelte';
  import TopPlaysSection from '@organisms/home/TopPlaysSection.svelte';

  export let data: Data;
</script>

<HomeHero />

<div class="top-plays-padder" />

<TopPlaysSection plays={data.topPlays} />

<div class="recent-levels-padder" />

<RecentLevelsSection levels={data.recentLevels} />

<style lang="scss">
  .top-plays-padder {
    height: 62px;
  }

  .recent-levels-padder {
    margin-top: 64px;
  }
</style>
