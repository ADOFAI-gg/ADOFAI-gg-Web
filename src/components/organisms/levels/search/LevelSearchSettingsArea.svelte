<script lang="ts" context="module">
  type TabType = 'tags' | 'meta' | 'sort' | null;

  type ViewType = 'list' | 'table';

  const currentTab = writable<TabType>(null);
  export const currentView = writable<ViewType>('list');
</script>

<script lang="ts">
  import Button from '@atoms/interaction/Button.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import SearchTabItem from '@atoms/search/SearchTabItem.svelte';
  import SearchTabs from '@molecules/search/SearchTabs.svelte';
  import { writable } from 'svelte/store';
  import TagSearchTab from '@organisms/levels/search/TagSearchTab.svelte';
  import { fade } from 'svelte/transition';
  import LevelSearchSortTab from './LevelSearchSortTab.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import SearchHelpArea from '@molecules/levels/SearchHelpArea.svelte';
  import LevelSearchMetaTab from '@organisms/levels/search/LevelSearchMetaTab.svelte';
  import { defaultSearchSettings, searchSetingStore } from '@/stores/search';
  import { tick } from 'svelte';

  let height = 0;

  let tagSearchTab: HTMLDivElement;
  let filterTab: HTMLDivElement;
  let sortTab: HTMLDivElement;

  $: {
    if ($currentTab === null) {
      height = 0;
    } else {
      let el: HTMLDivElement | null = null;

      switch ($currentTab) {
        case 'meta':
          el = filterTab;
          break;
        case 'sort':
          el = sortTab;
          break;
        case 'tags':
          el = tagSearchTab;
          break;
      }

      tick().then(() => {
        if (!el) return;
        height = el.clientHeight;
      });
    }
  }

  const reset = () => {
    searchSetingStore.set(defaultSearchSettings);
    $currentTab = null;
    $currentView = 'list';
  };
</script>

<div>
  <div class="flex flex-col md:flex-row gap-1">
    <SearchTabs style="flex-grow: 1;" value={currentTab} deselectable>
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
        <Button type="search" on:click={reset}>
          <Icon icon="refresh" size={11} alt="Reset icon" />
          <span class="hidden md:block text-md">
            <Translation key="SEARCH_SETTINGS_RESET" />
          </span>
        </Button>

        {#if $currentTab === 'tags'}
          <!-- ↓ 얘한테 align-items: center;를 넣어야 정상적으로 보여요 -->
          <div transition:fade={{ duration: 200 }} class="flex-grow text-md ">
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
  <div
    class="transition-all relative overflow-hidden mt-[16px] {$currentTab ? 'mb-[16px]' : ''}"
    style="height: {height}px;"
  >
    {#if $currentTab === 'tags'}
      <div transition:fade bind:this={tagSearchTab} class="absolute w-full h-fit top-0 left-0">
        <TagSearchTab />
      </div>
    {:else if $currentTab === 'meta'}
      <div transition:fade bind:this={filterTab} class="absolute w-full h-fit top-0 left-0">
        <LevelSearchMetaTab />
      </div>
    {:else if $currentTab === 'sort'}
      <div transition:fade bind:this={sortTab}>
        <LevelSearchSortTab />
      </div>
    {/if}
  </div>
</div>
