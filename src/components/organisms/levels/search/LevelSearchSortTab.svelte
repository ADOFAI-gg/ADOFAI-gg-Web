<script lang="ts">
  import SortOrderRadio from '@atoms/search/SortOrderRadio.svelte';
  import { fade } from 'svelte/transition';

  import SearchGroup from '@molecules/levels/SearchGroup.svelte';
  import { searchSettingStore, type SearchSettings } from '@/stores/search';
  import { useAccount } from '@/utils/constants';

  const updateOrder = (v: SearchSettings['sort']['order']) => () => {
    searchSettingStore.update((x) => ({
      ...x,
      sort: {
        ...x.sort,
        order: v
      }
    }));
  };

  const updateType = (v: SearchSettings['sort']['type']) => () => {
    searchSettingStore.update((x) => ({
      ...x,
      sort: {
        ...x.sort,
        type: v
      }
    }));
  };
</script>

<SearchGroup title="search:sort-by">
  <div class="sort">
    <div class="sort__unit-container">
      <SortOrderRadio
        icon="topLeft"
        key="search:sort-direction-asc"
        checked={$searchSettingStore.sort.order === 'asc'}
        on:click={updateOrder('asc')}
      />
      <SortOrderRadio
        icon="bottomRight"
        key="search:sort-direction-desc"
        checked={$searchSettingStore.sort.order === 'desc'}
        on:click={updateOrder('desc')}
      />
      <SortOrderRadio
        icon="shuffle"
        key="search:sort-direction-shuffle"
        checked={$searchSettingStore.sort.order === 'shuffle'}
        on:click={updateOrder('shuffle')}
      />
    </div>
    {#if $searchSettingStore.sort.order !== 'shuffle'}
      <div class="sort__order-area" transition:fade={{ duration: 400 }}>
        <div class="sort__divider" />
        <div class="sort__order-container">
          <SortOrderRadio
            icon="calendar"
            key="search:sort-by-created"
            checked={$searchSettingStore.sort.type === 'created'}
            on:click={updateType('created')}
          />
          <SortOrderRadio
            icon="fire"
            key="search:sort-by-difficulty"
            checked={$searchSettingStore.sort.type === 'difficulty'}
            on:click={updateType('difficulty')}
          />
          {#if useAccount}
            <SortOrderRadio
              icon="heart"
              key="search:sort-by-likes"
              checked={$searchSettingStore.sort.type === 'likes'}
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

      @media (width >= 640px) {
        flex-direction: row;
        gap: 24px;
      }
    }

    &__order-area {
      display: flex;
      flex-direction: column;

      @media (width >= 768px) {
        flex-direction: row;
      }
    }

    &__divider {
      display: none;
      margin-right: 24px;
      border-right: 1px solid rgba(255, 255, 255, 0.4);

      @media (width >= 768px) {
        display: block;
      }
    }

    &__order-container {
      display: flex;
      flex-direction: column;
      gap: 12px;

      @media (width >= 640px) {
        flex-direction: row;
        gap: 24px;
      }
    }

    @media (width >= 768px) {
      flex-direction: row;
      gap: 0;
    }
  }
</style>
