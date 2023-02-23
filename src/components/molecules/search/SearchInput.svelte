<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import { fade } from 'svelte/transition';
  import { translate, currentLang } from '@/utils/i18n';

  export let value = '';

  export let placeholder = 'SEARCH_INPUT_PLACEHOLDER_HOME';

  $: placeholderContent = translate(placeholder || '', $currentLang);
</script>

<div class="search-input-container">
  <Icon icon="search" size={16} alt="Search Icon" />

  <div class="input-wrapper">
    <input bind:value type="text" aria-label={placeholderContent} />

    {#if !value}
      <div transition:fade={{ duration: 200 }} class="placeholder">
        {placeholderContent}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .search-input-container {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
    height: 34px;
    padding: 0 14px;
    border-radius: 100em;
    background-color: rgba(255, 255, 255, 0.2);

    .input-wrapper {
      position: relative;
      flex-grow: 1;
      width: 0;
      height: 100%;

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        outline: none;
        font-size: 16px;
      }

      .placeholder {
        position: absolute;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        pointer-events: none;
      }
    }
  }
</style>
