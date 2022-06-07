<script context="module" lang="ts">
  import { api } from '@/api';

  import type { Load } from '@sveltejs/kit';
  import type { Data } from '../components/templates/Home.svelte';

  export const load: Load = async () => {
    if (!browser) {
      return {
        props: {
          data: { recentLevels: [], topPlays: [] } as Data
        }
      };
    }

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
  import { browser } from '$app/env';

  export let data: Data;
</script>

<div class="h-nav" />

<PageContainer>
  <Home {data} />
</PageContainer>
