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

<div class="flex gap-[12px] w-full">
  <slot />
</div>
