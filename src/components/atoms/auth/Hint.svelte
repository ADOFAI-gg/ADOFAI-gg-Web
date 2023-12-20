<script lang="ts">
  export let warn: boolean = false;
</script>

<div class="hint">
  {#if warn}
    <div class="warn-marker" />
    <p class="warn">
      <slot />
    </p>
  {:else}
    <p class="normal">
      <slot />
    </p>
  {/if}
</div>

<style lang="scss">
  .hint {
    display: flex;
    flex-direction: row;
    column-gap: 6px;
    align-items: center;

    .normal {
      font-size: 12px;
    }

    .warn {
      font-size: 14px;
      color: rgb(var(--color-red));
    }

    .warn-marker {
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: rgb(var(--color-red));
    }
  }
</style>
