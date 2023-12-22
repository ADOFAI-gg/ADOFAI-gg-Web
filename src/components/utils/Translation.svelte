<script lang="ts" context="module">
  /* eslint svelte/no-at-html-tags: 0 */
</script>

<script lang="ts">
  import { currentLang, type TranslationKey, translate } from '@/utils/i18n';
  import type { FluentVariable } from '@fluent/bundle';

  export let key: TranslationKey;
  export let params: Record<string, FluentVariable> = {};
  export let allowLinks = false;

  export let htmlReplacer: (value: string) => string = (v) => v;

  const builtinReplacer = (text: string): string => {
    if (allowLinks)
      text = text.replace(/\[link="([^"]*)"\]([^"]*)\[\/link\]/g, (_, href, text) => {
        return `<a href="${href}" class="link">${decodeURIComponent(text)}</a>`;
      });
    return text;
  };

  $: htmlValue = (() => {
    let k = translate(key, params, true, $currentLang);

    k = htmlReplacer(k);
    k = builtinReplacer(k);

    return k;
  })();
</script>

{@html htmlValue}
