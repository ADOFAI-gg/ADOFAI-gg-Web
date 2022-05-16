<script context="module" lang="ts">
  import type { PlayLog, Level } from '@/types';

  export type Data = {
    topPlays: PlayLog[];
    recentLevels: Level[];
  };
</script>

<script lang="ts">
  import HomeHero from '../organisms/home/HomeHero.svelte';
  import RecentLevelsSection from '../organisms/home/RecentLevelsSection.svelte';
  import TopPlaysSection from '../organisms/home/TopPlaysSection.svelte';

  export let data: Data;
</script>

<HomeHero />

<div class="h-[62px]" />

<TopPlaysSection plays={data.topPlays} />

<div class="mt-[64px]" />

<RecentLevelsSection levels={data.recentLevels} />
