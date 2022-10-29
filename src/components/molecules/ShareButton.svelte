<div on:click style={$$props.style}>
  <slot />
</div>

<style lang="scss">
  div {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    width: 0;
    min-width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 6px;
    background-color: rgba(var(--color-cyan), 1);
    cursor: pointer;
  }
</style>
