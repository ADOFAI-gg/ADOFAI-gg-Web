<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  let focusHandle: HTMLDivElement;

  const focusHandleValue = writable<HTMLDivElement | null>(null);

  setContext('focusHandle', focusHandleValue);

  $: focusHandleValue.set(focusHandle);

  export let style = '';
</script>

<div class="focus-handle" bind:this={focusHandle} />

<table {style} {...$$restProps}>
  <slot />
</table>

<style lang="scss">
  /* stylelint-disable selector-pseudo-class-no-unknown */

  .focus-handle {
    position: absolute;
    border: 2px solid transparent;
    pointer-events: none;
    transition: all ease 0.2s;

    &.active {
      // TODO

      border-color: rgba(var(--color-blue), 1);
    }
  }

  table {
    table-layout: fixed;
    line-height: 100%;

    :global(th) {
      padding-bottom: 8px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
      font-size: 14px;
      text-align: left;
      white-space: nowrap;
    }

    :global(tbody) {
      :global(tr) {
        vertical-align: middle;
        height: 52px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);

        :global(td) {
          padding: 8px;
        }

        :global(a) {
          transition: text-decoration-line 0.2s ease-in-out;

          &:hover {
            text-decoration-line: underline;
          }
        }
      }
    }
  }
</style>
