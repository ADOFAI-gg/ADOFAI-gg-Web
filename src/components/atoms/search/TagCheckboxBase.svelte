<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import Tooltip from '@atoms/common/Tooltip.svelte';

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
              <Icon style="" disableFade icon="plusFilled" size={10} alt="Tag Included Indicator" />
            {:else if exclude}
              <Icon
                style=""
                disableFade
                icon="minusFilled"
                size={10}
                alt="Tag Excluded Indicator"
              />
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
            <Icon style="" disableFade icon="plusFilled" size={10} alt="Tag Included Indicator" />
          {:else if exclude}
            <Icon style="" disableFade icon="minusFilled" size={10} alt="Tag Excluded Indicator" />
          {/if}
        </div>
      {/if}
    </div>

    <div><slot name="name" /></div>
  </div>
{/if}

<style lang="scss">
  .icon-container:has(.selected-icon div) + div {
    font-weight: 700;
  }

  .exclude {
    color: rgba(var(--text-red), 1);
    opacity: 1;
  }

  .include {
    opacity: 1;
  }

  .include,
  .exclude {
    .icon:not(.disable-select-icon) {
      clip-path: path(
        'M22 0H0V22H12.6736C12.2417 21.0907 12 20.0736 12 \
        19C12 15.134 15.134 12 19 \
        12C20.0736 12 21.0907 12.2417 22 12.6736V0Z'
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
