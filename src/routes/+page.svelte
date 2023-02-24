<script lang="ts">
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import Home, { type Data } from '@templates/Home.svelte';

  export let data: Data;
</script>

<PageContainer navOffset>
  <Home {data} />
</PageContainer>
