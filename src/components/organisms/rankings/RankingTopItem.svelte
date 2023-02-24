<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Ranking } from '@/types';

  export let item: Ranking & { rank: number };
</script>

<div class="item">
  <div class="item__content">
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
  .item {
    display: flex;
    width: 100%;

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding-top: 16px;
      padding-bottom: 24px;
      border-radius: 27px;
      background-color: rgba(var(--color-darkblue), 0.4);

      @media (min-width: 1024px) {
        max-width: 330px;
      }
    }

    &:nth-child(1) {
      justify-content: center;

      @media (min-width: 768px) {
        grid-column: span 2 / span 2;
        justify-content: flex-start;
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

  .rank-text {
    font-weight: 500;
    font-size: 26px;
    font-family: 'Roboto Mono', monospace;
  }

  .details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .details-name {
    font-weight: 500;
    font-size: 30px;
  }

  .details-list {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 16px;
  }

  .details-labels {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
    opacity: 0.6;
  }

  .details-values {
    flex-grow: 1;
    flex-shrink: 0;
    gap: 8px;
    padding-left: 24px;

    > div {
      font-weight: 500;
    }
  }

  .details-best-play-container {
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }

  .details-best-play-link {
    display: flex;
    gap: 6px;
    align-items: center;
    opacity: 0.8;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-property: opacity;

    &:hover {
      opacity: 1;
    }
  }
</style>
