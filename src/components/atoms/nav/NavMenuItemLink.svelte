<script lang="ts">
  import { page } from '$app/stores';

  export let href: string;
</script>

<a class="menu-item" {href} class:active={$page.url.pathname === href} {...$$restProps} on:click>
  <slot />
</a>

<style lang="scss">
  .menu-item {
    padding: 8px;
    border-radius: 4px;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &.active,
    &:hover,
    &:focus {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
