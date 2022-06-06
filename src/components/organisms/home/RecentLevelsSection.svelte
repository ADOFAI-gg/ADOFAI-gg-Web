<script lang="ts">
  import MainSectionTitle from '@/components/atoms/MainSectionTitle.svelte';
  import type { Level } from '@/types';

  export let levels: Level[];
</script>

<MainSectionTitle title="HOME_RECENT_LEVELS" moreLink="/levels" />

<!-- <pre>{JSON.stringify(levels, null, 2)}</pre> -->
