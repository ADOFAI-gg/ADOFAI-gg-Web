<div class="range-input-pair">
  <div class="slot">
    <slot name="min" />
  </div>

  <div>~</div>

  <div class="slot">
    <slot name="max" />
  </div>
</div>

<style lang="scss">
  .range-input-pair {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .slot {
    flex-grow: 1;
    width: 0;
  }
</style>
