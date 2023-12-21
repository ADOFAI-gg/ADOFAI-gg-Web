<script lang="ts">
  import { currentLangData, type TranslationKey } from '@/utils/i18n';

  export let value: TranslationKey = '';
  export let placeholder: string = '';

  $: localizedPlaceholder = $currentLangData[placeholder];
</script>

<div class="input-field-container">
  <div class="input-field">
    <input
      type="text"
      class="input-field__input"
      placeholder={localizedPlaceholder}
      {value}
      {...$$restProps}
    />
  </div>
</div>

<style lang="scss">
  .input-field-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
  }

  .input-field {
    display: flex;
    flex-grow: 1;
    align-self: stretch;
    padding: 4px 0;

    &__input {
      background-color: transparent;
      flex-grow: 1;
      flex-shrink: 0;
      text-align: start;
      outline: none;
      padding-bottom: 4px;

      transition: border-bottom-color ease 0.2s;

      --input-border-opacity: 0.4;

      border-bottom: 1px solid rgba(255, 255, 255, var(--input-border-opacity));

      &:focus {
        --input-border-opacity: 1;
      }

      &::placeholder {
        color: white;
        opacity: 0.4;
      }
    }
  }
</style>
