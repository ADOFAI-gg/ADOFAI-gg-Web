<script lang="ts">
  export let warn: boolean = false;

  let hint: HTMLDivElement;
  export const animate = () => {
    hint.classList.remove('animate-shake');

    setTimeout(() => {
      hint.classList.add('animate-shake');
    }, 0);
  };
</script>

<div class="hint" bind:this={hint}>
  {#if warn}
    <div class="hint-warn-marker" />
    <p class="hint-warn">
      <slot />
    </p>
  {:else}
    <p class="hint-normal">
      <slot />
    </p>
  {/if}
</div>

<style lang="scss">
  .hint {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: baseline;

    .hint-normal,
    .hint-warn {
      line-height: 1.4;
      // text-wrap: pretty;
    }

    .hint-normal {
      font-size: 12px;
    }

    .hint-warn {
      font-size: 14px;
      color: rgb(var(--color-red));
    }

    .hint-warn-marker {
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: rgb(var(--color-red));
      flex-shrink: 0;
    }
  }
</style>
