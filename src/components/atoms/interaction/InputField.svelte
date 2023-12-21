<script lang="ts">
  import { currentLangData, type TranslationKey } from '@/utils/i18n';
  import Icon from '@atoms/asset/Icon.svelte';

  export let value: TranslationKey = '';
  export let placeholder: string = '';
  export let passwordVisible: boolean = false;

  let input: HTMLInputElement;
  let showPassword: boolean = false;

  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
    input.type = showPassword ? 'text' : 'password';
  };

  $: localizedPlaceholder = $currentLangData[placeholder];
</script>

<div class="input-field-container">
  <div class="input-field">
    <input
      type="text"
      class="input-field__input"
      placeholder={localizedPlaceholder}
      {value}
      bind:this={input}
      {...$$restProps}
    />
    {#if passwordVisible}
      <button
        type="button"
        class="input-field__password-button"
        on:click={togglePasswordVisibility}
      >
        {#if showPassword}
          <Icon icon="hide" size={16} alt="Hide Password" />
        {:else}
          <Icon icon="show" size={16} alt="Show Password" />
        {/if}
      </button>
    {/if}
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
    position: relative;

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

    &__password-button {
      opacity: 0.4;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      transition: opacity ease-in-out 0.1s;

      &:hover {
        opacity: 0.6;
      }
    }
  }
</style>
