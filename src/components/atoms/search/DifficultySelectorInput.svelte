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

  export let placeholder: string;

  export let value: number | null;

  $: update = (difficulty: number | null) => () => {
    value = difficulty;
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
    }
  };
</script>

<Popover placement="bottom" {options}>
  <div
    class="bg-white cursor-pointer bg-opacity-20 relative rounded-[5px] gap-[8px] h-[30px] w-full flex items-center px-2"
    slot="button"
  >
    {#if value}
      <DifficultyIcon size={18} difficulty={value} />
      <div class="flex-grow">{str}</div>
      <div
        on:mouseup|preventDefault={update(null)}
        class="opacity-60 hover:opacity-80 transition-opacity"
      >
        <Icon icon="close" size={14} alt="Reset Value Icon" />
      </div>
    {:else}
      <div class="opacity-40 absolute" transition:fade={{ duration: 200 }}>
        <Translation key={placeholder} />
      </div>
    {/if}
  </div>
  <div class="p-4 flex flex-wrap gap-[8px] justify-center" on:click={hide}>
    {#each difficulties as difficulty}
      <div
        class="p-1 bg-opacity-80 hover:bg-white/40 ohnomybrainhurts rounded-full transition-all cursor-pointer"
        on:click|nonpassive={update(difficulty)}
        class:bg-white={value === difficulty}
      >
        <DifficultyIcon {difficulty} size={24} />
      </div>
    {/each}
  </div>
</Popover>