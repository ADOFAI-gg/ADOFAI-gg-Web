<script lang="ts">
  import PageContainer from '@/components/atoms/common/PageContainer.svelte';
</script>

<PageContainer navOffset>
  <div class="spacer">
    <slot />
  </div>
</PageContainer>

<style lang="scss">
  .spacer {
    margin-top: 24px;
  }
</style>
