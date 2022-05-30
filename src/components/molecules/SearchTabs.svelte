<script context="module" lang="ts">
  export const searchTabContextSymbol = Symbol();
</script>

<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let value: Writable<any>;

  export let label: string | null = null;

  export let deselectable = false;

  setContext(searchTabContextSymbol, {
    value,
    update: (newValue: any) => {
      $value = newValue;
    },
    deselectable
  });
</script>

<div class="flex gap-[12px]">
  {#if label}
    <div class="flex items-center md:hidden flex-grow gap-[12px]">
      <span class="opacity-60">{label}</span>
      <span class="flex-grow border-b border-opacity-20 border-white" />
    </div>
  {/if}

  <slot />
</div>
