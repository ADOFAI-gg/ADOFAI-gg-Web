<script lang="ts">
  import { translate, currentLang } from '@/utils/i18n';

  export let placeholder: string | null = null;

  export let value: string | number | null = '';

  let inputType = 'text';

  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;

  $: placeholderContent = translate(placeholder || '', $currentLang);

  $: textValue = `${value ?? ''}`;

  export { inputType as type };
</script>

<div class="input-container">
  <label>
    <div class="input-container__placeholder" data-has-value={!!textValue}>
      {placeholderContent || ''}
    </div>

    {#if inputType === 'number'}
      <input
        type="number"
        class="input-container__input"
        bind:value
        on:input
        {min}
        {max}
        aria-label={placeholderContent}
      />
    {:else if inputType === 'text'}
      <input
        type="text"
        class="input-container__input"
        bind:value
        on:input
        {min}
        {max}
        aria-label={placeholderContent}
      />
    {/if}
  </label>
</div>

<style lang="scss">
  .input-container {
    position: relative;
    width: 100%;
    height: 30px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.2);

    &__placeholder {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 8px;
      line-height: 0;
      opacity: 0.4;
      pointer-events: none;
      transition: opacity 0.2s ease-in-out;

      &[data-has-value='true'] {
        opacity: 0;
      }
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      padding: 0 8px;
      background-color: transparent;
      outline: none;
    }
  }
</style>
