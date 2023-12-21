<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import { createEventDispatcher } from 'svelte';

  /**
   * The checkboxes state.
   */
  export let checked: boolean = false;

  /**
   * The checkbox label's translation key.
   */
  export let labelKey: string;

  /**
   * The extra label's link.
   */
  export let extraLabelLink: string;

  /**
   * The extra label's translation key.
   */
  export let extraLabelKey: string;

  const dispatch = createEventDispatcher();

  const onClick = () => {
    checked = !checked;
    dispatch('valueChanged');
  };
</script>

<div class="checkbox-with-linked-label-container">
  <label class="checkbox-container">
    <input type="checkbox" style="display: none;" on:click={onClick} />
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
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }

  .extra-label {
    color: rgba(255, 255, 255, 0.6);
    text-align: right;
    font-size: 14px;
    line-height: 1.2;
    text-decoration-line: underline;
  }

  .checkbox-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }

  .checkbox-label {
    font-size: 16px;
    line-height: 1.2;
  }

  .checkbox {
    display: inline-block;
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  .checkbox-icon {
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity ease 0.1s;
  }

  input[type='checkbox']:checked + .checkbox > .checkbox-icon {
    opacity: 1;
  }
</style>
