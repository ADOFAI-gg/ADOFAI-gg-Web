<script context="module" lang="ts">
  const escape = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
</script>

<script lang="ts">
  import { langData, currentLang, fallbackLang, type TranslationKeys } from '@/utils/i18n';

  export let key: TranslationKeys;
  export let params: Record<string, string> = {};

  export let htmlReplacer: (value: string) => string = (v) => v;

  $: htmlValue = (() => {
    const l = $currentLang;
    const lang = langData[l] ?? langData[fallbackLang];

    if (!lang) return escape(key);

    let k = lang[key] ?? langData[fallbackLang][key];

    if (!k) return key;

    for (const paramId in params) {
      k = k.split(`{${paramId}}`).join(escape(params[paramId])); // replace all
    }

    k = htmlReplacer(k);

    return k;
  })();
</script>

{@html htmlValue}
