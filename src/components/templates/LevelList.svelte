<script lang="ts">
  import { parsedQuery, searchSettingStore } from '@/stores/search';

  import SearchInput from '@molecules/search/SearchInput.svelte';
  import LevelSearchSettingsArea, {
    currentView
  } from '@organisms/levels/search/LevelSearchSettingsArea.svelte';
  import type { Level, ListResponse } from '@/types';
  import { browser } from '$app/environment';
  import { writable, type Writable } from 'svelte/store';
  import LevelListItem from '@organisms/levels/list/LevelListItem.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { createInfiniteQuery, getQueryClientContext } from '@tanstack/svelte-query';
  import VirtualList from '../utils/VirtualList.svelte';
  import LoadingSpinner from '../atoms/common/LoadingSpinner.svelte';
  import LevelTableView from '../organisms/levels/list/LevelTableView.svelte';
  import { clientApi } from '$lib/api';

  let randomSeed: Writable<number | null> = writable(null);

  let mounted = false;

  const pageSize = 30;

  let query = createInfiniteQuery({
    queryKey: ['levels'],
    queryFn: ({ pageParam, signal }) => fetchPage(pageParam, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === pageSize ? pages.length + 1 : null;
    }
  });

  const queryClient = getQueryClientContext();

  // $: addItems = async (start = 0) => {
  //   if (loading) return;
  //   loading = true;
  //   const { data } = await api.get<ListResponse<Level>>(
  //     '/api/v1/levels?' + new URLSearchParams(params(start) as Record<string, string>).toString()
  //   );
  //   if (start === 0) items.set(data.results);
  //   else items.update((x) => [...x, ...data.results]);
  //   itemCount = data.count;
  //   loading = false;
  // };

  const fetchPage = async (page: number, signal: AbortSignal) => {
    const { data } = await clientApi.get<ListResponse<Level>>('/api/v1/levels', {
      params: params(page * pageSize),
      signal
    });

    return data.results;
  };

  const params = (start: number) => {
    const settings = $searchSettingStore;

    const analyzed = $parsedQuery;

    const result: Record<string, string | number | null> = {
      queryTitle: analyzed.song.trim(),
      queryArtist: analyzed.artist.trim(),
      queryCreator: analyzed.creator.trim(),
      query: analyzed.normal.trim(),

      offset: start,
      amount: pageSize,

      includeTags: settings.filter.tags.include.join(','),
      excludeTags: settings.filter.tags.exclude.join(',')
    };

    if (typeof analyzed.minBpm === 'number') result.minBpm = analyzed.minBpm;
    if (typeof analyzed.maxBpm === 'number') result.maxBpm = analyzed.maxBpm;

    if (typeof analyzed.minDifficulty === 'number') result.minDifficulty = analyzed.minDifficulty;
    if (typeof analyzed.maxDifficulty === 'number') result.maxDifficulty = analyzed.maxDifficulty;

    if (typeof analyzed.minTiles === 'number') result.minTiles = analyzed.minTiles;
    if (typeof analyzed.maxTiles === 'number') result.maxTiles = analyzed.maxTiles;

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

    queryClient.resetQueries({
      queryKey: ['levels']
    });
  };

  let timeout: number | null = null;

  const unsubscribeSettings = searchSettingStore.subscribe(() => {
    if (!mounted) return;
    if (browser) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        reset();
      }, 100) as unknown as number;
    }
  });

  onDestroy(() => {
    unsubscribeSettings();
  });

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

<div class="level-list-container" class:level-list-container-table-view={$currentView === 'table'}>
  <div class={$currentView === 'list' ? 'list-view-search-area' : 'table-view-search-area'}>
    <div class={$currentView === 'list' ? 'list-view-search-area-content' : ''}>
      <SearchInput bind:value={$searchSettingStore.query} />
      <div class="search-settings-area">
        <LevelSearchSettingsArea />
      </div>
    </div>
  </div>

  {#if $query.isLoading}
    <div class="loading-container">
      <LoadingSpinner />
    </div>
  {:else if $currentView === 'list'}
    <PageContainer>
      <VirtualList estimateSize={110} {query}>
        <LevelListItem slot="item" let:item level={item} />
      </VirtualList>
      <!-- <VirtualList
        on:more={(e) => addItems(e.detail.offset)}
        total={itemCount}
        data={$items}
        let:item
      >
        <div>
          <LevelListItem level={item} />
        </div>
        <div slot="loading" class="list-loader">
          <LoadingSpinner size={48} />
        </div>
      </VirtualList> -->
    </PageContainer>
  {:else if $currentView === 'table'}
    <div class="table-view-container">
      <LevelTableView {query} />
    </div>
  {/if}
</div>

<style lang="scss">
  .level-list-container {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }

  .level-list-container-table-view {
    width: fit-content;
    min-width: 100vw;
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

  .table-view-search-area {
    position: sticky;
    left: 120px;
    z-index: 10;
    width: calc(100vw - 240px);

    @media screen and (width <= 768px) {
      left: 24px;
      width: calc(100vw - 48px);
    }
  }

  .table-view-container {
    padding-right: 120px;
    padding-left: 120px;

    @media screen and (width <= 768px) {
      padding-right: 24px;
      padding-left: 24px;
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }
</style>
