<script lang="ts">
  import type { Level } from '@/types';
  import LevelHeader from '@organisms/levels/info/LevelHeader.svelte';
  import Video from '@atoms/asset/Video.svelte';
  import { getYoutubeVideoId } from '@/utils/youtube';
  import LevelMetaArea from '@organisms/levels/info/LevelMetaArea.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import LevelLeaderboard from '@organisms/levels/info/LevelLeaderboard.svelte';

  export let level: Level;

  // eslint-disable-next-line no-undef
  let player: YT.Player | null = null;

  $: videoId = getYoutubeVideoId(level.video);
</script>

<svelte:head>
  <title>{level.music.artists.map((x) => x.name).join(' & ')} - {level.title}</title>
</svelte:head>

<LevelHeader {level} />

<div class="mt-[24px]" />

<PageContainer>
  <div class="flex gap-[24px] flex-col md:flex-row">
    <Video {videoId} bind:player />
    <div class="md:min-w-[360px]">
      <LevelMetaArea video={player} {level} />
    </div>
  </div>

  <div class="mt-[48px]">
    <LevelLeaderboard levelId={level.id} />
  </div>
</PageContainer>
