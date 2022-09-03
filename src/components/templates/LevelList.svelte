<script lang="ts">
  import { searchSetingStore } from '@/stores/search';

  import SearchInput from '../molecules/SearchInput.svelte';
  import LevelSearchSettingsArea, {
    currentView
  } from '../organisms/levels/LevelSearchSettingsArea.svelte';
  import VirtualScroll from '@adofai-gg/svelte-virtualized-infinite-scroll';
  import type { Level, ListResponse } from '@/types';
  import { browser } from '$app/env';
  import { writable, type Writable } from 'svelte/store';
  import { api } from '@/api';
  import LevelListItem from '../organisms/levels/LevelListItem.svelte';
  import { fade } from 'svelte/transition';
  import LoadingSpinner from '../atoms/LoadingSpinner.svelte';
  import PageContainer from '../atoms/PageContainer.svelte';
  import LevelTableView from '../organisms/levels/LevelTableView.svelte';
  import { onDestroy, onMount } from 'svelte';

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
      queryTitle: settings.query.title,
      queryArtist: settings.query.artist,
      queryCreator: settings.query.creator,

      offset: start,
      amount: '25',

      includeTags: settings.filter.tags.include.join(','),
      excludeTags: settings.filter.tags.exclude.join(',')
    };

    if (settings.filter.bpm.min !== null) result.minBpm = settings.filter.bpm.min;
    if (settings.filter.bpm.max !== null) result.maxBpm = settings.filter.bpm.max;

    if (settings.filter.difficulty.min !== null)
      result.minDifficulty = settings.filter.difficulty.min;
    if (settings.filter.difficulty.max !== null)
      result.maxDifficulty = settings.filter.difficulty.max;

    if (settings.filter.tiles.min !== null) result.minTiles = settings.filter.tiles.min;
    if (settings.filter.tiles.max !== null) result.maxTiles = settings.filter.tiles.max;

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

    return result;
  };

  $: reset = async () => {
    $randomSeed = null;
    await addItems(0);
  };

  let lastSettings = $searchSetingStore;

  let timeout: number | null = null;

  $: {
    if (browser && lastSettings !== $searchSetingStore) {
      if (timeout) {
        clearTimeout(timeout);
      }
      lastSettings = $searchSetingStore;
      timeout = setTimeout(() => {
        reset();
      }, 100) as unknown as number;
    }
  }

  let mounted = false;

  $: {
    if (browser && mounted) {
      localStorage.setItem('viewMode', $currentView);
    }
  }

  onMount(() => {
    if (localStorage.viewMode && ['table', 'list'].includes(localStorage.viewMode)) {
      console.log(localStorage.viewMode);
      currentView.set(localStorage.viewMode);
    }

    mounted = true;
  });

  onDestroy(() => {
    mounted = false;
  });
</script>

<div class="flex flex-col min-h-screen">
  <div class="h-nav mt-[24px]" />

  <div class={$currentView === 'list' ? 'px-4' : 'table-view-search-area'}>
    <div class={$currentView === 'list' ? 'max-w-[1100px] mx-auto' : ''}>
      <SearchInput placeholder="SEARCH_INPUT_PLACEHOLDER_LEVELS" bind:value={query} />
      <div class="mt-2 px-[12px]">
        <LevelSearchSettingsArea />
      </div>
    </div>
  </div>

  {#if $currentView === 'list'}
    <PageContainer>
      <VirtualScroll
        scrollContainer=".simplebar-content-wrapper"
        total={itemCount}
        on:more={(e) => addItems(e.detail.offset)}
        data={$items}
        let:item
      >
        <div in:fade>
          <LevelListItem level={item} />
        </div>
        <div slot="loading" class="w-full my-4 flex justify-center">
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

<style lang="scss">
  .table-view-search-area {
    width: calc(100vw - 240px);
    position: sticky;
    left: 120px;
    @media screen and (max-width: 768px) {
      width: calc(100vw - 48px);
      left: 24px;
    }
  }
  .table-view-container {
    padding-left: 120px;
    padding-right: 120px;
    @media screen and (max-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
</style>
