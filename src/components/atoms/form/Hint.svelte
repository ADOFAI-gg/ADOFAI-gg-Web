<script lang="ts">
  type Variant = 'note' | 'warn' | 'error';
  export let variant: Variant;

  const variantColors: Record<Variant, string> = {
    warn: 'rgb(var(--color-yellow))',
    error: 'rgb(var(--color-red))',
    note: 'transparent'
  };
</script>

<div class="hint">
  <div class:hint-marker={variant !== 'note'} style="background-color: {variantColors[variant]}" />
  <div class="hint-{variant}">
    <slot />
  </div>
</div>

<style lang="scss">
  .hint {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: baseline;

    .hint-note,
    .hint-warn,
    .hint-error {
      line-height: 1.4;

      // text-wrap: pretty;
    }

    .hint-note {
      font-size: 12px;
    }

    .hint-warn {
      color: rgba(var(--color-yellow), 1);
      font-size: 14px;
    }

    .hint-error {
      color: rgba(var(--color-red), 1);
      font-size: 14px;
    }

    .hint-marker {
      flex-shrink: 0;
      width: 8px;
      height: 8px;
      border-radius: 100%;
    }
  }
</style>
