<script lang="ts">
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Image from '@atoms/asset/Image.svelte';
  import type { PlayLogWithLevel } from '@/types';
  import { getYoutubeVideoId } from '@/utils/youtube';
  import TopPlayDetailPair from '@molecules/home/TopPlayDetailPair.svelte';

  export let play: PlayLogWithLevel;

  $: difficulty = play.level.difficulty;
</script>

<div class="top-play-wrapper">
  <a href={play.url} rel="noreferrer" target="_blank" class="top-play">
    <div class="top-play__thumbnail-wrapper">
      <Image
        width="100%"
        height="100%"
        alt="Youtube Video Thumbnail"
        src="https://i.ytimg.com/vi/{getYoutubeVideoId(play.url)}/original.jpg"
      />
    </div>

    <div class="top-play__info-container">
      <div class="top-play__player-name">
        {play.player.name}
      </div>

      <div class="top-play__level">
        <DifficultyIcon {difficulty} censored={play.level.censored} />

        <div>{play.level.name}</div>
      </div>

      <div class="top-play__detail">
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

  .top-play {
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: transform 0.1s ease;

    &:hover,
    &:focus {
      transform: scale(0.95);
    }

    &__thumbnail-wrapper {
      overflow: hidden;
      width: 100%;
      border-radius: 6px;
      background-repeat: round;
      aspect-ratio: 16 / 9;
    }

    &__info-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      width: 100%;
    }

    &__player-name {
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
    }

    &__level {
      display: flex;
      gap: 8px;
      align-items: center;
      font-weight: 500;
    }

    &__detail {
      display: flex;
      gap: 24px;
    }
  }
</style>
