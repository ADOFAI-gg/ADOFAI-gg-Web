<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Ranking } from '@/types';

  export let item: Ranking & { rank: number };
</script>

<div class="item-container">
  <div class="item-start">
    <div class="rank-text">#{item.rank}</div>
    <div class="name-text">{item.name}</div>
  </div>
  <div class="spacer" />
  <div class="item-end">
    <div class="pp-section">
      <span>{item.totalPp.toFixed(1)}</span>
      <span class="pp-label">PP</span>
    </div>
    <div class="divider" />
    <a href={item.bestPlay.url} target="_blank" rel="noreferrer" class="best-play-container">
      <Icon icon="playOutlined" size={16} alt="Video Icon" />
      <div>
        <Translation key="RANKING_HIGHEST_PLAY" />
      </div>
    </a>
  </div>
</div>

<style lang="scss">
  .item-container {
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: 14px 16px;

    display: flex;
    flex-direction: column;

    &:hover {
      background-color: rgba(var(--color-darkblue), 0.2);
    }

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }

    .item-start {
      display: flex;
      gap: 12px;

      > .rank-text {
        font-size: 24px;
        font-weight: 500;
        line-height: 24px;
        width: 56px;

        font-family: 'Roboto Mono', monospace;
      }

      > .name-text {
        font-weight: 500;
        font-size: 21px;
        line-height: 24px;
      }
    }

    .spacer {
      flex-grow: 1;
    }

    .item-end {
      display: flex;
      gap: 24px;
      align-items: center;
      margin-top: 8px;

      @media (min-width: 768px) {
        margin-top: 0;
      }

      > .pp-section {
        display: flex;
        gap: 6px;

        > .pp-label {
          opacity: 0.6;
        }
      }

      > .divider {
        height: 16px;
        flex-grow: 1;

        @media (min-width: 768px) {
          flex-grow: 0;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
      }

      > .best-play-container {
        transition-property: opacity;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;

        display: flex;
        align-items: center;
        gap: 6px;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
