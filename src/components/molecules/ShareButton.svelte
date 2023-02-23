<button tabindex="0" on:click style={$$props.style}>
  <slot />
</button>

<style lang="scss">
  button {
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
