<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import LeaderboardStatItem from '@molecules/LeaderboardStatItem.svelte';
  import type { PlayLog } from '@/types';

  export let play: PlayLog;
  export let index: number;
</script>

<article>
  <div class="left-side">
    <div class="rank">#{index + 1}</div>

    <div class="player">
      <!-- <div class="w-[24px] h-[24px] bg-white rounded-full" /> -->
      <div class="player-name">{play.player.name}</div>
    </div>
  </div>

  <div class="right-side ">
    <div style="width: 128px;">
      <LeaderboardStatItem icon="fire" postfix="PP">
        {play.playPoint.toFixed(3)}
      </LeaderboardStatItem>
    </div>

    <div style="width: 96px;">
      <LeaderboardStatItem icon="accuracy" postfix="%">
        {Number(play.xAccuracy.toFixed(3))}
      </LeaderboardStatItem>
    </div>

    <div style="width: 84px;">
      <LeaderboardStatItem icon="speed" postfix="x">
        {play.speed / 100}
      </LeaderboardStatItem>
    </div>

    <div class="division-line" />

    <a href={play.url} target="_blank" class="video-link">
      <Icon icon="playOutlined" size={16} alt="Video Icon" />
      <span>Clear Video</span>
    </a>
  </div>
</article>

<style lang="scss">
  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    transition: background-color 0.1s ease;

    &:hover,
    &:focus {
      background-color: rgba(var(--color-darkblue), 0.2);
    }

    .left-side {
      display: flex;
      gap: 14px;
      align-items: center;

      .rank {
        width: 56px;
        font-size: 24px;
        font-family: var(--font-mono);
        text-align: center;
      }

      .player {
        display: flex;
        gap: 8px;
        align-items: center;

        &-name {
          font-weight: 500;
          font-size: 21px;
        }
      }
    }

    .right-side {
      display: flex;
      gap: 12px;
      align-items: center;

      .division-line {
        width: 1px;
        height: 16px;
        background-color: rgba(255, 255, 255, 0.4);
      }

      .video-link {
        display: flex;
        gap: 6px;
        align-items: center;
        transition: font-weight 0.1s ease;

        &:hover,
        &:focus {
          font-weight: 500;
        }
      }
    }
  }
</style>
