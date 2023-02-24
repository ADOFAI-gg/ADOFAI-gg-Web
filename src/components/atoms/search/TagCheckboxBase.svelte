<script lang="ts">
  import Tooltip from '@atoms/common/Tooltip.svelte';
  import TagCheckboxBaseInner from './TagCheckboxBaseInner.svelte';

  export let include = false;
  export let exclude = false;
  export let tooltip = true;

  export let hideSelectedIcon = false;
</script>

{#if tooltip}
  <Tooltip placement="bottom-start" options={{ arrow: false }}>
    <TagCheckboxBaseInner slot="button" on:click bind:exclude bind:include bind:hideSelectedIcon>
      <slot name="icon" slot="icon" />
      <slot name="name" slot="name" />
    </TagCheckboxBaseInner>
    <div class="tooltip-balloon">
      <div class="tooltip-balloon__tag-name"><slot name="name" /></div>
      <div class="tooltip-balloon__tag-description"><slot name="description" /></div>
    </div>
  </Tooltip>
{:else}
  <TagCheckboxBaseInner on:click bind:exclude bind:include bind:hideSelectedIcon>
    <slot name="icon" slot="icon" />
    <slot name="name" slot="name" />
  </TagCheckboxBaseInner>
{/if}

<style lang="scss">
  .tooltip-balloon {
    padding: 16px;

    &__tag-name {
      font-weight: 800;
      font-size: 16px;
    }

    &__tag-description {
      margin-top: 4px;
      font-size: 14px;
    }
  }
</style>
