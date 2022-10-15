<script lang="ts">
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import Home, { type Data } from '@templates/Home.svelte';

  export let data: Data;
</script>

<div class="h-nav" />

<PageContainer>
  <Home {data} />
</PageContainer>
