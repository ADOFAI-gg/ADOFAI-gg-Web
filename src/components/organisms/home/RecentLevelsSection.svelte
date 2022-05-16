<script lang="ts">
  import MainSectionTitle from '@/components/atoms/MainSectionTitle.svelte';
  import type { Level } from '@/types';

  export let levels: Level[];
</script>

<MainSectionTitle title="Recent Ranked Levels" moreLink="/levels" />
