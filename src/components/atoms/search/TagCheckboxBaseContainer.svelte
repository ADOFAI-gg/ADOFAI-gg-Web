<script lang="ts">
  export let include: boolean;
  export let exclude: boolean;
</script>

<button class:exclude class:include tabindex="0" on:click>
  <slot />
</button>

<style lang="scss">
  button {
    display: flex;
    gap: 6px;
    align-items: center;
    opacity: 0.6;
    cursor: pointer;
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;

    &:hover {
      opacity: 1;
    }
  }

  .exclude {
    color: rgba(var(--color-red), 1);
    opacity: 1;
  }

  .include {
    opacity: 1;
  }
</style>
