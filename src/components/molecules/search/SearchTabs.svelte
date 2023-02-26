<script context="module" lang="ts">
  export const searchTabContextSymbol = Symbol();
</script>

<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import { setContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let value: Writable<unknown>;

  export let label: string | null = null;

  export let deselectable = false;

  setContext(searchTabContextSymbol, {
    value,
    update: (newValue: unknown) => {
      $value = newValue;
    },
    deselectable
  });
</script>

<div class="tabs" style={$$props.style}>
  {#if label}
    <div class="tabs__label-container">
      <span class="tabs__label">
        <Translation key={label} />
      </span>
      <hr />
    </div>
  {/if}

  <slot />
</div>

<style lang="scss">
  .tabs {
    display: flex;
    gap: 12px;

    &__label {
      opacity: 0.6;

      &-container {
        display: flex;
        flex-grow: 1;
        gap: 12px;
        align-items: center;
      }

      @media (min-width: 768px) {
        display: none;
      }
    }

    hr {
      flex-grow: 1;
      opacity: 0.2;
    }
  }
</style>
