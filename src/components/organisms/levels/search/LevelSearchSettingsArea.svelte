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
  <div class="tabs-container">
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

      <div class="tabs-last">
        <Button type="search" on:click={reset}>
          <Icon icon="refresh" size={11} alt="Reset icon" />
          <span class="reset-text">
            <Translation key="SEARCH_SETTINGS_RESET" />
          </span>
        </Button>

        {#if $currentTab === 'tags'}
          <div transition:fade={{ duration: 200 }} class="help-area">
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
  <div class="settings-container" class:settings-open={!!$currentTab} style="height: {height}px;">
    {#if $currentTab === 'tags'}
      <div transition:fade bind:this={tagSearchTab}>
        <TagSearchTab />
      </div>
    {:else if $currentTab === 'meta'}
      <div transition:fade bind:this={filterTab}>
        <LevelSearchMetaTab />
      </div>
    {:else if $currentTab === 'sort'}
      <div transition:fade bind:this={sortTab}>
        <LevelSearchSortTab />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .tabs-container {
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    .tabs-last {
      display: flex;
      gap: 12px;
      flex-direction: row-reverse;
      flex-grow: 1;

      @media (min-width: 768px) {
        flex-direction: row;
      }

      > .help-area {
        flex-grow: 1;
        font-size: 14px;
      }

      .reset-text {
        display: none;
        font-size: 14px;

        @media (min-width: 768px) {
          display: block;
        }
      }
    }
  }

  .settings-container {
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
    position: relative;
    overflow: hidden;
    margin-top: 16px;

    &.settings-open {
      margin-bottom: 16px;
    }

    > div {
      position: absolute;
      width: 100%;
      height: fit-content;
      top: 0;
      left: 0;
    }
  }
</style>
