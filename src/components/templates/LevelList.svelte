<script lang="ts">
  import { searchSetingStore } from '@/stores/search';

  import SearchInput from '../molecules/SearchInput.svelte';
  import LevelSearchSettingsArea, {
    currentView
  } from '../organisms/levels/LevelSearchSettingsArea.svelte';
  import type { Level } from '@/types';
  import PageContainer from '../atoms/PageContainer.svelte';

  let query: string = $searchSetingStore.query.title;

  $: {
    searchSetingStore.update((x) => ({
      ...x,
      query: {
        ...x.query,
        title: query
      }
    }));
  }

  let data: Level[] = [];

  let height = 0;
</script>

<svelte:window bind:innerHeight={height} />

<PageContainer>
  <div class="h-nav mt-[24px]" />
  <SearchInput placeholder="SEARCH_INPUT_PLACEHOLDER_LEVELS" bind:value={query} />
  <div class="mt-2">
    <LevelSearchSettingsArea />
  </div>
</PageContainer>
