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

  export let href: string;
</script>

<a class="tab-item" class:active {href}>
  {#if icon}
    <Icon size={18} {icon} alt="{icon} icon" />
  {/if}
  <div>
    <Translation key={title} />
  </div>
  <div class="tab-item__indicator" class:selected={active} />
</a>

<style lang="scss">
  .tab-item {
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    gap: 10px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 42px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;

    &__indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgba(var(--color-blue), 1);
      opacity: 0;
      transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 150ms;

      &.selected {
        opacity: 1;
      }
    }

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
