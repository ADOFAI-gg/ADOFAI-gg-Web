<script lang="ts">
  import Icon from '../atoms/Icon.svelte';
  import { fade } from 'svelte/transition';
  import { i18nReady, translate, currentLang } from '@/utils/i18n';

  export let value = '';

  export let placeholder = 'SEARCH_INPUT_PLACEHOLDER_HOME';

  $: placeholderContent = $i18nReady ? translate(placeholder || '', $currentLang) : null;
</script>

<div
  class="w-full rounded-full bg-white bg-opacity-20 h-[34px] flex items-center px-[13px] gap-[9px]"
>
  <Icon icon="search" size={16} />

  <div class="flex-grow w-0 h-full relative">
    <input
      bind:value
      type="text"
      aria-label={placeholderContent}
      class="absolute w-full h-full left-0 top-0 bg-transparent outline-none text-lg"
    />
    {#if !value}
      <div
        transition:fade={{ duration: 200 }}
        class="w-full h-full absolute items-center flex opacity-40 pointer-events-none"
      >
        {placeholderContent}
      </div>
    {/if}
  </div>
</div>
