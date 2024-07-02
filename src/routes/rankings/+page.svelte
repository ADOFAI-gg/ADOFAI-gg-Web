<script lang="ts">
  import { browser } from '$app/environment';

  import LoadingSpinner from '@atoms/common/LoadingSpinner.svelte';
  import MainSectionTitle from '@atoms/common/MainSectionTitle.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import RankingListItem from '@organisms/rankings/RankingListItem.svelte';
  import RankingTopItem from '@organisms/rankings/RankingTopItem.svelte';
  import type { ListResponse } from '@/types';
  import type { RankingResult } from './+page';
  import VirtualList from '@/components/utils/VirtualList.svelte';
  import { createInfiniteQuery } from '@tanstack/svelte-query';
  import { clientApi } from '$lib/api';

  const pageSize = 30;

  let query = createInfiniteQuery({
    queryKey: ['rankings'],
    queryFn: ({ pageParam, signal }) => fetchPage(pageParam, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === pageSize ? pages.length + 1 : null;
    }
  });

  const fetchPage = async (page: number, signal: AbortSignal) => {
    const { data } = await clientApi.get<ListResponse<RankingResult>>('/api/v1/ranking', {
      params: { offset: page * pageSize, amount: pageSize },
      signal
    });

    return data.results;
  };

  $: topItems =
    $query.data?.pages[0].slice(0, 3).map((x, i) => ({
      ...x,
      rank: i + 1
    })) || [];
</script>

<PageContainer>
  <div class="top-spacer">
    <MainSectionTitle titleKey="ranking:title" />
  </div>
  {#if $query.isLoading}
    <div class="loader">
      <LoadingSpinner />
    </div>
  {:else if browser}
    <div class="top-rankings">
      {#each topItems as item}
        <RankingTopItem {item} />
      {/each}
    </div>
    <VirtualList {query} offset={3}>
      <RankingListItem slot="item" let:item let:row item={{ ...item, rank: row.index + 3 + 1 }} />
    </VirtualList>
  {/if}
</PageContainer>

<style lang="scss">
  .top-spacer {
    margin-top: 24px;
  }

  .top-rankings {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 16px;

    @media (width >= 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    @media (width >= 1024px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .loader {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
