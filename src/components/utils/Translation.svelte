<script lang="ts" context="module">
  /* eslint svelte/no-at-html-tags: 0 */
</script>

<script lang="ts">
  import { type TranslationKey, translate, getLangContext } from '@/utils/i18n';
  import type { FluentVariable } from '@fluent/bundle';

  export let key: TranslationKey;
  export let params: Record<string, FluentVariable> = {};

  export let htmlReplacer: (value: string) => string = (v) => v;

  const currentLang = getLangContext();

  $: htmlValue = (() => {
    let k = translate(key, params, true, $currentLang);

    k = htmlReplacer(k);

    return k;
  })();
</script>

{@html htmlValue}
