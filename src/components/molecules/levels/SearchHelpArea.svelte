<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Tooltip from '@atoms/common/Tooltip.svelte';
  import Translation from '@/components/utils/Translation.svelte';

  export let key: string;

  let contentWidth: number;
  let containerWidth: number;

  let toolTipMode = false;

  $: {
    if (containerWidth > contentWidth) {
      toolTipMode = false;
    } else {
      toolTipMode = true;
    }
  }
</script>

<div class="help-area-container">
  {#if toolTipMode}
    <Tooltip>
      <Icon size={12} icon="help" slot="button" alt="Help icon" />
      <div class="p-2">
        <Translation {key} />
      </div>
    </Tooltip>
  {:else}
    <Icon size={12} icon="help" alt="Help icon" />
  {/if}

  <div class="text" bind:clientWidth={containerWidth}>
    <div class:tooltip={toolTipMode} class="white-space: nowrap;" bind:clientWidth={contentWidth}>
      <Translation {key} />
    </div>
  </div>
</div>

<style lang="scss">
  .help-area-container {
    display: flex;
    flex-grow: 1;
    gap: 6px;
    align-self: center;
    height: 100%;
    opacity: 0.6;

    .text {
      display: flex;
      flex-grow: 1;
      overflow: hidden;
      width: 0;

      .tooltip {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }
    }
  }
</style>
