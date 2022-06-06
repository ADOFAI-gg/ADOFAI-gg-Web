<script lang="ts">
  import DifficultySelectorInput from '@/components/atoms/DifficultySelectorInput.svelte';

  import RangeInputPair from '@/components/atoms/RangeInputPair.svelte';
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
  <DifficultySelectorInput bind:value={min} placeholder="Min Lv." slot="min" />
  <DifficultySelectorInput bind:value={max} placeholder="Max Lv." slot="max" />
</RangeInputPair>
