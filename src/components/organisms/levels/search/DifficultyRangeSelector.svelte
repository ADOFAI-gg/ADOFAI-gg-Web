<script lang="ts">
  import DifficultySelectorInput from '@atoms/search/DifficultySelectorInput.svelte';

  import RangeInputPair from '@atoms/interaction/RangeInputPair.svelte';
  import { searchSetingStore } from '@/stores/search';

  let min = $searchSetingStore.filter.difficulty.min;
  let max = $searchSetingStore.filter.difficulty.max;

  $: {
    searchSetingStore.update((v) => ({
      ...v,
      filter: {
        ...v.filter,
        difficulty: {
          min: min,
          max: max
        }
      }
    }));
    if (min && max) {
      if (min > max) {
        searchSetingStore.update((v) => ({
          ...v,
          filter: {
            ...v.filter,
            difficulty: {
              min: min,
              max: min
            }
          }
        }));
      }
    }
    min = $searchSetingStore.filter.difficulty.min;
    max = $searchSetingStore.filter.difficulty.max;
  }
</script>

<RangeInputPair>
  <DifficultySelectorInput bind:value={min} placeholder="SEARCH_META_LV_MIN" slot="min" />
  <DifficultySelectorInput bind:value={max} placeholder="SEARCH_META_LV_MAX" slot="max" />
</RangeInputPair>
