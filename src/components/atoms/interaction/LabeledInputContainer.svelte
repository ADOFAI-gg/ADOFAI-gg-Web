<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  export let key: TranslationKey;
</script>

<div>
  <div class="translation">
    <Translation {key} />
  </div>
  <div class="slot">
    <slot />
  </div>
</div>

<style lang="scss">
  .translation {
    opacity: 0.8;
  }

  .slot {
    margin-top: 4px;
  }
</style>
