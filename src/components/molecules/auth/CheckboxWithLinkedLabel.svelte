<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  /**
   * The checkboxes state.
   */
  export let checked: boolean = false;

  /**
   * The checkbox label's translation key.
   */
  export let labelKey: TranslationKey;

  /**
   * The extra label's link.
   */
  export let extraLabelLink: string;

  /**
   * The extra label's translation key.
   */
  export let extraLabelKey: TranslationKey;

  export let onChange: ((event: Event) => void) | undefined = undefined;
</script>

<div class="checkbox-with-linked-label-container">
  <label class="checkbox-label">
    <span class="checkbox-container">
      <input
        type="checkbox"
        style="position: absolute; opacity: 0; pointer-events: none;"
        bind:checked
        {...$$restProps}
        on:change={onChange}
      />
      <span class="checkbox">
        <svg
          class="checkbox-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="7"
          viewBox="0 0 8 7"
          fill="none"
        >
          <path d="M0.5 3L3 6L7.5 1" stroke="white" stroke-linecap="round" />
        </svg>
      </span>
    </span>

    <span class="checkbox-label">
      <Translation key={labelKey} />
    </span>
  </label>
  <a class="extra-label" href={extraLabelLink} target="_blank">
    <Translation key={extraLabelKey} />
  </a>
</div>

<style lang="scss">
  .checkbox-with-linked-label-container {
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: space-between;
  }

  .extra-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    line-height: 1.2;
    text-align: right;
    text-decoration-line: underline;
  }

  .checkbox-container {
    position: relative;
    width: 14px;
    height: 14px;
  }

  .checkbox-label {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
    font-size: 16px;
    line-height: 1.2;
  }

  .checkbox {
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 3px;
  }

  .checkbox-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    transition: opacity ease 0.1s;
    transform: translate(-50%, -50%);
  }

  input[type='checkbox']:focus + .checkbox {
    border-color: white;
  }

  input[type='checkbox']:checked + .checkbox > .checkbox-icon {
    opacity: 1;
  }
</style>
