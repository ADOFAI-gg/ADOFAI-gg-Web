<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';

  export let value: string;

  let currentTimeout: number | null = null;

  let copied = false;

  const copy = async () => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      currentTimeout = null;
    }

    if (window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    }

    copied = true;

    currentTimeout = setTimeout(() => {
      copied = false;
    }, 1000) as unknown as number;
  };
</script>

<div class="copyable-input">
  <input type="text" {value} />

  <div class="copy-icon" tabindex="0" class:copied on:click={copy}>
    {#if copied}
      <Icon size={16} icon="check" alt="Copy Success" />
    {:else}
      <Icon size={16} icon="copy" alt="Copy icon" />
    {/if}
  </div>
</div>

<style lang="scss">
  .copyable-input {
    display: flex;
    gap: 6px;
    align-items: center;
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.4);

    & > input {
      flex-grow: 1;
      width: 0;
      background-color: transparent;
      outline: 2px solid transparent;
    }
  }

  .copy-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    cursor: pointer;

    &.copied {
      color: rgba(var(--color-cyan), 100);
    }
  }
</style>
