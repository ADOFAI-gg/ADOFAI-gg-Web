<script lang="ts">
  export let active = false;
</script>

<button class="menu-item" class:active {...$$restProps} on:click>
  <slot />
</button>

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
