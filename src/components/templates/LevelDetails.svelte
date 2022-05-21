<script lang="ts">
  import type { Level } from '@/types';
  import { api } from '@/api';
  import LevelHeader from '../organisms/levels/LevelHeader.svelte';
  import Video from '../atoms/Video.svelte';
  import { getYoutubeVideoId } from '@/utils/youtube';
  import LevelMetaArea from '../organisms/levels/LevelMetaArea.svelte';

  export let level: Level;

  $: videoId = getYoutubeVideoId(level.video);
</script>

<svelte:head>
  <title>{level.artists.join(' & ')} - {level.title}</title>
</svelte:head>

<LevelHeader {level} />

<div class="px-8 mt-[24px]">
  <div class="mx-auto max-w-[1100px]">
    <div class="flex gap-[24px] flex-col md:flex-row">
      <Video {videoId} />
      <div class="md:min-w-[360px]">
        <LevelMetaArea {level} />
      </div>
    </div>
  </div>
</div>
