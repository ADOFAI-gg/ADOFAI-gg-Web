<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';

  export let icon: string;

  export let postfix = '';
</script>

<div class="stat">
  <div class="stat__icon">
    <Icon {icon} size={16} alt="{icon} icon" />
  </div>

  <div class="stat__content">
    <slot />
  </div>

  {#if postfix}
    <div class="stat__postfix">
      {postfix}
    </div>
  {/if}
</div>

<style lang="scss">
  .stat {
    display: flex;
    gap: 4px;
    align-items: center;

    &__icon {
      opacity: 0.6;
    }

    &__content {
      font-weight: 500;
      font-size: 16px;
      opacity: 0.6;
    }

    &__postfix {
      font-weight: 400;
      font-size: 16px;
      opacity: 0.4;
    }
  }
</style>
