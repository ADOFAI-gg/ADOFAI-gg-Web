<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import type { Level } from '@/types';
  import type { CreateInfiniteQueryResult, InfiniteData } from '@tanstack/svelte-query';
  import { createWindowVirtualizer } from '@tanstack/svelte-virtual';
  import LevelTableRow from './LevelTableRow.svelte';
  import LoadingSpinner from '@/components/atoms/common/LoadingSpinner.svelte';

  export let query: CreateInfiniteQueryResult<InfiniteData<Level[]>, Error>;

  const rowHeight = 52;

  const columns = [
    {
      id: 'id',
      size: 72
    },
    {
      id: 'difficulty',
      size: 48
    },
    {
      id: 'level-name',
      size: 400
    },
    {
      id: 'artist',
      size: 360
    },
    {
      id: 'creator',
      size: 360
    },
    {
      id: 'bpm',
      size: 144
    },
    {
      id: 'tiles',
      size: 120
    },
    {
      id: 'tags',
      size: 240
    },
    {
      id: 'warnings',
      size: 128
    },
    {
      id: 'links',
      size: 104
    }
  ];

  $: allItems = $query.data?.pages.flatMap((x) => x) || [];

  $: virtualizer = createWindowVirtualizer<HTMLTableRowElement>({
    count: allItems.length,
    estimateSize: () => rowHeight,
    overscan: 20
  });

  $: {
    $virtualizer.setOptions({
      count: allItems.length
    });
  }

  $: {
    const [lastItem] = [...$virtualizer.getVirtualItems()].reverse();
    if (
      lastItem &&
      lastItem.index >= allItems.length - 1 &&
      $query.hasNextPage &&
      !$query.isFetchingNextPage
    ) {
      $query.fetchNextPage();
    }
  }

  $: items = $virtualizer.getVirtualItems();
</script>

<div class="table-container">
  <div style="height: {$virtualizer.getTotalSize() + 32}px;" class="level-table-width"></div>
  <table class="level-table level-table-width">
    <thead>
      <tr>
        {#each columns as header (header.id)}
          <th class="table-header-text" style="width: {header.size}px;">
            <Translation key="level-table-cols:{header.id}" />
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="table-body" style="transform: translateY({items[0]?.start || 0}px);">
      <!-- {#if items[0]}
      {@const item = items[0]}

      <tr style="height: {item.start}px;"></tr>
    {/if} -->
      {#each items as row (row.index)}
        <LevelTableRow item={row} level={allItems[row.index]} />
        <!-- <tr
        data-index={row.index}
        class="row"
        style="height: {row.size}px; transform: translateY({row.start - idx * row.size}px);"
      >
        <td>{allItems[row.index].id}</td>
      </tr> -->
      {/each}
    </tbody>
  </table>

  {#if $query.hasNextPage}
    <div class="loading">
      <LoadingSpinner />
    </div>
  {/if}
</div>

<style lang="scss">
  .level-table {
    position: absolute;
    top: 0;
    left: 0;
    table-layout: fixed;
  }

  .level-table-width {
    width: max(100vw, 2000px);
  }

  .table-header-text {
    height: 32px;
    padding-bottom: 8px;
    padding-left: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
  }

  .table-body {
    position: relative;
  }

  .table-container {
    position: relative;
  }

  .loading {
    margin-top: 16px;
  }
</style>
