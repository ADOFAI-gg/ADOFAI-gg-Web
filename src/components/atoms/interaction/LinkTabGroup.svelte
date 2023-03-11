<script lang="ts">
  import { setContext } from 'svelte';
  import type { Readable } from 'svelte/store';

  type T = $$Generic;
  export let value: Readable<T>;

  setContext('tabValue', value);
</script>

<div class="slot">
  <slot />
</div>

<style lang="scss">
  .slot {
    display: flex;
    gap: 12px;
    width: 100%;
  }
</style>
