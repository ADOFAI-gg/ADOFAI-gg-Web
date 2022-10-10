<script lang="ts">
  import Icon from './Icon.svelte';
  import Tooltip from './Tooltip.svelte';

  export let include = false;
  export let exclude = false;
  export let tooltip = true;

  export let hideSelectedIcon = false;
</script>

{#if tooltip}
  <Tooltip placement="bottom-start" options={{ arrow: false }}>
    <div
      slot="button"
      class="flex gap-[6px] transition-all opacity-60 hover:opacity-80 cursor-pointer items-center"
      class:exclude
      class:include
      on:click
    >
      <div class="icon-container">
        <div class="icon" class:disable-select-icon={hideSelectedIcon}>
          <slot name="icon" />
        </div>
        {#if !hideSelectedIcon}
          <div class="selected-icon">
            {#if include}
              <Icon class="" disableFade icon="plusFilled" size={12} />
            {:else if exclude}
              <Icon class="" disableFade icon="minusFilled" size={12} />
            {/if}
          </div>
        {/if}
      </div>

      <div><slot name="name" /></div>
    </div>
    <div class="p-4">
      <div class="text-lg font-extrabold"><slot name="name" /></div>
      <div class="text-md mt-1"><slot name="description" /></div>
    </div>
  </Tooltip>
{:else}
  <div
    class="flex gap-[6px] transition-all opacity-60 hover:opacity-80 cursor-pointer items-center"
    class:exclude
    class:include
    on:click
  >
    <div class="icon-container">
      <div class="icon" class:disable-select-icon={hideSelectedIcon}>
        <slot name="icon" />
      </div>
      {#if !hideSelectedIcon}
        <div class="selected-icon">
          {#if include}
            <Icon class="" disableFade icon="plusFilled" size={12} />
          {:else if exclude}
            <Icon class="" disableFade icon="minusFilled" size={12} />
          {/if}
        </div>
      {/if}
    </div>
    <div><slot name="name" /></div>
  </div>
{/if}

<style lang="scss">
  .exclude {
    @apply opacity-100;

    /* filter: invert(30%) sepia(57%) saturate(6528%) hue-rotate(333deg) brightness(99%) contrast(94%); */
    color: #d65a46;
  }
  .include {
    @apply opacity-100;
  }

  .include,
  .exclude {
    .icon:not(.disable-select-icon) {
      clip-path: path(
        'M21.6264 13.8529C21.8701 12.9431 22 11.9867 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C11.9867 22 12.9431 21.8701 13.8529 21.6264C12.9361 20.6438 12.375 19.3249 12.375 17.875C12.375 14.8374 14.8374 12.375 17.875 12.375C19.3249 12.375 20.6438 12.9361 21.6264 13.8529Z'
      );
    }
    .icon-container {
      position: relative;
    }

    .selected-icon {
      position: absolute;
      right: -4px;
      bottom: -4px;
    }
  }
</style>
