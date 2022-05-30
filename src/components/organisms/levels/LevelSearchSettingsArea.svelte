<script lang="ts">
  import SearchTabItem from '@/components/atoms/SearchTabItem.svelte';
  import SearchTabs from '@/components/molecules/SearchTabs.svelte';
  import { writable } from 'svelte/store';

  type TabType = 'tags' | 'meta' | 'sort';

  type ViewType = 'list' | 'table';

  const currentTab = writable<TabType>('tags');
  const currentView = writable<ViewType>('list');
</script>

<div class="flex">
  <SearchTabs value={currentTab}>
    <SearchTabItem value="tags" icon="tag">Tags</SearchTabItem>
    <SearchTabItem value="meta" icon="filter">Meta</SearchTabItem>
    <SearchTabItem value="sort" icon="sort">Sort</SearchTabItem>
  </SearchTabs>
  <div class="flex-grow" />
  <SearchTabs value={currentView}>
    <SearchTabItem value="list" icon="list">List</SearchTabItem>
    <SearchTabItem value="table" icon="sheet">Table</SearchTabItem>
  </SearchTabs>
</div>
