<script lang="ts">
  import Icon from '@/components/atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<button class="more-button">
  <div class="more-button__icon">
    <Icon size={14} icon="bottomArrowCircleOutlined" alt="Expand Icon" />
  </div>
  <div>
    <Translation key="common:show-all" />
  </div>
</button>

<style lang="scss">
  .more-button {
    display: flex;
    gap: 6px;
    align-items: center;
    white-space: nowrap;
    opacity: 0.6;
    cursor: pointer;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-property: opacity;

    &:hover {
      opacity: 1;
    }

    &__icon {
      width: 14px;
      height: 14px;
      filter: drop-shadow(0 0 6px rgba(0, 0, 0, 1));
    }
  }
</style>
