<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';

  type T = $$Generic;

  const currentValue = getContext<Writable<T>>('tabValue');

  export let value: T;

  $: active = $currentValue === value;

  export let title: string;

  export let icon: string | undefined = undefined;

  const activate = () => {
    $currentValue = value;
  };
</script>

<button
  class="
    transition-all h-[42px] flex justify-center items-center gap-[10px] rounded-[8px] font-medium"
  class:active
  on:click={activate}
>
  {#if icon}
    <Icon size={18} {icon} alt="{icon} icon" />
  {/if}
  <div>
    <Translation key={title} />
  </div>
  <div
    class="absolute bottom-0 h-[2px] w-full left-0 bg-blue transition-opacity
      {active ? 'opacity-100' : 'opacity-0'}"
  />
</button>

<style lang="scss">
  button {
    position: relative;
    flex-grow: 1;
    flex-shrink: 0;
    overflow: hidden;
    cursor: pointer;
    user-select: none;

    &.active {
      background-color: rgba(var(--color-darkblue), 0.4);
    }

    &:not(.active) {
      background-color: rgba(var(--color-darkblue), 0.2);

      &:hover,
      &:focus {
        background-color: rgba(var(--color-darkblue), 0.3);
      }
    }
  }
</style>
