<script context="module" lang="ts">
  export const searchTabContextSymbol = Symbol();
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let value: Writable<any>;

  export let label: string | null = null;

  let className = '';

  export let deselectable = false;

  export { className as class };

  setContext(searchTabContextSymbol, {
    value,
    update: (newValue: any) => {
      $value = newValue;
    },
    deselectable
  });
</script>

<div class="tabs-container {className}">
  {#if label}
    <div class="label-container">
      <span class="label">{label}</span>
      <hr />
    </div>
  {/if}

  <slot />
</div>

<style lang="scss">
  .tabs-container {
    display: flex;
    gap: 12px;

    .label-container {
      display: flex;
      flex-grow: 1;
      gap: 12px;
      align-items: center;

      .label {
        opacity: 0.6;
      }

      hr {
        flex-grow: 1;
        opacity: 0.2;
      }

      @media (min-width: 768px) {
        display: none;
      }
    }
  }
</style>
