<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Tooltip from '@atoms/common/Tooltip.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  export let key: TranslationKey;

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

<div class="help-area">
  {#if toolTipMode}
    <Tooltip>
      <Icon size={12} icon="help" slot="button" alt="Help icon" />
      <div class="help-area__tooltip-content">
        <Translation {key} />
      </div>
    </Tooltip>
  {:else}
    <Icon size={12} icon="help" alt="Help icon" />
  {/if}

  <div class="help-area__text" bind:clientWidth={containerWidth}>
    <div
      class:help-area__tooltip={toolTipMode}
      style="white-space: nowrap;"
      bind:clientWidth={contentWidth}
    >
      <Translation {key} />
    </div>
  </div>
</div>

<style lang="scss">
  .help-area {
    display: flex;
    flex-grow: 1;
    gap: 6px;
    align-items: center;
    height: 100%;
    opacity: 0.6;

    &__tooltip-content {
      padding: 8px;
    }

    &__text {
      display: flex;
      flex-grow: 1;
      overflow: hidden;
      width: 0;
    }

    &__tooltip {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  }
</style>
