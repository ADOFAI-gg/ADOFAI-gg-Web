<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import { fade } from 'svelte/transition';
  import { translate, currentLang } from '@/utils/i18n';
  import { reduceMotion } from '@/utils/settings';

  export let value = '';

  export let placeholder = 'SEARCH_INPUT_PLACEHOLDER_HOME';

  $: placeholderContent = translate(placeholder || '', $currentLang);
</script>

<div class="search-input">
  <Icon icon="search" size={16} alt="Search Icon" />

  <div class="search-input__input-wrapper">
    <input bind:value type="text" class="search-input__input" aria-label={placeholderContent} />

    {#if !value}
      <div
        transition:fade={{ duration: $reduceMotion ? 0 : 200 }}
        class="search-input__placeholder"
      >
        {placeholderContent}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .search-input {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
    height: 34px;
    padding: 0 14px;
    border-radius: 100em;
    background-color: rgba(255, 255, 255, 0.2);

    &__input-wrapper {
      position: relative;
      flex-grow: 1;
      width: 0;
      height: 100%;
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      outline: none;
      font-size: 16px;
    }

    &__placeholder {
      position: absolute;
      top: 50%;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0.4;
      pointer-events: none;
      transform: translateY(-50%);
    }
  }
</style>
