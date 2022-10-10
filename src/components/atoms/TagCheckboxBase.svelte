<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';
  import Tooltip from './Tooltip.svelte';

  export let include = false;
  export let exclude = false;
  export let tooltip = true;

  export let hideSelectedIcon = false;

  const dispatch = createEventDispatcher();
</script>

{#if tooltip}
  <Tooltip placement="bottom-start" options={{ arrow: false }}>
    <div
      slot="button"
      class="flex gap-[6px] transition-all opacity-60 hover:opacity-80 cursor-pointer items-center"
      class:exclude
      class:include
      tabindex="0"
      on:click
      on:keydown={(e) => e.key === 'Enter' && dispatch('click')}
    >
      <div class="icon-container">
        <div class="icon" class:disable-select-icon={hideSelectedIcon}>
          <slot name="icon" />
        </div>
        {#if !hideSelectedIcon}
          <div class="selected-icon">
            {#if include}
              <Icon class="" disableFade icon="plusFilled" size={10} />
            {:else if exclude}
              <Icon class="" disableFade icon="minusFilled" size={10} />
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
    class="flex gap-[6px] transition-all opacity-60 hover:opacity-80 focus:opacity-80 cursor-pointer items-center"
    class:exclude
    class:include
    tabindex="0"
    on:click
    on:keydown={(e) => e.key === 'Enter' && dispatch('click')}
  >
    <div class="icon-container">
      <div class="icon" class:disable-select-icon={hideSelectedIcon}>
        <slot name="icon" />
      </div>
      {#if !hideSelectedIcon}
        <div class="selected-icon">
          {#if include}
            <Icon class="" disableFade icon="plusFilled" size={10} />
          {:else if exclude}
            <Icon class="" disableFade icon="minusFilled" size={10} />
          {/if}
        </div>
      {/if}
    </div>

    <div><slot name="name" /></div>
  </div>
{/if}

<style lang="scss">
  .icon-container:has(.selected-icon div) + div {
    @apply font-bold;
  }

  .exclude {
    @apply opacity-100 text-red;

    /* filter: invert(30%) sepia(57%) saturate(6528%) hue-rotate(333deg) brightness(99%) contrast(94%); */
    /* color: #d65a46; */
  }
  .include {
    @apply opacity-100;
  }

  .include,
  .exclude {
    .icon:not(.disable-select-icon) {
      clip-path: path(
        'M22 0H0V22H12.6736C12.2417 21.0907 12 20.0736 12 19C12 15.134 15.134 12 19 12C20.0736 12 21.0907 12.2417 22 12.6736V0Z'
      );
    }
    .icon-container {
      position: relative;
    }

    .selected-icon {
      position: absolute;
      right: -2px;
      bottom: -2px;
    }
  }
</style>
