<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  export let title: TranslationKey;
</script>

<div>
  <div class="title"><Translation key={title} /></div>

  <hr />

  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  .title {
    font-size: 16px;
  }

  hr {
    margin-top: 4px;
    margin-bottom: 10px;
    opacity: 0.2;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
