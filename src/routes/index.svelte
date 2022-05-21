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
  import Home from '../components/templates/Home.svelte';

  export let data: Data;

  $: console.log(data);
</script>

<div class="h-nav" />

<svelte:head>
  <title>Adofai.gg</title>
</svelte:head>

<div class="px-8">
  <div class="max-w-[1100px] mx-auto">
    <Home {data} />
  </div>
</div>
