<script lang="ts">
  import SortOrderRadio from '@atoms/search/SortOrderRadio.svelte';
  import { fade } from 'svelte/transition';

  import SearchGroup from '@molecules/levels/SearchGroup.svelte';
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
  <div class="sort">
    <div class="sort__unit-container">
      <SortOrderRadio
        icon="topLeft"
        key="SORT_ASC"
        checked={$searchSetingStore.sort.order === 'asc'}
        on:click={updateOrder('asc')}
      />
      <SortOrderRadio
        icon="bottomRight"
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
      <div class="sort__order-area" transition:fade={{ duration: 400 }}>
        <div class="sort__divider" />
        <div class="sort__order-container">
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
          {#if import.meta.env.VITE_USE_ACCOUNT}
            <SortOrderRadio
              icon="heart"
              key="SORT_LIKES"
              checked={$searchSetingStore.sort.type === 'likes'}
              on:click={updateType('likes')}
            />
          {/if}
        </div>
      </div>
    {/if}
  </div>
</SearchGroup>

<style lang="scss">
  .sort {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__unit-container {
      display: flex;
      flex-direction: column;
      gap: 12px;

      @media (min-width: 640px) {
        flex-direction: row;
        gap: 24px;
      }
    }

    &__order-area {
      display: flex;
      flex-direction: column;

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    &__divider {
      display: none;
      margin-right: 24px;
      border-right: 1px solid rgba(255, 255, 255, 0.4);

      @media (min-width: 768px) {
        display: block;
      }
    }

    &__order-container {
      display: flex;
      flex-direction: column;
      gap: 12px;

      @media (min-width: 640px) {
        flex-direction: row;
        gap: 24px;
      }
    }

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 0;
    }
  }
</style>
