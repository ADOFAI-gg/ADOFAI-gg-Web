<script context="module" lang="ts">
  const tagRegex = /<(.+)>(.+?)<\/\1>/g;
</script>

<script lang="ts">
  import { langData, currentLang, fallbackLang } from '@/utils/i18n';
  import TranslationComponentPortal from './TranslationComponentPortal.svelte';

  export let key: string;

  let componentsContainer: HTMLDivElement;

  $: components = (() => {
    if (componentsContainer) {
      const res: Record<string, HTMLElement> = {};
      for (const node of Array.from(componentsContainer.children)) {
        const key = (node as HTMLElement).dataset.key;
        if (key) {
          res[key] = node as HTMLElement;
        }
      }
      return res;
    }

    return {} as Record<string, HTMLElement>;
  })();

  type TranslationChunk =
    | {
        type: 'text';
        value: string;
      }
    | {
        type: 'component';
        tag: string;
        value: string;
      };

  $: value = (() => {
    const keyResult: TranslationChunk[] = [{ type: 'text', value: key }];
    const l = $currentLang;
    if (!l) return keyResult;
    const lang = $langData[l];
    if (!lang) return keyResult;
    let k = lang[key] ?? $langData[fallbackLang][key];
    if (!k) return keyResult;
    const matches = k.matchAll(tagRegex);
    const result: TranslationChunk[] = [];
    let lastIndex = 0;
    for (const match of matches) {
      if (match.input) {
        result.push({
          type: 'text',
          value: match.input.slice(lastIndex, match.index)
        });
      }
      result.push({ tag: match[1], value: match[2], type: 'component' });
      if (match.index) {
        lastIndex = match.index;
      }
    }
    return result;
  })();
</script>

{#each value as chunk, i (i)}
  {#if chunk.type === 'text'}
    {chunk.value}
  {:else if chunk.type === 'component'}
    {#if components[chunk.tag]}
      <TranslationComponentPortal component={components[chunk.tag]} text={chunk.value} />
    {:else}
      <div>{chunk.value}</div>
    {/if}
  {/if}
{/each}

<div class="hidden" bind:this={componentsContainer}>
  <slot />
</div>
