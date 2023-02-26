<script lang="ts">
  import { searchSetingStore } from '@/stores/search';

  import SearchInput from '@molecules/search/SearchInput.svelte';
  import LevelSearchSettingsArea, {
    currentView
  } from '@organisms/levels/search/LevelSearchSettingsArea.svelte';
  import VirtualScroll from '@adofai-gg/svelte-virtualized-infinite-scroll';
  import type { Level, ListResponse } from '@/types';
  import { browser } from '$app/environment';
  import { writable, type Writable } from 'svelte/store';
  import { api } from '@/api';
  import LevelListItem from '@organisms/levels/list/LevelListItem.svelte';
  import LoadingSpinner from '@atoms/common/LoadingSpinner.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import LevelTableView from '@organisms/levels/list/LevelTableView.svelte';
  import { onDestroy, onMount } from 'svelte';

  let items: Writable<Level[]> = writable([]);

  let itemCount = 0;

  let loading = false;

  let randomSeed: Writable<number | null> = writable(null);

  $: addItems = async (start = 0) => {
    if (loading) return;
    loading = true;
    const { data } = await api.get<ListResponse<Level>>(
      '/api/v1/levels?' + new URLSearchParams(params(start) as Record<string, string>).toString()
    );
    if (start === 0) items.set(data.results);
    else items.update((x) => [...x, ...data.results]);
    itemCount = data.count;
    loading = false;
  };

  const params = (start: number) => {
    const settings = $searchSetingStore;

    const result: Record<string, string | number | null> = {
      queryTitle: settings.query.full ? null : settings.query.title || null,
      queryArtist: settings.query.artist || null,
      queryCreator: settings.query.creator || null,
      query: settings.query.full ? settings.query.title || null : null,

      offset: start,
      amount: '25',

      includeTags: settings.filter.tags.include.join(','),
      excludeTags: settings.filter.tags.exclude.join(',')
    };

    if (settings.filter.bpm.min !== null && settings.filter.bpm.min >= 0)
      result.minBpm = settings.filter.bpm.min;
    if (settings.filter.bpm.max !== null && settings.filter.bpm.max >= 0)
      result.maxBpm = settings.filter.bpm.max;

    if (settings.filter.difficulty.min !== null)
      result.minDifficulty = settings.filter.difficulty.min;
    if (settings.filter.difficulty.max !== null)
      result.maxDifficulty = settings.filter.difficulty.max;

    if (settings.filter.tiles.min !== null && settings.filter.tiles.min >= 0)
      result.minTiles = settings.filter.tiles.min;
    if (settings.filter.tiles.max !== null && settings.filter.tiles.max >= 0)
      result.maxTiles = settings.filter.tiles.max;

    if (settings.sort.order !== 'shuffle') {
      let res: string;

      switch (settings.sort.type) {
        case 'created':
          res = 'RECENT';
          break;
        case 'difficulty':
          res = 'DIFFICULTY';
          break;
        case 'likes':
          res = 'LIKE';
          break;
      }

      res += '_';

      switch (settings.sort.order) {
        case 'asc':
          //youtu.be/2j41-QOAwBI
          res += 'ASC';
          break;
        case 'desc':
          res += 'DESC';
          break;
      }

      result.sort = res;
    } else if (settings.sort.order === 'shuffle') {
      result.sort = 'RANDOM';

      if (!$randomSeed) {
        $randomSeed = Math.floor(Math.random() * 100000);
      }

      result.randomSeed = $randomSeed;
    }

    if (settings.filter.musicLength) {
      switch (settings.filter.musicLength) {
        case 'long':
          result.includeTags = [...settings.filter.tags.include, '11'].join(',');
          break;
        case 'medium':
          result.excludeTags = [...settings.filter.tags.exclude, '11'].join(',');
          if (result.minDifficulty === 0.1 || !result.minDifficulty) {
            result.minDifficulty = 1;
          }
          break;
        case 'short':
          result.minDifficulty = 0.1;
          result.maxDifficulty = 0.1;
          break;
      }
    }

    return Object.fromEntries(Object.entries(result).filter(([, v]) => v !== null));
  };

  $: reset = async () => {
    $randomSeed = null;
    await addItems(0);
  };

  let timeout: number | null = null;

  searchSetingStore.subscribe(() => {
    if (browser) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        reset();
      }, 100) as unknown as number;
    }
  });

  let mounted = false;

  $: {
    if (browser && mounted) {
      localStorage.setItem('viewMode', $currentView);
    }
  }

  onMount(() => {
    if (localStorage.viewMode && ['table', 'list'].includes(localStorage.viewMode)) {
      currentView.set(localStorage.viewMode);
    }

    mounted = true;
  });

  onDestroy(() => {
    mounted = false;
  });
</script>

{#if browser}
  <div
    class="level-list-container"
    class:level-list-container-table-view={$currentView === 'table'}
  >
    <div class="top-spacer" />

    <div class={$currentView === 'list' ? 'list-view-search-area' : 'table-view-search-area'}>
      <div class={$currentView === 'list' ? 'list-view-search-area-content' : ''}>
        <SearchInput
          placeholder={$searchSetingStore.query.full
            ? 'SEARCH_INPUT_PLACEHOLDER_HOME'
            : 'SEARCH_INPUT_PLACEHOLDER_LEVELS'}
          bind:value={$searchSetingStore.query.title}
        />
        <div class="search-settings-area">
          <LevelSearchSettingsArea />
        </div>
      </div>
    </div>

    {#if $currentView === 'list'}
      <PageContainer>
        <VirtualScroll
          scrollContainer="#root"
          total={itemCount}
          on:more={(e) => addItems(e.detail.offset)}
          data={$items}
          let:item
        >
          <div>
            <LevelListItem level={item} />
          </div>
          <div slot="loading" class="list-loader">
            <LoadingSpinner size={48} />
          </div>
        </VirtualScroll>
      </PageContainer>
    {:else if $currentView === 'table'}
      <div class="table-view-container">
        <LevelTableView
          levels={$items}
          total={itemCount}
          on:more={(e) => addItems(e.detail.offset)}
        />
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .level-list-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .level-list-container-table-view {
    width: fit-content;
    min-width: 100vw;
  }

  .top-spacer {
    height: var(--nav-height);
    margin-top: 24px;
  }

  .list-view-search-area {
    padding: 0 16px;

    &-content {
      max-width: 1100px;
      margin: 0 auto;
    }
  }

  .search-settings-area {
    margin-top: 8px;
    padding: 0 12px;
  }

  .list-loader {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 16px;
  }

  .table-view-search-area {
    position: sticky;
    left: 120px;
    width: calc(100vw - 240px);

    @media screen and (max-width: 768px) {
      left: 24px;
      width: calc(100vw - 48px);
    }
  }

  .table-view-container {
    padding-right: 120px;
    padding-left: 120px;

    @media screen and (max-width: 768px) {
      padding-right: 24px;
      padding-left: 24px;
    }
  }
</style>
