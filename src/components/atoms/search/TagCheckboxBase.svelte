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
    <div class="p-4">
      <div class="text-lg font-extrabold"><slot name="name" /></div>
      <div class="text-md mt-1"><slot name="description" /></div>
    </div>
  </Tooltip>
{:else}
  <TagCheckboxBaseInner on:click bind:exclude bind:include bind:hideSelectedIcon>
    <slot name="icon" slot="icon" />
    <slot name="name" slot="name" />
  </TagCheckboxBaseInner>
{/if}
