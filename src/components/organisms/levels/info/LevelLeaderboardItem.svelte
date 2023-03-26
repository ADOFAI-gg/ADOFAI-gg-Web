<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import LeaderboardStatItem from '@molecules/LeaderboardStatItem.svelte';
  import type { PlayLog } from '@/types';
  import Translation from '@/components/utils/Translation.svelte';

  export let play: PlayLog;
  export let index: number;
</script>

<article>
  <div class="rank">
    #{index + 1}
  </div>

  <div class="details">
    <div class="left-side">
      <div class="left-side__player">
        <div class="left-side__player-name">{play.player.name}</div>
        {#if play.description}
          <div class="left-side__player-description">{play.description}</div>
        {/if}
      </div>
    </div>

    <div class="right-side">
      <div style="width: 128px;" class="right-side__item">
        <LeaderboardStatItem icon="fire" postfix="PP">
          {play.playPoint.toFixed(3)}
        </LeaderboardStatItem>
      </div>

      <div style="width: 84px;" class="right-side__item">
        <LeaderboardStatItem icon="accuracy" postfix="%">
          {Number(play.xAccuracy.toFixed(3))}
        </LeaderboardStatItem>
      </div>

      <div style="width: 84px;" class="right-side__item">
        <LeaderboardStatItem icon="speed" postfix="x">
          {play.speed / 100}
        </LeaderboardStatItem>
      </div>

      <div class="right-side__divider right-side__item" />

      <a href={play.url} target="_blank" class="right-side__video-link" rel="noreferrer">
        <Icon icon="playOutlined" size={16} alt="Video Icon" />
        <span>
          <Translation key="LEADERBOARD_CLEAR_VIDEO" />
        </span>
      </a>
    </div>
  </div>
</article>

<style lang="scss">
  article {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    transition: background-color 0.1s ease;

    &:hover,
    &:focus {
      background-color: rgba(var(--color-darkblue), 0.2);
    }
  }

  .rank {
    flex-shrink: 0;
    width: 56px;
    font-size: 24px;
    font-family: var(--font-mono);
    text-align: center;
  }

  .details {
    display: flex;
    flex-grow: 1;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .left-side {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 2px;

    &__player {
      display: flex;
      flex-direction: column;
      justify-content: center;

      &-name {
        font-weight: 500;
        font-size: 21px;
      }

      &-description {
        font-weight: 500;
        font-size: 14px;
        opacity: 0.6;
      }
    }

    @media (min-width: 769px) {
      width: 0;
    }
  }

  .right-side {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &__item {
      margin-right: 12px;
    }

    &__divider {
      width: 1px;
      height: 16px;
      background-color: rgba(255, 255, 255, 0.4);
    }

    &__video-link {
      display: flex;
      gap: 6px;
      align-items: center;
      white-space: nowrap;
      transition: font-weight 0.1s ease;

      &:hover,
      &:focus {
        font-weight: 500;
      }
    }
  }
</style>
