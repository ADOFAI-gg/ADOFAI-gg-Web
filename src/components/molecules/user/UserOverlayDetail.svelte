<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  export let labelKey: TranslationKey;
  export let value = '';
  export let valueKey: TranslationKey = 'common:change-me';
</script>

<div class="pair">
  <div class="pair__label">
    <Translation key={labelKey} />
  </div>

  <div class="pair__value">
    {#if value}
      {value}
    {:else}
      <Translation key={valueKey} />
    {/if}
  </div>
</div>

<style lang="scss">
  .pair {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    width: 0;
    text-align: center;

    &__label {
      font-weight: 300;
      font-size: 14px;
    }

    &__value {
      font-weight: 500;
      font-size: 16px;
    }
  }
</style>
