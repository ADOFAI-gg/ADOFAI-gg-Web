<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Ranking } from '@/types';

  export let item: Ranking & { rank: number };
</script>

<div class="item-container">
  <div class="content">
    <div class="rank-text">
      #{item.rank}
    </div>
    <div class="details-container">
      <div class="details-name">{item.name}</div>
      <div class="details-list">
        <div class="details-labels">
          <div>Total PP</div>
        </div>
        <div class="details-values">
          <div>{item.totalPp.toFixed(1)}</div>
        </div>
      </div>
      <div class="details-best-play-container">
        <a href={item.bestPlay.url} target="_blank" rel="noreferrer" class="details-best-play-link">
          <Icon icon="playOutlined" size={16} alt="Video Icon" />
          <div>
            <Translation key="RANKING_HIGHEST_PLAY" />
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .item-container {
    width: 100%;
    display: flex;

    .content {
      background-color: rgba(var(--color-darkblue), 0.4);
      border-radius: 27px;
      width: 100%;
      padding-top: 16px;
      padding-bottom: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media (min-width: 1024px) {
        max-width: 330px;
      }

      > .rank-text {
        font-family: 'Roboto Mono', monospace;
        font-weight: 500;
        font-size: 26px;
      }

      > .details-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;

        > .details-name {
          font-size: 30px;
          font-weight: 500;
        }

        > .details-list {
          display: flex;
          width: 100%;
          justify-content: center;
          font-size: 16px;

          > .details-labels {
            flex-grow: 1;
            flex-shrink: 0;
            display: flex;
            align-items: flex-end;
            flex-direction: column;
            opacity: 60%;
            gap: 8px;
          }

          > .details-values {
            padding-left: 24px;
            flex-grow: 1;
            flex-shrink: 0;
            gap: 8px;

            > div {
              font-weight: 500;
            }
          }
        }

        > .details-best-play-container {
          display: flex;
          justify-content: center;
          margin-top: 12px;

          > .details-best-play-link {
            display: flex;
            align-items: center;
            gap: 6px;
            opacity: 0.8;

            transition-property: opacity;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
    &:nth-child(1) {
      justify-content: center;

      @media (min-width: 768px) {
        justify-content: flex-start;
        grid-column: span 2 / span 2;
      }

      @media (min-width: 1024px) {
        grid-column: span 1 / span 1;
      }
    }

    &:nth-child(2) {
      justify-content: center;
    }

    &:nth-child(3) {
      justify-content: center;

      @media (min-width: 768px) {
        justify-content: flex-end;
      }
    }
  }
</style>
