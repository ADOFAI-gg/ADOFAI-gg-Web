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
  <div
    class="px-[8px] bg-white py-[6px] rounded-[5px] cursor-pointer text-md h-[23px] leading-[10px] transition-all
  {$currentValue === value
      ? 'bg-opacity-20'
      : 'bg-opacity-0 focus:bg-opacity-10 hover:bg-opacity-10'}"
    tabindex="0"
    on:click={onClick}
    on:keydown={(e) => e.key === 'Enter' && onClick()}
  >
    <div class="flex gap-[6px] items-center h-full opacity-80">
      {#if icon}
        <Icon {icon} size={11} alt={`${icon} icon`} />
      {/if}
      <slot />
    </div>
  </div>
{/if}
