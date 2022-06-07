<script lang="ts">
  import { searchSetingStore } from '@/stores/search';

  import SearchInput from '../molecules/SearchInput.svelte';
  import LevelSearchSettingsArea from '../organisms/levels/LevelSearchSettingsArea.svelte';

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
</script>

<div>
  <SearchInput placeholder="SEARCH_INPUT_PLACEHOLDER_LEVELS" bind:value={query} />
  <div class="mt-2 px-[12px]">
    <LevelSearchSettingsArea />
  </div>
</div>
