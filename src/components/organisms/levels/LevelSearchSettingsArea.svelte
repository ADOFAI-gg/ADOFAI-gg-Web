<script lang="ts">
  import Button from '@/components/atoms/Button.svelte';
  import Icon from '@/components/atoms/Icon.svelte';
  import SearchTabItem from '@/components/atoms/SearchTabItem.svelte';
  import SearchTabs from '@/components/molecules/SearchTabs.svelte';
  import { writable } from 'svelte/store';
  import TagSearchTab from './TagSearchTab.svelte';
  import { fade } from 'svelte/transition';

  type TabType = 'tags' | 'meta' | 'sort' | null;

  type ViewType = 'list' | 'table';

  const currentTab = writable<TabType>('tags');
  const currentView = writable<ViewType>('list');
</script>

<div>
  <div class="flex flex-col md:flex-row gap-1">
    <SearchTabs value={currentTab} deselectable>
      <SearchTabItem value="tags" icon="tag">Tags</SearchTabItem>
      <SearchTabItem value="meta" icon="filter">Meta</SearchTabItem>
      <SearchTabItem value="sort" icon="sort">Sort</SearchTabItem>
      <div class="flex-grow md:hidden" />
      <Button type="search">
        <Icon icon="refresh" size={11} />
        <span class="hidden md:block">Reset Search Setting</span>
      </Button>
    </SearchTabs>
    <div class="flex-grow" />
    <SearchTabs value={currentView} label="View">
      <SearchTabItem value="list" icon="list">List</SearchTabItem>
      <SearchTabItem value="table" icon="sheet">Table</SearchTabItem>
    </SearchTabs>
  </div>
  <div class="mt-[16px]">
    {#if $currentTab === 'tags'}
      <div transition:fade>
        <TagSearchTab />
      </div>
    {/if}
  </div>
</div>
