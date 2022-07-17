<script lang="ts">
  import { searchSetingStore } from '@/stores/search';

  import SearchInput from '../molecules/SearchInput.svelte';
  import LevelSearchSettingsArea from '../organisms/levels/LevelSearchSettingsArea.svelte';
  import VirtualScroll from '@/external/svelte-virtual-scroll-list/VirtualScroll.svelte';
  import type { Level, ListResponse } from '@/types';
  import { browser } from '$app/env';
  import { writable, type Writable } from 'svelte/store';
  import { api } from '@/api';
  import LevelListItem from '../organisms/levels/LevelListItem.svelte';
  import { fade } from 'svelte/transition';

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

  let loading = false;

  let randomSeed: Writable<number | null> = writable(null);

  $: addItems = async (reset = false) => {
    if (loading) return;
    loading = true;
    const { data } = await api.get<ListResponse<Level>>('/api/v1/levels', {
      params: params(reset)
    });
    if (reset) items.set(data.results);
    else items.update((x) => [...x, ...data.results]);
    loading = false;
  };

  const params = (reset = false) => {
    const settings = $searchSetingStore;

    const result: Record<string, string | number | null> = {
      queryTitle: settings.query.title,
      queryArtist: settings.query.artist,
      queryCreator: settings.query.creator,

      offset: reset ? 0 : $items.length,
      limit: '25',

      minDifficulty: settings.filter.difficulty.min,
      maxDifficulty: settings.filter.difficulty.max,

      minBpm: settings.filter.bpm.min,
      maxBpm: settings.filter.bpm.max,

      minTiles: settings.filter.tiles.min,
      maxTiles: settings.filter.tiles.max,

      includeTags: settings.filter.tags.include.join(','),
      excludeTags: settings.filter.tags.exclude.join(',')
    };

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
    await addItems(true);
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
</script>

{#if browser}
  <VirtualScroll
    on:bottom={() => addItems()}
    data={$items}
    key="id"
    let:data
    pageMode={true}
    bottomThreshold={1200}
  >
    <div slot="header">
      <SearchInput placeholder="SEARCH_INPUT_PLACEHOLDER_LEVELS" bind:value={query} />
      <div class="mt-2">
        <LevelSearchSettingsArea />
      </div>
    </div>
    <div class="mb-[12px]" in:fade>
      <LevelListItem level={data} />
    </div>
  </VirtualScroll>
{/if}
