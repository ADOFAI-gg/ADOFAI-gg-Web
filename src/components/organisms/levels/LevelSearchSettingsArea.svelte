<script lang="ts">
  import Button from '@/components/atoms/Button.svelte';
  import Icon from '@/components/atoms/Icon.svelte';
  import SearchTabItem from '@/components/atoms/SearchTabItem.svelte';
  import SearchTabs from '@/components/molecules/SearchTabs.svelte';
  import { writable } from 'svelte/store';
  import TagSearchTab from './TagSearchTab.svelte';
  import { fade } from 'svelte/transition';
  import LevelSearchSortTab from './LevelSearchSortTab.svelte';
  import { browser } from '$app/env';
  import Translation from '@/components/utils/Translation.svelte';
  import SearchHelpArea from '@/components/molecules/levels/SearchHelpArea.svelte';

  type TabType = 'tags' | 'meta' | 'sort' | null;

  type ViewType = 'list' | 'table';

  const currentTab = writable<TabType>('tags');
  const currentView = writable<ViewType>('list');

  let height = 0;

  let tagTab: number;

  let sortTab: number;

  $: {
    if (browser) {
      if ($currentTab === 'tags' && tagTab) {
        height = tagTab;
      } else if ($currentTab === 'sort' && sortTab) {
        height = sortTab;
      } else {
        height = 0;
      }
    }
  }
</script>

<div>
  <div class="flex flex-col md:flex-row gap-1">
    <SearchTabs class="flex-grow" value={currentTab} deselectable>
      <SearchTabItem value="tags" icon="tag">
        <Translation key="SEARCH_TAB_TAGS" />
      </SearchTabItem>
      <SearchTabItem value="meta" icon="filter">
        <Translation key="SEARCH_TAB_META" />
      </SearchTabItem>
      <SearchTabItem value="sort" icon="sort">
        <Translation key="SEARCH_TAB_SORT" />
      </SearchTabItem>
      <div class="flex gap-[12px] flex-row-reverse md:flex-row flex-grow">
        <Button type="search">
          <Icon icon="refresh" size={11} />
          <span class="hidden md:block">
            <Translation key="SEARCH_SETTINGS_RESET" />
          </span>
        </Button>
        {#if $currentTab === 'tags'}
          <div class="flex-grow">
            <SearchHelpArea key="SEARCH_TAB_TAGS_HELP" />
          </div>
        {/if}
      </div>
    </SearchTabs>
    <SearchTabs value={currentView} label="View">
      <SearchTabItem value="list" icon="list">
        <Translation key="SEARCH_VIEW_LIST" />
      </SearchTabItem>
      <SearchTabItem value="table" icon="sheet">
        <Translation key="SEARCH_VIEW_TABLE" />
      </SearchTabItem>
    </SearchTabs>
  </div>
  <div class="mt-[16px] transition-all relative overflow-hidden" style="height: {height}px;">
    {#if $currentTab === 'tags'}
      <div transition:fade bind:clientHeight={tagTab} class="absolute w-full h-fit top-0 left-0">
        <TagSearchTab />
      </div>
    {:else if $currentTab === 'sort'}
      <div transition:fade bind:clientHeight={sortTab}>
        <LevelSearchSortTab />
      </div>
    {/if}
  </div>
</div>
