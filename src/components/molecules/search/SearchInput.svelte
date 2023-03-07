<script lang="ts" context="module">
  const escape = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
</script>

<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import { fade } from 'svelte/transition';
  import { translate, currentLang } from '@/utils/i18n';
  import { parseSearchString, type SearchChunk } from '@/utils/search';

  export let value = '';
  export let parsedValue: SearchChunk[] = [];

  export let placeholder = 'SEARCH_INPUT_PLACEHOLDER_HOME';

  let inputWidth = 0;

  $: placeholderContent = translate(placeholder || '', $currentLang);

  $: parsedValue = parseSearchString(value);
</script>

<div class="search-input">
  <Icon icon="search" size={16} alt="Search Icon" />

  <div class="search-input__input-wrapper">
    <input type="text" class="search-input__input" bind:value style="width: {inputWidth}px;" />
    <div class="search-renderer" bind:clientWidth={inputWidth}>
      {#each parsedValue as chunk (chunk)}
        {#if chunk.type === 'normal'}
          <span>{@html escape(chunk.value).replace(/ /g, '&nbsp;')}</span>
        {:else}
          <span class="search-parameter-label">{chunk.type}:</span><span
            class="search-parameter-content"
            >{@html escape(
              (chunk.afterLabel ?? '') +
                (chunk.quote
                  ? `${chunk.quote}${chunk.value.split(chunk.quote).join(`\\${chunk.quote}`)}${
                      chunk.quote
                    }`
                  : chunk.value) +
                (chunk.afterExp ?? '')
            ).replace(/ /g, '&nbsp;')}</span
          >
        {/if}
      {/each}
    </div>

    {#if !value}
      <div transition:fade={{ duration: 200 }} class="search-input__placeholder">
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
      overflow-x: scroll;
      width: 0;
      height: 100%;
      scrollbar-width: none;
    }

    &__input {
      position: absolute;
      top: 50%;
      left: 0;
      align-items: center;
      min-width: 100%;
      background-color: transparent;
      color: transparent;
      outline: none;
      font-size: 16px;
      transform: translateY(-50%);
      caret-color: white;
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

  .search-renderer {
    position: absolute;
    top: 50%;
    left: 0;
    align-items: center;
    width: fit-content;
    background-color: transparent;
    outline: none;
    font-size: 16px;
    pointer-events: none;
    transform: translateY(-50%);
  }

  .search-parameter-content {
    color: rgba(var(--color-blue), 1);
  }
</style>
