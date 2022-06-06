<script context="module" lang="ts">
  import { api } from '@/api';

  import type { Load } from '@sveltejs/kit';
  import type { Data } from '../components/templates/Home.svelte';

  export const load: Load = async () => {
    const {
      data: { results: topPlays }
    } = await api.get('/api/v1/playLogs', {
      params: {
        offset: 0,
        amount: 3,
        sort: 'PP_DESC'
      }
    });
    const {
      data: { results: recentLevels }
    } = await api.get('/api/v1/levels', {
      params: {
        offset: 0,
        amount: 10,
        sort: 'RECENT_DESC'
      }
    });

    return {
      props: {
        data: {
          topPlays,
          recentLevels
        } as Data
      }
    };
  };
</script>

<script lang="ts">
  import PageContainer from '@/components/atoms/PageContainer.svelte';
  import Home from '../components/templates/Home.svelte';

  export let data: Data;
</script>

<svelte:head>
  <title>Adofai.gg</title>
  <meta name="description" content="A website for viewing and downloading ADOFAI custom levels." />
  <meta name="og:title" content="Adofai.gg" />
  <meta name="og:type" content="website" />
  <meta name="og:image" content="/favicon.png" />
  <meta
    name="og:description"
    content="A website for viewing and downloading ADOFAI custom levels."
  />
</svelte:head>

<div class="h-nav" />

<PageContainer>
  <Home {data} />
</PageContainer>
