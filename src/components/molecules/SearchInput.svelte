<script lang="ts">
  import Icon from '../atoms/Icon.svelte';
  import { fade } from 'svelte/transition';
  import Translation from '../utils/Translation.svelte';

  export let value = '';

  export let placeholder = 'SEARCH_INPUT_PLACEHOLDER_HOME';
</script>

<div
  class="w-full rounded-full bg-white bg-opacity-20 h-[34px] flex items-center px-[13px] gap-[9px]"
>
  <Icon icon="search" size={16} />
  <div class="flex-grow w-0 h-full relative">
    <input
      bind:value
      type="text"
      class="absolute w-full h-full left-0 top-0 bg-transparent outline-none text-lg"
    />
    {#if !value}
      <div
        transition:fade={{ duration: 200 }}
        class="w-full h-full absolute items-center flex opacity-40 pointer-events-none"
      >
        <Translation key={placeholder} />
      </div>
    {/if}
  </div>
</div>
