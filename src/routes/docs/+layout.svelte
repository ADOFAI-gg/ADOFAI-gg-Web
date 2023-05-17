<script lang="ts">
  import PageContainer from '@/components/atoms/common/PageContainer.svelte';
</script>

<PageContainer>
  <div class="spacer">
    <slot />
  </div>
</PageContainer>

<style lang="scss">
  .spacer {
    margin-top: 72px;
  }
</style>
