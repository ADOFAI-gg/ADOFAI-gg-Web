<script lang="ts">
  import type { Level } from '@/types';
  import { api } from '@/api';
  import LevelHeader from '../organisms/levels/LevelHeader.svelte';
  import Video from '../atoms/Video.svelte';
  import { getYoutubeVideoId } from '@/utils/youtube';
  import LevelMetaArea from '../organisms/levels/LevelMetaArea.svelte';
  import PageContainer from '../atoms/PageContainer.svelte';

  export let level: Level;

  $: videoId = getYoutubeVideoId(level.video);
</script>

<svelte:head>
  <title>{level.artists.join(' & ')} - {level.title}</title>
</svelte:head>

<LevelHeader {level} />

<div class="mt-[24px]" />

<PageContainer>
  <div class="flex gap-[24px] flex-col md:flex-row">
    <Video {videoId} />
    <div class="md:min-w-[360px]">
      <LevelMetaArea {level} />
    </div>
  </div>
</PageContainer>
