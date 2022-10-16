<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  type T = $$Generic;

  export let value: T;

  let current = writable(value);

  setContext('tabValue', current);

  $: {
    value = $current;
  }
  $: {
    value = $current;
  }
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
