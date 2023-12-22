<script lang="ts">
  import { currentLang, type TranslationKey, translate } from '@/utils/i18n';
  import Icon from '@atoms/asset/Icon.svelte';
  import type { FormEventHandler } from 'svelte/elements';

  export let value: string = '';
  export let placeholder: string = '';
  export let type = 'text';

  let showPassword: boolean = false;

  const onChange: FormEventHandler<HTMLInputElement> = (e: Event) => {
    value = (e.target as HTMLInputElement).value;
  };

  $: localizedPlaceholder = translate(placeholder as TranslationKey, {}, true, $currentLang);
  $: inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  $: passwordVisible = type === 'password';
</script>

<div class="input-field-container">
  <div class="input-field">
    <input
      type={inputType}
      class="input-field__input"
      placeholder={localizedPlaceholder}
      {value}
      on:input={onChange}
      {...$$restProps}
    />
    {#if passwordVisible}
      <button
        type="button"
        class="input-field__password-button"
        on:click={() => {
          showPassword = !showPassword;
        }}
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
    flex-grow: 1;
    flex-direction: column;
    width: 100%;
  }

  .input-field {
    position: relative;
    display: flex;
    flex-grow: 1;
    align-self: stretch;
    padding: 4px 0;

    &__input {
      --input-border-opacity: 0.4;

      flex-grow: 1;
      flex-shrink: 0;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(255, 255, 255, var(--input-border-opacity));
      background-color: transparent;
      outline: none;
      text-align: start;
      transition: border-bottom-color ease 0.2s;

      &:focus {
        --input-border-opacity: 1;
      }

      &::placeholder {
        color: white;
        opacity: 0.4;
      }
    }

    &__password-button {
      position: absolute;
      top: 50%;
      right: 0;
      opacity: 0.4;
      transition: opacity ease-in-out 0.1s;
      transform: translateY(-50%);

      &:hover {
        opacity: 0.6;
      }
    }
  }
</style>
