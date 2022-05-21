<script lang="ts" context="module">
  import { api } from '@/api';
  import LevelDetails from '@/components/templates/LevelDetails.svelte';
  import type { Level } from '@/types';
  import { getYoutubeVideoId } from '@/utils/youtube';

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

  $: youtubeId = getYoutubeVideoId(level.video);
</script>

<svelte:head>
  <title>{level.artists.join(' & ')} - {level.title}</title>
  <meta property="og:title" content="{level.artists.join(' & ')} - {level.title}" />
  <meta property="og:site_name" content="Adofai.gg" />
  <meta property="og:url" content="https://adofai.gg" />
  <meta property="og:description" content="Map by {level.creators.join(' & ')}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="og:image" content="https://i.ytimg.com/vi/{youtubeId}/original.jpg" />
</svelte:head>

<LevelDetails {level} />
