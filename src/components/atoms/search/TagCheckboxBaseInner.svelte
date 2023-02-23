<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import TagCheckboxBaseContainer from './TagCheckboxBaseContainer.svelte';
  import TagCheckboxBaseIcon from './TagCheckboxBaseIcon.svelte';

  export let include: boolean;
  export let exclude: boolean;

  export let hideSelectedIcon: boolean;
</script>

<TagCheckboxBaseContainer {include} {exclude} on:click>
  <div class="icon-container">
    <TagCheckboxBaseIcon {hideSelectedIcon} active={include || exclude}>
      <slot name="icon" />
    </TagCheckboxBaseIcon>
    {#if !hideSelectedIcon}
      <div class="selected-icon">
        {#if include}
          <Icon style="" icon="plusFilled" size={10} alt="Tag Included Indicator" />
        {:else if exclude}
          <Icon style="" icon="minusFilled" size={10} alt="Tag Excluded Indicator" />
        {/if}
      </div>
    {/if}
  </div>

  <div><slot name="name" /></div>
</TagCheckboxBaseContainer>

<style lang="scss">
  .icon-container:has(.selected-icon div) + div {
    font-weight: 700;
  }

  .icon-container {
    position: relative;
  }

  .selected-icon {
    position: absolute;
    right: -2px;
    bottom: -2px;
  }
</style>
