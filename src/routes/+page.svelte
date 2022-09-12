<script lang="ts">
  import PageContainer from '@/components/atoms/PageContainer.svelte';
  import Home, { type Data } from '../components/templates/Home.svelte';

  export let data: Data;
</script>

<div class="h-nav" />

<PageContainer>
  <Home {data} />
</PageContainer>
