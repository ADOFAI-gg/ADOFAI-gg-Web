<script lang="ts">
  import MainSectionTitle from '@/components/atoms/MainSectionTitle.svelte';
  import type { Level } from '@/types';
  import LevelListItem from '../../organisms/levels/LevelListItem.svelte';

  export let levels: Level[];
</script>

<MainSectionTitle title="HOME_RECENT_LEVELS" moreLink="/levels" />

{#each levels as level}
  <LevelListItem {level} />
{/each}
