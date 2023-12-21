<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  export let label: TranslationKey;
</script>

<div class="fair">
  <div class="fair__label"><Translation key={label} /></div>
  <div class="fair__value"><slot /></div>
</div>

<style lang="scss">
  .fair {
    display: flex;
    flex-direction: column;

    &__label {
      font-weight: 300;
      font-size: 16px;
      opacity: 0.8;
    }

    &__value {
      margin-top: 6px;
      font-weight: 500;
      font-size: 28px;
      line-height: 24px;
    }
  }
</style>
