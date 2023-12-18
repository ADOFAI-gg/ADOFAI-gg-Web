<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let href = '';
  export let type = 'default';

  let className = '';
  let style = '';

  const dispatch = createEventDispatcher();

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch('click');
    }
  };

  export { className as class, style };
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  role="button"
  tabindex="0"
  on:click
  on:keydown={onKeydown}
  {href}
  {...$$props}
  class={'button ' + className}
  {style}
  data-type={type}
>
  <slot />
</svelte:element>

<style lang="scss">
  .button {
    &[data-type='default'] {
      height: 42px;
      padding: 0 8px;
      border-radius: 6px;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 16px;
      text-align: center;
      transition: background-color 0.2s ease;

      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    &[data-type='search'] {
      display: flex;
      gap: 6px;
      align-items: center;
      justify-content: center;
      width: 23px;
      height: 23px;
      border: rgba(255, 255, 255, 0.4) 1px solid;
      border-radius: 6px;
      transition: opacity 0.2s ease;

      &:hover,
      &:focus {
        opacity: 1;
      }

      @media (min-width: 768px) {
        width: fit-content;
        padding: 0 8px;
      }
    }

    &[data-type='levelAction'] {
      padding: 6px;
      border-radius: 4px;
      background-color: rgba(0, 2, 15, 0.4);
      transition: background-color 0.2s ease;

      &:hover,
      &:focus {
        background-color: rgba(0, 2, 15, 0.6);
      }
    }

    &[data-type='bordered'] {
      padding: 8px 10px;
      border: 1px solid white;
      border-radius: 6px;
      text-align: center;
      opacity: 0.6;
      transition: opacity 0.2s ease;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    &[data-type='nav'] {
      padding: 8px 20px;
      border-width: 1px;
      border-radius: 100em;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
      opacity: 0.6;
      transition: opacity 0.2s ease;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }
  }
</style>
