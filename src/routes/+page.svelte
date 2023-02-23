<script lang="ts">
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import Home, { type Data } from '@templates/Home.svelte';

  export let data: Data;
</script>

<div class="nav-spacer" />

<PageContainer>
  <Home {data} />
</PageContainer>

<style lang="scss">
  .nav-spacer {
    height: var(--nav-height);
  }
</style>
