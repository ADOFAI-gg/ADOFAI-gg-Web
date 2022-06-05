<script lang="ts">
  import Tooltip from './Tooltip.svelte';

  export let include = false;
  export let exclude = false;
</script>

<Tooltip placement="bottom-start" options={{ arrow: false }}>
  <div
    slot="button"
    class="flex gap-[6px] transition-all opacity-60 hover:opacity-80 cursor-pointer"
    class:exclude
    class:include
    on:click
  >
    <slot name="icon" />
    <div><slot name="name" /></div>
  </div>
  <div class="p-4">
    <div class="text-lg font-extrabold"><slot name="name" /></div>
    <div class="text-md mt-1"><slot name="description" /></div>
  </div>
</Tooltip>

<style lang="scss">
  .exclude {
    @apply opacity-100;
    filter: invert(30%) sepia(57%) saturate(6528%) hue-rotate(333deg) brightness(99%) contrast(94%);
  }
  .include {
    @apply opacity-100;
  }
</style>
