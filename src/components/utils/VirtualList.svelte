<script lang="ts">
  import VirtualListItem from './VirtualListItem.svelte';

  import type { CreateInfiniteQueryResult, InfiniteData } from '@tanstack/svelte-query';
  import { createWindowVirtualizer } from '@tanstack/svelte-virtual';
  import LoadingSpinner from '../atoms/common/LoadingSpinner.svelte';

  export let estimateSize = 100;

  // eslint-disable-next-line no-undef
  type T = $$Generic;

  export let query: CreateInfiniteQueryResult<InfiniteData<T[]>, Error>;

  $: allItems = $query.data?.pages.flatMap((x) => x) || [];

  let listEl: HTMLDivElement;

  $: virtualizer = createWindowVirtualizer<HTMLDivElement>({
    count: 0,
    overscan: 20,
    estimateSize: () => estimateSize
  });

  $: {
    const count = $query.hasNextPage ? allItems.length + 1 : allItems.length;

    $virtualizer.setOptions({
      count
    });

    const [lastItem] = [...$virtualizer.getVirtualItems()].reverse();

    if (
      lastItem &&
      lastItem.index > allItems.length - 1 &&
      $query.hasNextPage &&
      !$query.isFetchingNextPage
    ) {
      $query.fetchNextPage();
    }
  }

  $: items = $virtualizer.getVirtualItems();
</script>

<div bind:this={listEl}>
  <div style="position: relative; width: 100%; height: {$virtualizer.getTotalSize()}px;">
    <div
      style="position: absolute; top: 0; left: 0; width: 100%; transform: translateY({items[0]
        ? items[0].start
        : 0}px);"
    >
      {#each $virtualizer.getVirtualItems() as row (row.index)}
        <VirtualListItem {virtualizer} item={row}>
          {#if row.index > allItems.length - 1}
            {#if $query.hasNextPage}
              <div class="loading-container">
                <LoadingSpinner />
              </div>
            {/if}
          {:else}
            <slot name="item" item={allItems[row.index]} />
          {/if}
        </VirtualListItem>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .loading-container {
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }
</style>
