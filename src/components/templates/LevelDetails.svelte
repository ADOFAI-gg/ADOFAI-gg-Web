<script lang="ts">
  import type { Level } from '@/types';
  import LevelHeader from '@organisms/levels/info/LevelHeader.svelte';
  import Video from '@atoms/asset/Video.svelte';
  import { getTimestamp, getYoutubeVideoId } from '@/utils/youtube';
  import LevelMetaArea from '@organisms/levels/info/LevelMetaArea.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import LevelLeaderboard from '@organisms/levels/info/LevelLeaderboard.svelte';

  export let level: Level;

  // eslint-disable-next-line no-undef
  let player: YT.Player | null = null;

  $: videoId = getYoutubeVideoId(level.video);

  $: time = getTimestamp(level.video);
</script>

<svelte:head>
  <title>{level.music.artists.map((x) => x.name).join(' & ')} - {level.title}</title>
</svelte:head>

<LevelHeader {level} />

<div class="page-padder" />

<PageContainer>
  <div class="meta">
    <Video {videoId} startTime={time}  bind:player />
    <div class="meta-content">
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

  .meta {
    display: flex;
    flex-direction: column;
    gap: 24px;

    > &-content {
      @media (min-width: 768px) {
        min-width: 360px;
      }
    }

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .leaderboard-padder {
    margin-top: 48px;
  }
</style>
