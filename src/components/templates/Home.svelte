<script context="module" lang="ts">
  import type { Level, SyncStatusResponse, PlayLogWithLevel } from '@/types';

  export type Data = {
    topPlays: PlayLogWithLevel[];
    recentLevels: Level[];
    syncStatus: SyncStatusResponse;
  };
</script>

<script lang="ts">
  import HomeHero from '@organisms/home/HomeHero.svelte';
  import RecentLevelsSection from '@organisms/home/RecentLevelsSection.svelte';
  import TopPlaysSection from '@organisms/home/TopPlaysSection.svelte';

  export let data: Data;
</script>

<HomeHero syncStatus={data.syncStatus} />

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
