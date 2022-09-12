<script lang="ts">
  import Icon from '@/components/atoms/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Ranking } from '@/types';

  export let item: Ranking & { rank: number };
</script>

<div class="item-container">
  <div class="content">
    <div class="font-mono font-medium text-[26px]">
      #{item.rank}
    </div>
    <div class="flex flex-col w-full items-center">
      <div class="text-[30px] font-bold">{item.name}</div>
      <div class="flex w-full justify-center text-lg">
        <div class="flex-grow flex-shrink-0 flex items-end flex-col opacity-60 gap-[8px]">
          <div>Total PP</div>
        </div>
        <div class="pl-[24px] flex-grow flex-shrink-0 gap-[8px]">
          <div class="font-medium">{item.totalPp.toFixed(1)}</div>
        </div>
      </div>
      <div class="flex justify-center mt-[12px]">
        <a
          href={item.bestPlay.url}
          target="_blank"
          rel="noreferrer"
          class="flex items-center gap-[6px] opacity-80 hover:opacity-100 transition-opacity"
        >
          <Icon icon="playOutlined" size={16} />
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
    @apply w-full flex;
    .content {
      @apply bg-darkblue/40 rounded-[27px] lg:max-w-[330px] w-full pt-[16px] pb-[24px] flex flex-col justify-center items-center;
    }
    &:nth-child(1) {
      @apply justify-center md:justify-start md:col-span-2 lg:col-span-1;
    }
    &:nth-child(2) {
      @apply justify-center md:justify-center;
    }
    &:nth-child(3) {
      @apply justify-center md:justify-end;
    }
  }
</style>
