<script lang="ts" context="module">
  import { api } from '@/api';
  import LevelDetails from '@/components/templates/LevelDetails.svelte';
  import type { Level } from '@/types';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ params }) => {
    const { data } = await api.get(`/api/v1/levels/${params.id}`);
    return {
      props: {
        level: data
      }
    };
  };
</script>

<script lang="ts">
  export let level: Level;
</script>

<LevelDetails {level} />
