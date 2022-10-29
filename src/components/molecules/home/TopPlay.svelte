<script lang="ts">
  import { api } from '@/api';

  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Image from '@atoms/asset/Image.svelte';
  import type { PlayLog } from '@/types';
  import { getYoutubeVideoId } from '@/utils/youtube';
  import TopPlayDetailPair from '@molecules/home/TopPlayDetailPair.svelte';

  export let play: PlayLog;

  $: difficulty = (async () => {
    return api.get(`/api/v1/levels/${play.level.id}`).then((x) => x.data.difficulty);
  })();
</script>

<div class="top-play-wrapper">
  <a href={play.url} rel="noreferrer" target="_blank" class="top-play">
    <div class="thumbnail-wrapper">
      <Image
        lazy
        width="100%"
        height="100%"
        alt="Youtube Video Thumbnail"
        src="https://i.ytimg.com/vi/{getYoutubeVideoId(play.url)}/original.jpg"
      />
    </div>

    <div class="info-container">
      <div class="player-name">
        {play.player.name}
      </div>

      <div class="level">
        {#await difficulty then difficulty}
          <DifficultyIcon {difficulty} />
        {/await}

        <div>{play.level.name}</div>
      </div>

      <div class="detail">
        <TopPlayDetailPair icon="accuracy" value="{play.xAccuracy}%" />
        <TopPlayDetailPair
          icon="speed"
          value="{(play.speed / 100).toLocaleString('en', { minimumFractionDigits: 1 })}X"
        />
        <TopPlayDetailPair icon="fire" value="{play.playPoint.toFixed(0)} PP" />
      </div>
    </div>
  </a>
</div>

<style lang="scss">
  .top-play-wrapper {
    max-width: 360px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 6px;
    background-color: transparent;
    transition: background-color 0.1s ease;

    &:hover,
    &:focus {
      background-color: rgba(var(--color-darkblue), 0.2);
    }

    @media (min-width: 768px) {
      max-width: none;

      &:last-child {
        grid-column: span 2 / span 2;
        margin: 0 25%;
      }
    }

    @media (min-width: 1024px) {
      max-width: 360px;

      &:first-child {
        margin-right: 0;
        margin-left: 0;
      }

      &:last-child {
        grid-column: span 1 / span 1;
        margin: auto;
        padding: 0;
      }
    }
  }

  a.top-play {
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: transform 0.1s ease;

    &:hover,
    &:focus {
      transform: scale(0.95);
    }

    .thumbnail-wrapper {
      overflow: hidden;
      width: 100%;
      border-radius: 6px;
      background-repeat: round;
      aspect-ratio: 16 / 9;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      width: 100%;

      .player-name {
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
      }

      .level {
        display: flex;
        gap: 8px;
        align-items: center;
        font-weight: 500;
      }

      .detail {
        display: flex;
        gap: 24px;
      }
    }
  }
</style>
