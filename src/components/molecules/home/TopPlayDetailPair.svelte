<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';

  export let icon: string;
  export let value: string;
</script>

<div class="pair">
  <Icon {icon} size={16} alt="{icon} icon" />

  <span class="pair__label">{value}</span>
</div>

<style lang="scss">
  .pair {
    display: flex;
    gap: 6px;
    align-items: center;
    opacity: 0.6;

    &__label {
      font-size: 14px;
    }
  }
</style>
