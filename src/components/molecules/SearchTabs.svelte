<script context="module" lang="ts">
  export const searchTabContextSymbol = Symbol();
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let value: Writable<any>;

  setContext(searchTabContextSymbol, {
    value,
    update: (newValue: any) => {
      $value = newValue;
    }
  });
</script>

<div class="flex gap-[12px]">
  <slot />
</div>
