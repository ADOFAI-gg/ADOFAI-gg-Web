<script lang="ts">
  import type { Level } from '@/types';
  import { api } from '@/api';
  import LevelHeader from '../organisms/levels/LevelHeader.svelte';

  export let level: Level;
</script>

<svelte:head>
  <title>{level.artists.join(' & ')} - {level.title}</title>
</svelte:head>

<LevelHeader {level} />

<div class="px-8">
  <div class="mx-auto max-w-[1300px]">
    <pre>{JSON.stringify(level, null, 2)}</pre>
  </div>
</div>
