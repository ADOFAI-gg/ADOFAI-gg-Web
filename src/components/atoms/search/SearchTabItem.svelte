<script lang="ts">
  import { getContext } from 'svelte';

  import Icon from '@atoms/asset/Icon.svelte';
  import { searchTabContextSymbol } from '@molecules/search/SearchTabs.svelte';
  import type { Writable } from 'svelte/store';

  export let value: unknown;
  export let icon: string | null = null;

  const {
    update,
    value: currentValue,
    deselectable
  } = getContext<{
    value: Writable<unknown>;
    update: (newValue: unknown) => void;
    deselectable: boolean;
  }>(searchTabContextSymbol) ?? {};

  const onClick = () => {
    if (value === $currentValue) {
      if (deselectable) {
        update(null);
      }
      return;
    }
    update(value);
  };
</script>

{#if currentValue}
  <button
    class="tab-item"
    class:selected={$currentValue === value}
    tabindex="0"
    on:click={onClick}
    on:keydown={(e) => e.key === 'Enter' && onClick()}
  >
    <div class="content">
      {#if icon}
        <Icon {icon} size={11} alt={`${icon} icon`} />
      {/if}
      <slot />
    </div>
  </button>
{/if}

<style lang="scss">
  .tab-item {
    height: 23px;
    padding: 6px 8px;
    border-radius: 6px;
    background-color: white;
    font-size: 14px;
    line-height: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &.selected {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:not(.selected) {
      background-color: transparent;

      &:focus,
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    & > .content {
      display: flex;
      gap: 6px;
      align-items: center;
      height: 100%;
      opacity: 0.8;
    }
  }
</style>
