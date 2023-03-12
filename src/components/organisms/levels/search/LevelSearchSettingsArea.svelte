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
  import { defaultSearchSettings, searchSettingStore } from '@/stores/search';
  import { tick } from 'svelte';
  import { reduceMotion } from '@/utils/settings';

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
    searchSettingStore.set(defaultSearchSettings);
    $currentTab = null;
    $currentView = 'list';
  };
</script>

<div>
  <div class="tabs">
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

      <div class="tabs__last">
        <Button type="search" on:click={reset}>
          <Icon icon="refresh" size={11} alt="Reset icon" />
          <span class="tabs__reset-text">
            <Translation key="SEARCH_SETTINGS_RESET" />
          </span>
        </Button>

        {#if $currentTab === 'tags'}
          <div transition:fade={{ duration: $reduceMotion ? 0 : 400 }} class="help-area">
            <SearchHelpArea key="SEARCH_TAB_TAGS_HELP" />
          </div>
        {/if}
      </div>
    </SearchTabs>

    <SearchTabs value={currentView} label="SEARCH_VIEW_LABEL">
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
      <div transition:fade={{ duration: $reduceMotion ? 0 : 400 }} bind:this={tagSearchTab}>
        <TagSearchTab />
      </div>
    {:else if $currentTab === 'meta'}
      <div transition:fade={{ duration: $reduceMotion ? 0 : 400 }} bind:this={filterTab}>
        <LevelSearchMetaTab />
      </div>
    {:else if $currentTab === 'sort'}
      <div transition:fade={{ duration: $reduceMotion ? 0 : 400 }} bind:this={sortTab}>
        <LevelSearchSortTab />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .tabs {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__last {
      display: flex;
      flex-grow: 1;
      flex-direction: row-reverse;
      gap: 12px;

      > .help-area {
        flex-grow: 1;
        font-size: 14px;
      }

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    &__reset-text {
      display: none;
      font-size: 14px;

      @media (min-width: 768px) {
        display: block;
      }
    }

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .settings-container {
    position: relative;
    overflow: hidden;
    margin-top: 16px;
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;

    &.settings-open {
      margin-bottom: 16px;
    }

    > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: fit-content;
    }
  }
</style>
