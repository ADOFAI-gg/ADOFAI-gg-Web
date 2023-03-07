<script context="module" lang="ts">
  const difficulties = [
    0.1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18.5, 19, 19.5, 20, 20.1,
    20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9, 21, 101
  ];
</script>

<script lang="ts">
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import { fade } from 'svelte/transition';
  import Popover from '@atoms/common/Popover.svelte';
  import type { Instance, Props } from 'tippy.js';
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { reduceMotion } from '@/utils/settings';
  import { createEventDispatcher } from 'svelte';

  export let placeholder: string;

  export let value: number | null;

  const dispatch = createEventDispatcher();

  $: update = (difficulty: number | null) => () => {
    // value = difficulty;

    dispatch('change', { value: difficulty });
  };

  let instance: Instance | null;

  $: hide = () => {
    instance?.hide();
  };

  $: str = (() => {
    switch (value) {
      case 0.1:
        return 'Tiny';

      case 101:
        return '-1';

      case 18.5:
        return '18+';

      case 19.5:
        return '19+';

      default:
        return value;
    }
  })();

  const options: Partial<Props> = {
    onShow: (i) => {
      instance = i;
    },
    popperOptions: {
      strategy: 'fixed'
    }
  };
</script>

<Popover placement="bottom-end" {options}>
  <div class="input" slot="button">
    {#if value}
      <DifficultyIcon size={18} difficulty={value} />
      <div class="input-text">{str}</div>

      <button on:mouseup|preventDefault={update(null)} tabindex="0" class="input-reset">
        <Icon icon="close" size={14} alt="Reset Value Icon" />
      </button>
    {:else}
      <div class="input-placeholder" transition:fade={{ duration: $reduceMotion ? 0 : 200 }}>
        <Translation key={placeholder} />
      </div>
    {/if}
  </div>

  <button class="popover" on:click={hide}>
    {#each difficulties as difficulty}
      <button
        class="popover-icon"
        class:selected={value === difficulty}
        on:click|nonpassive={update(difficulty)}
        tabindex="0"
      >
        <DifficultyIcon {difficulty} size={24} />
      </button>
    {/each}
  </button>
</Popover>

<style lang="scss">
  .input {
    position: relative;
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 0 8px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;

    &-text {
      flex: 1;
    }

    &-reset {
      opacity: 0.6;
      transition: opacity 0.2s ease-in-out;

      &:hover,
      &:focus {
        opacity: 0.8;
      }
    }

    &-placeholder {
      position: absolute;
      opacity: 0.4;
    }
  }

  .popover {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    padding: 16px;

    &-icon {
      padding: 4px;
      border-radius: 99999em;
      background-color: rgba(255, 255, 255, 0);
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      transition-property: background-color, transform;

      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.2);
      }

      &.selected {
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(1.15);
      }
    }
  }
</style>
