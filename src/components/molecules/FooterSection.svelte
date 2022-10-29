<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';

  export let title: string;
</script>

<div>
  <div class="title">
    <Translation key={title} />
  </div>

  <div class="value">
    <slot />
  </div>
</div>

<style lang="scss">
  .title {
    font-weight: 500;
    font-size: 16px;
    opacity: 0.6;
  }

  .value {
    display: flex;
    flex-direction: column;
    margin-top: 4px;
    font-size: 14px;
    line-height: 24px;
  }
</style>
