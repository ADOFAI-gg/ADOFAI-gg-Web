<script lang="ts">
  import SortOrderRadio from '@/components/atoms/SortOrderRadio.svelte';
  import { fade } from 'svelte/transition';

  import SearchGroup from '@/components/molecules/levels/SearchGroup.svelte';
  import { searchSetingStore, type SearchSettings } from '@/stores/search';

  const updateOrder = (v: SearchSettings['sort']['order']) => () => {
    searchSetingStore.update((x) => ({
      ...x,
      sort: {
        ...x.sort,
        order: v
      }
    }));
  };

  const updateType = (v: SearchSettings['sort']['type']) => () => {
    searchSetingStore.update((x) => ({
      ...x,
      sort: {
        ...x.sort,
        type: v
      }
    }));
  };
</script>

<SearchGroup title="SORT_BY">
  <div class="flex flex-col md:flex-row gap-[12px] md:gap-0">
    <div class="flex sm:gap-[24px] gap-[12px] flex-col sm:flex-row">
      <SortOrderRadio
        icon="topLeft"
        key="SORT_ASC"
        checked={$searchSetingStore.sort.order === 'asc'}
        on:click={updateOrder('asc')}
      />
      <SortOrderRadio
        icon="topLeft"
        key="SORT_DESC"
        checked={$searchSetingStore.sort.order === 'desc'}
        on:click={updateOrder('desc')}
      />
      <SortOrderRadio
        icon="shuffle"
        key="SORT_SHUFFLE"
        checked={$searchSetingStore.sort.order === 'shuffle'}
        on:click={updateOrder('shuffle')}
      />
    </div>
    {#if $searchSetingStore.sort.order !== 'shuffle'}
      <div class="flex flex-col md:flex-row" transition:fade>
        <div class="border-r hidden md:block border-white mr-[24px] border-opacity-40" />
        <div class="flex sm:gap-[24px] gap-[12px] flex-col sm:flex-row">
          <SortOrderRadio
            icon="calendar"
            key="SORT_CREATED"
            checked={$searchSetingStore.sort.type === 'created'}
            on:click={updateType('created')}
          />
          <SortOrderRadio
            icon="fire"
            key="SORT_DIFFICULTY"
            checked={$searchSetingStore.sort.type === 'difficulty'}
            on:click={updateType('difficulty')}
          />
          <SortOrderRadio
            icon="favorite"
            key="SORT_LIKES"
            checked={$searchSetingStore.sort.type === 'likes'}
            on:click={updateType('likes')}
          />
        </div>
      </div>
    {/if}
  </div>
</SearchGroup>
