<script context="module" lang="ts">
  export type RankingResult = Ranking & { rank: number };

  export const load: Load = async () => {
    return {
      stuff: {
        title: 'Ranking - ADOFAI.gg'
      }
    };
  };
</script>

<script lang="ts">
  import { api } from '@/api';

  import LoadingSpinner from '@/components/atoms/LoadingSpinner.svelte';
  import MainSectionTitle from '@/components/atoms/MainSectionTitle.svelte';
  import PageContainer from '@/components/atoms/PageContainer.svelte';
  import RankingListItem from '@/components/organisms/rankings/RankingListItem.svelte';
  import RankingTopItem from '@/components/organisms/rankings/RankingTopItem.svelte';
  import type { ListResponse, Ranking } from '@/types';
  import VirtualizedInfiniteScroll from '@adofai-gg/svelte-virtualized-infinite-scroll/dist/ts/VirtualizedInfiniteScroll.svelte';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let items = writable<RankingResult[]>([]);

  let total = 0;

  let offsets = writable<number[]>([]);

  $: loadMore = async (reset: boolean) => {
    let offset = 0;
    if (!reset) {
      offset = $items.length;
    }
    if (!reset && $offsets.includes(offset)) {
      return;
    }

    offsets.update((x) => [...x, offset]);

    const { data } = await api.get<ListResponse<RankingResult>>('/api/v1/ranking', {
      params: { offset, amount: 30 }
    });

    total = data.count;

    const results = data.results.map((x, i) => ({ ...x, rank: offset + i + 1 }));

    if (reset) items.set(results);
    else items.update((x) => [...x, ...results]);
  };

  onMount(() => {
    loadMore(true).then();
  });

  $: topItems = $items.slice(0, 3);

  $: listItems = $items.slice(3);
</script>

<div class="h-nav" />

<PageContainer>
  <div class="mt-[24px]">
    <MainSectionTitle title="Rankings" />
  </div>
  <div class="md:grid flex flex-col mb-[16px] md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
    {#each topItems as item}
      <RankingTopItem {item} />
    {/each}
  </div>
  <VirtualizedInfiniteScroll
    scrollContainer=".simplebar-content-wrapper"
    data={listItems}
    let:item
    on:more={() => loadMore(false)}
    {total}
  >
    <RankingListItem {item} />
    <div slot="loading" class="w-full flex justify-center">
      <LoadingSpinner size={48} />
    </div>
  </VirtualizedInfiniteScroll>
</PageContainer>
