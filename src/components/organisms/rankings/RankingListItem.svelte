<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Ranking } from '@/types';

  export let item: Ranking & { rank: number };
</script>

<div class="item">
  <div class="item__start">
    <div class="rank-text">#{item.rank}</div>
    <div class="name-text">{item.name}</div>
  </div>
  <div class="spacer" />
  <div class="item__end">
    <div class="pp-section">
      <span>{item.totalPp.toFixed(1)}</span>
      <span class="pp-label">PP</span>
    </div>
    <div class="divider" />
    <a href={item.bestPlay?.url} target="_blank" rel="noreferrer" class="best-play-container">
      <Icon icon="playOutlined" size={16} alt="Video Icon" />
      <div>
        <Translation key="ranking:highest-play" />
      </div>
    </a>
  </div>
</div>

<style lang="scss">
  .item {
    display: flex;
    flex-direction: column;
    padding: 14px 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-property: background-color;

    &:hover {
      background-color: rgba(var(--color-darkblue), 0.2);
    }

    &__start {
      display: flex;
      gap: 12px;
    }

    .spacer {
      flex-grow: 1;
    }

    &__end {
      display: flex;
      gap: 24px;
      align-items: center;
      margin-top: 8px;

      @media (width >= 768px) {
        margin-top: 0;
      }
    }

    @media (width >= 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  .pp-section {
    display: flex;
    gap: 6px;

    > .pp-label {
      opacity: 0.6;
    }
  }

  .divider {
    flex-grow: 1;
    height: 16px;

    @media (width >= 768px) {
      flex-grow: 0;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
  }

  .best-play-container {
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

  .rank-text {
    width: 56px;
    font-weight: 500;
    font-size: 24px;
    font-family: 'Roboto Mono', monospace;
    line-height: 24px;
  }

  .name-text {
    font-weight: 500;
    font-size: 21px;
    line-height: 24px;
  }
</style>
