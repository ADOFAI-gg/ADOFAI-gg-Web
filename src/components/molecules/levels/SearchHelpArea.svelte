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

<div class="flex items-center gap-[6px] opacity-60 flex-grow h-full">
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
  <div class="overflow-hidden flex-grow flex w-0" bind:clientWidth={containerWidth}>
    <div class:tooltip={toolTipMode} class="whitespace-nowrap" bind:clientWidth={contentWidth}>
      <Translation {key} />
    </div>
  </div>
</div>

<style lang="scss">
  .tooltip {
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }
</style>
