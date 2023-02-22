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

<div class="page-padder" />

<PageContainer>
  <div class="meta-container">
    <Video {videoId} bind:player />
    <div class="meta-area">
      <LevelMetaArea video={player} {level} />
    </div>
  </div>

  <div class="leaderboard-padder">
    <LevelLeaderboard levelId={level.id} />
  </div>
</PageContainer>

<style lang="scss">
  .page-padder {
    margin-top: 24px;
  }

  .meta-container {
    @apply flex gap-[24px] flex-col md:flex-row;

    > .meta-area {
      @apply md:min-w-[360px];
    }
  }

  .leaderboard-padder {
    @apply mt-[48px];
  }
</style>
