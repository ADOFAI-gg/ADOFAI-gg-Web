<script lang="ts">
  import Icon from '@/components/atoms/asset/Icon.svelte';

  export let button: HTMLButtonElement;
</script>

<button class="more-button" bind:this={button}>
  <div class="more-button-icon">
    <Icon size={14} icon="bottomArrowCircleOutlined" alt="Expand Icon" />
  </div>
  <div>Show All</div>
</button>

<style lang="scss">
  .more-button {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    opacity: 0.6;
    cursor: pointer;

    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    &:hover {
      opacity: 1;
    }

    .more-button-icon {
      filter: drop-shadow(0px 0px 6px #000000);
      width: 14px;
      height: 14px;
    }
  }
</style>
